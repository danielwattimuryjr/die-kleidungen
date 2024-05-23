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
            'image_url' => $this->image ? "/storage/images/product_image/$this->image" : null,
            'image_name' => $this->image,
            'harga' => $this->harga,
            'category' => ProductCategory::from($this->category)->labels(),
            'stock' => $this->stock,
            'isActive' => $this->isActive,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
