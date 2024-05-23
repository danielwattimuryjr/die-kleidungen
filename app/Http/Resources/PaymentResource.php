<?php

namespace App\Http\Resources;

use App\Enum\PaymentStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'url' => "/storage/images/proof_of_payment/$this->image_name",
            'image_name' => $this->image_name,
            'status_original' => $this->status,
            'status' => PaymentStatus::from($this->status)->labels(),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
