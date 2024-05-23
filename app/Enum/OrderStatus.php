<?php

namespace App\Enum;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELED = 'canceled';

    public function labels(): string
    {
        return match ($this) {
            self::PENDING => '⏳ Pending',
            self::PROCESSING => '🔄 Processing',
            self::SHIPPED => '🚚 Shipped',
            self::DELIVERED => '✅ Delivered',
            self::CANCELED => '❌ Canceled',
        };
    }
}