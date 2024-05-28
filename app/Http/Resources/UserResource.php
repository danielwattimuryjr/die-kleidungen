<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->nama_lengkap,
            // 'acronym' => acronym($this->nama_lengkap),
            'email' => $this->email,
            // 'email_verified_at' => $this->email_verified_at?->diffForHumans() ?? 'Email not verified',
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            // 'order_count' => $this->order()->count()
        ];
    }
}
