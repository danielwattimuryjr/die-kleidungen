<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ProductExport implements FromCollection, WithHeadings, ShouldAutoSize, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Product::query()
            ->select('id', 'nama', 'harga', 'category', 'stock', 'isActive', 'created_at')
            ->withSum('order_details as total_sold', 'quantity')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama' => $product->nama,
                    'harga' => $product->harga,
                    'category' => $product->category,
                    'stock' => $product->stock,
                    'isActive' => $product->isActive,
                    'total_sold' => $product->total_sold,
                    'created_at' => $product->created_at,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'id',
            'product_name',
            'price',
            'category',
            'in_stock',
            'is_active',
            'total_sold',
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
