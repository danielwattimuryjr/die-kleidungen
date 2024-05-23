<?php

namespace App\Http\Controllers;

use App\Enum\OrderStatus;
use App\Enum\ProductCategory;
use App\Http\Requests\StoreCheckoutRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SingleProductResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class CustomerActionController extends Controller
{
    public function getActiveProducts(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['nama', 'created_at']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $products = ProductResource::collection(
            Product::query()
                ->where('isActive', true)
                ->when(
                    value: $request->search,
                    callback: fn($query, $value) => $query->where('nama', 'like', '%' . $value . '%')
                        ->orWhere('category', 'like', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn($query) => $query->orderBy($request->field, $request->direction),
                    default: fn($query) => $query->latest()
                )
                ->fastPaginate($limit)
                ->withQueryString()
        );

        return inertia('home/index', [
            'products' => fn() => $products,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function productDetailPage(Product $product)
    {
        $product = new SingleProductResource($product);
        $product['category'] = ProductCategory::from($product->category)->labels();

        return inertia('product_detail/index', [
            'product' => $product
        ]);
    }

    public function addToCart(Request $request, Product $product)
    {
        DB::beginTransaction();

        $validated = $request->validate([
            'quantity' => 'min:1|numeric|max:' . $product->stock
        ]);

        $quantity = $validated['quantity'];

        try {
            $user = auth()->user();
            $cart = new Cart(); // Buat instance dari model Cart
            $cart->addProduct($product, $quantity);

            DB::commit();

            Log::info("New Cart for USER #$user->id, PRODUCT #$product->id");

            return to_route('product-detail', $product);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('product-detail', $product);
        }
    }

    public function showCartItems()
    {
        $user = auth()->user();

        return inertia('user-cart/index', [
            'cartItems' => CartItemResource::collection(
                $user->cart_items()->get()
            )
        ]);
    }

    public function removeFromCart(Product $product)
    {
        DB::beginTransaction();

        try {
            $user = auth()->user();
            $cart = new Cart();
            $cart->removeProduct($product);

            DB::commit();

            Log::info("Remove PRODUCT #$product->id from USER#$user->id cart");
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    public function openCheckoutForm()
    {
        $user = auth()->user();

        return inertia('checkout/index', [
            'cartItems' => CartItemResource::collection(
                $user->cart_items()->get()
            )
        ]);
    }

    public function createOrder(StoreCheckoutRequest $request)
    {
        $user = auth()->user();

        DB::beginTransaction();

        try {
            $order = $user->orders()->create(
                $request->validated()
            );

            foreach ($user->cart_items as $cart_item) {
                $order->order_details()->create([
                    'product_id' => $cart_item->pivot->product_id,
                    'quantity' => $cart_item->pivot->quantity,
                    'sub_total' => $cart_item->pivot->sub_total
                ]);
            }

            $user->cart_items()->detach();

            DB::commit();

            Log::info("New Order#$order->id FOR USER#$user->id");

            return to_route('open-upload-payment', $order);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    public function openUploadPaymentPage(Order $order)
    {
        $order_details = OrderDetailResource::collection($order->order_details->load('product'));

        return inertia('upload_payment/index', compact('order', 'order_details'));
    }

    public function openUserOrders(Request $request)
    {
        $user_id = auth()->id();

        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'nama_penerima', 'status', 'total_belanja']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $orders = OrderResource::collection(
            Order::query()
                ->with('payment')
                ->where('user_id', $user_id)
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

        return inertia('user_orders/index', [
            'orders' => fn() => $orders,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function cancelOrder(Order $order)
    {
        DB::beginTransaction();

        try {
            $order->update([
                'status' => OrderStatus::CANCELED
            ]);

            foreach ($order->order_details as $order_detail) {
                $product = $order_detail->product;
                $product->stock += $order_detail->quantity;
                $product->save();
            }

            Log::info("Order#$order->id has been canceled, and the product already return to it's previous state.");

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

    public function showOrderDetail(Order $order)
    {
        $order_details = OrderDetailResource::collection($order->order_details);

        return inertia('user_orders/show', [
            'order' => new OrderResource($order),
            'order_details' => $order_details
        ]);
    }
}
