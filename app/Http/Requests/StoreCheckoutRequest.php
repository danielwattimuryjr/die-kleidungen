<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user) {
            return true;
        }

        return false;
    }

    public function rules(): array
    {
        return [
            'nama_penerima' => 'required',
            'no_telp_penerima' => 'required',
            'alamat_penerima' => 'required',
            'catatan_penerima' => 'required',
            'total_belanja' => 'required|min:0'
        ];
    }
}
