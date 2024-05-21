<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function redirect()
    {
        if (auth()->check()) {
            # code...
            if (auth()->user()->hasRole('admin')) {
                return inertia('dashboard/index');
            }
        }
        return to_route('home');
    }
}
