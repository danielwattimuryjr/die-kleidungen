<?php

namespace App\Http\Resources;

use App\Enum\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_penerima' => $this->nama_penerima,
            'total_belanja' => $this->total_belanja,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'status' => OrderStatus::from($this->status)->labels(),
            'original_status' => $this->status,
            'payment' => $this->payment ? new PaymentResource($this->payment) : null
        ];
    }
}
