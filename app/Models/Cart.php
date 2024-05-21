<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Cart extends Pivot
{
    protected $fillable = ['user_id', 'product_id', 'quantity', 'sub_total'];

    public function addProduct($product, $quantity)
    {
        $user = auth()->user();
        $existingCartItem = $user->cart_items()
            ->where('product_id', $product->id)
            ->first();

        if ($existingCartItem) {
            // Jika data ditemukan, lakukan update
            $existingCartItem->pivot->quantity += $quantity;
            $existingCartItem->pivot->sub_total = $existingCartItem->pivot->quantity * $product->harga;
            $existingCartItem->pivot->save();
        } else {
            // Jika tidak ditemukan, sisipkan data baru
            $sub_total = $product->harga * $quantity;
            $user->cart_items()->attach($product->id, [
                'quantity' => $quantity,
                'sub_total' => $sub_total
            ]);
        }

        $product->stock -= $quantity;
        $product->save();
    }

    public function removeProduct($product)
    {
        $user = auth()->user();
        $existingCartItem = $user->cart_items()
            ->where('product_id', $product->id)
            ->first();

        if ($existingCartItem) {
            $quantity = $existingCartItem->pivot->quantity;
            $product->stock += $quantity;
            $product->save();

            $user->cart_items()->detach($product->id);
        }
    }
}
