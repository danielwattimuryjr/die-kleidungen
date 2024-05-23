<?php

namespace App\Http\Controllers;

use App\Enum\OrderStatus;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use DB;
use Illuminate\Validation\Rule;
use Log;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'nama_penerima', 'status', 'total_belanja']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $orders = OrderResource::collection(
            Order::query()
                ->with('payment')
                ->when(
                    value: $request->search,
                    callback: fn($query, $value) => $query->where('nama_penerima', 'like', '%' . $value . '%')
                        ->orWhere('status', 'like', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn($query) => $query->orderBy($request->field, $request->direction),
                    default: fn($query) => $query->latest()
                )
                ->fastPaginate($limit)
                ->withQueryString()
        );

        return inertia('orders/index', [
            'orders' => fn() => $orders,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function create()
    {

    }

    public function store(StoreOrderRequest $request)
    {
        //
    }

    public function show(Order $order)
    {
        //
    }

    public function edit(Order $order)
    {
        //
    }

    public function update(Order $order, $status)
    {
        DB::beginTransaction();

        try {
            switch ($status) {
                case 0:
                    $order_status = OrderStatus::PENDING;
                    break;
                case 1:
                    $order_status = OrderStatus::PROCESSING;
                    break;
                case 2:
                    $order_status = OrderStatus::SHIPPED;
                    break;
                case 3:
                    $order_status = OrderStatus::DELIVERED;
                    break;
                case 4:
                    $order_status = OrderStatus::CANCELED;
                    break;
                default:
                    $order_status = OrderStatus::PENDING;
                    break;
            }

            $order->update([
                'status' => $order_status
            ]);

            DB::commit();
            Log::info("Order#$order->id status has been updated");
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    public function destroy(Order $order)
    {
        DB::beginTransaction();

        try {
            $order->delete();

            Log::info("Order#$order->id has been deleted");

            DB::commit();
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }
}
