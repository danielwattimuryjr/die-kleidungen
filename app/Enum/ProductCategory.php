<?php

namespace App\Enum;

enum ProductCategory: string
{
    case BAJU = 'baju';
    case CELANA = 'celana';
    case JAKET = 'jaket';
    case SEPATU = 'sepatu';

    public function labels(): string
    {
        return match ($this) {
            self::BAJU => '👕 Baju',
            self::CELANA => '👖 Celana',
            self::JAKET => '🧥 Jaket',
            self::SEPATU => '👟 Sepatu',
        };
    }
}