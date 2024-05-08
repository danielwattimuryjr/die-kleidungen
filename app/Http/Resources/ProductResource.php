<?php

namespace App\Http\Resources;

use App\Enum\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'gambar' => $this->gambar,
            'harga' => $this->harga,
            'category' => ProductCategory::from($this->category)->labels(),
            'stock' => $this->stock,
            'isActive' => $this->isActive,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
