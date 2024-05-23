<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'order_detail_id' => $this->id,
            'product_name' => $this->product->nama,
            'harga_satuan' => $this->product->harga,
            'qty_order' => $this->quantity,
            'grand_total' => $this->sub_total
        ];
    }
}
