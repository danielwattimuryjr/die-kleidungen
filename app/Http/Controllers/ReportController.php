<?php

namespace App\Http\Controllers;

use App\Exports\CustomerExport;
use App\Exports\OrderExport;
use App\Exports\ProductExport;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{

    public function index($report_type, $file_type)
    {
        $file_name = $report_type . '_' . Str::random(10);

        switch ($report_type) {
            case 'customers':
                $export = new CustomerExport();
                break;
            case 'orders':
                $export = new OrderExport();
                break;
            case 'products':
                $export = new ProductExport();
                break;
            default:
                return redirect()->back()->with('error', 'Invalid report type');
        }

        switch ($file_type) {
            case 'csv':
                $file_name .= '.csv';
                return Excel::download($export, $file_name, \Maatwebsite\Excel\Excel::CSV);
            case 'xlsx':
                $file_name .= '.xlsx';
                return Excel::download($export, $file_name, \Maatwebsite\Excel\Excel::XLSX);
            case 'pdf':
                $file_name .= '.pdf';
                return Excel::download($export, $file_name, \Maatwebsite\Excel\Excel::DOMPDF);
            default:
                $file_name .= '.xls';
                return Excel::download($export, $file_name, \Maatwebsite\Excel\Excel::XLS);
        }
    }
}
