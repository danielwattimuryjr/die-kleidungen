<?php

namespace App\Http\Controllers;

use App\Enum\Gender;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        $genders = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            Gender::cases()
        );

        return Inertia::render('profile/index', [
            'genders' => $genders,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return back();
    }
}
