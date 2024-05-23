<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class OrderExport implements FromCollection, WithHeadings, ShouldAutoSize, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Order::query()
            ->select('id', 'user_id', 'total_belanja', 'status', 'created_at')
            ->with('user:id,nama_lengkap')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'nama_lengkap' => $order->user->nama_lengkap,
                    'total' => $order->total_belanja,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'id',
            'ordered_by',
            'total',
            'status',
            'created_at',
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
