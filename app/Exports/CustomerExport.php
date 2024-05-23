<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CustomerExport implements FromQuery, WithHeadings, ShouldAutoSize, WithStyles
{
    public function query()
    {

        $users = User::query()
            ->whereHasRole('customer')
            ->select('id', 'nama_lengkap', 'email', 'username')
            ->withCount('orders as total_orders');

        return $users;
    }

    public function headings(): array
    {
        return [
            'id',
            'nama_lengkap',
            'email',
            'username',
            'orders_count',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1 => ['font' => ['bold' => true]],
        ];
    }
}
