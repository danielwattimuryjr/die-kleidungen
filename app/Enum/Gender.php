<?php

namespace App\Enum;

enum Gender: string
{
    case MALE = 'male';
    case FEMALE = 'female';

    public function labels(): string
    {
        return match ($this) {
            self::MALE => '👱‍♂️ Pria',
            self::FEMALE => '👩 Wanita',
        };
    }
}