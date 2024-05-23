<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        if ($product->stock == 0) {
            DB::table('products')
                ->where('id', $product->id)
                ->update(['isActive' => false]);
        } else {
            DB::table('products')
                ->where('id', $product->id)
                ->update(['isActive' => true]);
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
