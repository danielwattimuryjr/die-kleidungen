<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'username' => ['alpha_dash', 'min:5', Rule::unique(User::class)->ignore($this->user()->id)],
            'tanggal_lahir' => 'required',
            'no_telp' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }
}
