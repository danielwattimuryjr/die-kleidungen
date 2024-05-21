<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_produk' => $this->nama,
            'harga_produk' => $this->harga,
            'quantity' => $this->pivot->quantity,
            'sub_total' => (int) $this->pivot->sub_total
        ];
    }
}
