<?php

namespace App\Http\Resources;

use App\Enum\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'gambar' => $this->gambar,
            'harga' => $this->harga,
            'category' => $this->category,
            'stock' => $this->stock,
            'description' => $this->description,
            'isActive' => $this->isActive,
        ];
    }
}
