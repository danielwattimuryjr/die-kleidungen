<?php

namespace App\Enum;

enum PaymentStatus: string
{
    case VERIFYING = 'verifying';
    case VERIFIED = 'verified';
    case REJECTED = 'rejected';

    public function labels(): string
    {
        return match ($this) {
            self::VERIFYING => '🔎 Verification On Progress',
            self::VERIFIED => '✅ Verified',
            self::REJECTED => '❌ Rejected',

        };
    }

}