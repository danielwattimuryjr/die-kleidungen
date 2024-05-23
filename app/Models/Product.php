<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'description',
        'harga',
        'image',
        'category',
        'stock',
        'isActive'
    ];

    protected function casts(): array
    {
        return [
            'harga' => 'integer',
            'stock' => 'integer',
        ];
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'carts', 'product_id', 'user_id')
            ->using(Cart::class)
            ->withPivot('quantity', 'sub_total');
    }

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
