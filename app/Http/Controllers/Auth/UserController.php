<?php

namespace App\Http\Controllers\Auth;

use App\Enum\Gender;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\SingleUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Log;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'email_verified_at', 'name', 'username', 'posts_count']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $users = UserResource::collection(
            User::query()
                ->whereHasRole('customer')
                ->where('id', '!=', auth()->id())
                ->when(
                    value: $request->search,
                    callback: fn($query, $value) => $query->where('name', 'like', '%' . $value . '%')
                        ->orWhere('email', 'like', '%' . $value . '%')
                        ->orWhere('username', 'like', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn($query) => $query->orderBy($request->field, $request->direction),
                    default: fn($query) => $query->latest()
                )
                ->fastPaginate($limit)
                ->withQueryString()
        );

        return inertia('users/index', [
            'users' => fn() => $users,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function create()
    {
        $genders = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            Gender::cases()
        );

        return inertia('users/create', compact('genders'));
    }

    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->validated())->addRole('customer');

            DB::commit();

            Log::info("New User Added #$user->id");

            return to_route('users.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('users.index');
        }
    }

    public function show(User $user)
    {
        $user = new SingleUserResource($user);
        $user['jenis_kelamin'] = Gender::from($user->jenis_kelamin)->labels();
        $user_cart = CartItemResource::collection($user->cart_items);

        return inertia('users/show', [
            'user' => $user,
            'cart_items' => $user_cart,
        ]);
    }

    public function edit(User $user)
    {
        $genders = array_map(
            fn($category) => ['value' => $category->value, 'label' => $category->labels()],
            Gender::cases()
        );

        return inertia('users/edit', [
            'user' => new SingleUserResource($user),
            'genders' => $genders
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        DB::beginTransaction();
        try {
            $user->update($request->validated());

            DB::commit();

            Log::info("Product #$user->id has been edited");

            return to_route('users.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('users.index');
        }
    }

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $user->delete();

            DB::commit();

            Log::info("User #$user->id has been deleted");

            return to_route('users.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return to_route('users.index');
        }
    }
}
