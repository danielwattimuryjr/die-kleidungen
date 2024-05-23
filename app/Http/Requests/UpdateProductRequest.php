<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return true;
        }
        return false;
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'category' => 'required',
            'harga' => 'required|min:1',
            'stock' => 'required|min:0',
            'description' => 'required',
        ];
    }
}
