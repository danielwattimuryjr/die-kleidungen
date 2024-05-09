<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        if (auth()->user()->hasRole('admin')) {
            return true;
        }

        return false;
    }

    public function rules(): array
    {
        return [
            'nama_lengkap' => 'required|string|max:255',
            'username' => 'required|string|unique:' . User::class,
            'tanggal_lahir' => 'required',
            'no_telp' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
