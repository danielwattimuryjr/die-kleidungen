import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Opsional: Mengatur jumlah digit desimal minimum
    }).format(number);
}

export function formatDate(value) {
    return dayjs(value).format('DD MMMM YYYY');
}
