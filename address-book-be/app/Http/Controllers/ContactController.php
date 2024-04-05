<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = User::all();
        return response()->json($contacts);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $contact = new User;

        /* TODO: remove */
        $contact->password = "x";
        /* /todo */
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone_number = $request->phone_number;
        $contact->type_id = $request->type_id;
        $contact->save();
        return response()->json([
            "message" => "Contact added."
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contact = User::find($id);
        if (!empty($contact)) {
            return response()->json($contact);
        } else {
            return response()->json([
                "message" => "Contact not found"
            ], 404);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (User::where('id', $id)->exists()) {
            $contact = User::find($id);

            $contact->name = $request->name;
            $contact->email = $request->email;
            $contact->phone_number = $request->phone_number;
            $contact->type_id = $request->type_id;
            $contact->save();
            return response()->json([
                "message" => "Contact updated."
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (User::where('id', $id)->exists()) {
            $contacts = User::find($id);
            $contacts->delete();

            return response()->json([
                "message" => "Contact deleted."
            ], 202);
        } else {
            return response()->json([
                "message" => "Contact not found."
            ], 404);
        }
    }
}
