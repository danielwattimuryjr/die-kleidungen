<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements LaratrustUser
{
    use HasApiTokens, HasFactory, Notifiable, HasRolesAndPermissions;

    protected $fillable = [
        'nama_lengkap',
        'no_telp',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'username',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getRouteKeyName()
    {
        return 'username';
    }

    public function avatar($size = '150'): string
    {
        return 'https://www.gravatar.com/avatar/' . md5($this->email) . '?s=' . $size . '&d=mm';
    }

    public function cart_items()
    {
        return $this->belongsToMany(Product::class, 'carts', 'user_id', 'product_id')
            ->using(Cart::class)
            ->withPivot('quantity', 'sub_total');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function order_details()
    {
        return $this->hasManyThrough(OrderDetail::class, Order::class);
    }
}
