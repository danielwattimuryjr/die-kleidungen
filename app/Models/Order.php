<?php

namespace App\Models;

use App\Enum\OrderStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $attributes = [
        'status' => OrderStatus::PENDING
    ];

    protected $fillable = [
        'user_id',
        'nama_penerima',
        'no_telp_penerima',
        'alamat_penerima',
        'catatan_penerima',
        'total_belanja',
        'status'
    ];

    protected function casts(): array
    {
        return [
            'total_belanja' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
