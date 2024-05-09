<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        if (auth()->user()->hasRole('admin')) {
            return inertia('dashboard/index');
        } else {
            return inertia('home/index');
        }
    }
}
