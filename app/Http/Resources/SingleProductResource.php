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
            'image_url' => $this->image ? "/storage/images/product_image/$this->image" : null,
            'image_name' => $this->image,
            'harga' => $this->harga,
            'category' => $this->category,
            'stock' => $this->stock,
            'description' => $this->description,
            'isActive' => $this->isActive,
        ];
    }
}
