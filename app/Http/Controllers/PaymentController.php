<?php

namespace App\Http\Controllers;

use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;
use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\Payment;
use App\Models\TemporaryImage;
use DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Log;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'order_id', 'image_name', 'status']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $payments = PaymentResource::collection(
            Payment::query()
                ->when(
                    value: $request->search,
                    callback: fn($query, $value) => $query->where('order_id', 'like', '%' . $value . '%')
                        ->where('image_name', 'like', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn($query) => $query->orderBy($request->field, $request->direction),
                    default: fn($query) => $query->latest()
                )
                ->fastPaginate($limit)
                ->withQueryString()
        );

        return inertia('payments/index', [
            'payments' => fn() => $payments,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Order $order, Request $request)
    {
        DB::beginTransaction();

        $request->validate([
            'image' => 'required'
        ]);

        try {
            $order->payment()->create([
                'image_name' => $request->image
            ]);

            $temp_image = TemporaryImage::where('file', $order->payment->image_name)->first();

            if ($temp_image)
                $temp_image->delete();

            Log::info("New Proof of Payment for Order#$order->id Created. ");

            DB::commit();

            return to_route('open-user-orders');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    public function show(Payment $payment)
    {
        //
    }

    public function edit(Payment $payment, $status)
    {

    }

    public function update(Payment $payment, $status)
    {

        DB::beginTransaction();

        try {
            switch ($status) {
                case 0:
                    $new_status = PaymentStatus::VERIFIED;
                    $order_status = OrderStatus::PROCESSING;
                    break;
                case 1:
                    $new_status = PaymentStatus::REJECTED;
                    $order_status = OrderStatus::CANCELED;
                    break;
                default:
                    $new_status = PaymentStatus::VERIFYING;
                    $order_status = OrderStatus::PENDING;
                    break;
            }

            $payment->update([
                'status' => $new_status
            ]);

            $payment->order()->update([
                'status' => $order_status
            ]);

            DB::commit();
            Log::info("Payment#$payment->id status has been updated");
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    public function destroy(Payment $payment)
    {
        //
    }
}
