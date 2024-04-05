<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = Type::all();

        return response()->json($types);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request;

        $new_type = new Type();
        $new_type->name = $data['name'];

        $new_type->save();

        return response()->json([
            "message" => "Type added."
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $type = Type::find($id);
        if (!empty($type)) {
            return response()->json($type);
        } else {
            return response()->json([
                "message" => "Type not found"
            ], 404);
        };
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request;

        if (Type::where('id', $id)->exists()) {
            $type = Type::find($id);

            $type->name = $data->name;

            $type->save();
            return response()->json([
                "message" => "type updated."
            ]);
        }

        return response()->json([
            "message" => "type updated."
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Type::where('id', $id)->exists()) {
            $types = Type::find($id);
            $types->delete();

            return response()->json([
                "message" => "Type deleted."
            ], 202);
        } else {
            return response()->json([
                "message" => "Type not found."
            ], 404);
        }
    }
}
