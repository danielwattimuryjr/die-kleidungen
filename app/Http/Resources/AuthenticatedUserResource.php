<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthenticatedUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->nama_lengkap,
            'acronym' => acronym($this->nama_lengkap),
            'email' => $this->email,
            'avatar' => $this->avatar(),
            'isAdmin' => auth()->user()->hasRole('admin'),
            'total_cart_item' => auth()->user()->cart_items()->distinct()->count('product_id'),
            'tanggal_lahir' => $this->tanggal_lahir,
            'no_telp' => $this->no_telp,
            'jenis_kelamin' => $this->jenis_kelamin,
            'alamat' => $this->alamat,
        ];
    }
}
