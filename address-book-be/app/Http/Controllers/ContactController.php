<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request;

        $contact = new Contact;

        $contact->name = $data->name;
        $contact->email = $data->email;
        $contact->phone_number = $data->phone_number;
        $contact->type_id = $data->type_id;
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
        $contact = Contact::find($id);
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

        $data = $request;

        if (Contact::where('id', $id)->exists()) {
            $contact = Contact::find($id);

            $contact->name = $data->name;
            $contact->email = $data->email;
            $contact->phone_number = $data->phone_number;
            $contact->type_id = $data->type_id;
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
        if (Contact::where('id', $id)->exists()) {
            $contacts = Contact::find($id);
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
