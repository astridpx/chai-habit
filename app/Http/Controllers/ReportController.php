<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ReportController extends Controller
{
    public function inventoryAnalysis()
    {
        return Inertia::render('Reports/InventoryAnalysis');
    }
}
