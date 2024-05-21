<?php

namespace App\Http\Controllers\Auth;

use App\Enum\Gender;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $genders = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            Gender::cases()
        );

        return Inertia::render('auth/register', compact('genders'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validateFirstStep(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:' . User::class,
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
    }
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($request->password);

        $user = User::create($validated)->addRole('customer');

        event(new Registered($user));

        auth()->login($user);

        return redirect('redirect-user');
    }
}
