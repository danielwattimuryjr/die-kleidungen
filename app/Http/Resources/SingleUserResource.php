<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'nama_lengkap' => $this->nama_lengkap,
            'tanggal_lahir' => $this->tanggal_lahir,
            'no_telp' => $this->no_telp,
            'jenis_kelamin' => $this->jenis_kelamin,
            'alamat' => $this->alamat,
            'email' => $this->email,
            'joined' => $this->created_at->diffForHumans(),
            'updated' => $this->updated_at->diffForHumans(),
        ];
    }
}
