<?php

namespace App\Http\Controllers;

use App\Enum\ProductCategory;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SingleProductResource;
use App\Models\Product;
use App\Models\TemporaryImage;
use DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Log;
use Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'nama', 'category', 'isActive', 'stock']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $products = ProductResource::collection(
            Product::query()
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

        return inertia('products/index', [
            'products' => fn() => $products,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function create()
    {
        $categories = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            ProductCategory::cases()
        );

        return inertia('products/create', compact('categories'));
    }

    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $product = Product::create($request->validated());

            $temp_image = TemporaryImage::where('file', $product->image)->first();

            if ($temp_image)
                $temp_image->delete();

            DB::commit();

            Log::info("New Product Added #$product->id");

            return to_route('products.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('products.index');
        }
    }

    public function show(Product $product)
    {
        $product = new SingleProductResource($product);
        $product['category'] = ProductCategory::from($product->category)->labels();

        return inertia('products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        $categories = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            ProductCategory::cases()
        );

        return inertia('products/edit', [
            'product' => new SingleProductResource($product),
            'categories' => $categories
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validated();

            $product->update($validatedData);

            DB::commit();

            Log::info("Product #$product->id has been edited");

            return to_route('products.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('products.index');
        }
    }

    public function destroy(Product $product)
    {
        DB::beginTransaction();

        try {
            $product->delete();
            Storage::disk('public')->delete("images/product_image/$product->image");

            DB::commit();

            Log::info("Product #$product->id has been deleted");

            return to_route('products.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('products.index');
        }
    }

    public function update_status(Product $product, $new_status)
    {
        if ($new_status == null) {
            Log::error("No status defined");

            return to_route('products.index');
        }

        DB::beginTransaction();
        try {
            $product->update(['isActive' => $new_status]);

            $product->update([
                'isActive' => $new_status
            ]);

            DB::commit();

            Log::info("Product #$product->id status updated into. Current status : $new_status");

            return to_route('products.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('products.index');
        }
    }

    public function updateProductImage(Product $product, Request $request)
    {
        DB::beginTransaction();

        $request->validate([
            'image' => 'required'
        ]);

        try {
            Storage::disk('public')->delete("images/product_image/$product->image");

            $product->update([
                'image' => $request->image
            ]);

            $temp_image = TemporaryImage::where('file', $request->image)->first();

            if ($temp_image)
                $temp_image->delete();

            Log::info("Product Image ID#$product->id is updated");

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
