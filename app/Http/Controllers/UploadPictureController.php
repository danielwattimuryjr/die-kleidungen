<?php

namespace App\Http\Controllers;

use App\Models\TemporaryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadPictureController extends Controller
{
    public function upload(Request $request, $folder_name)
    {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs("images/$folder_name", $filename);

            TemporaryImage::create([
                'folder' => $folder_name,
                'file' => $filename
            ]);

            return $filename;
        }

        return '';
    }

    public function revert($folder_name, $file_name)
    {
        $temp_image = TemporaryImage::where('folder', $folder_name)
            ->where('file', $file_name)
            ->first();

        if ($temp_image) {
            Storage::disk('public')->delete("images/$folder_name/$file_name");
            $temp_image->delete();
        }

        return '';
    }
}
