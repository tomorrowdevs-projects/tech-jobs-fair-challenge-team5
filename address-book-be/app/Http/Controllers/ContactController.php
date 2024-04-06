<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $searchString = $request->searchString;
        $searchType = $request->searchType;

        $contactsQuery = Contact::with('type')
            ->where(function ($query) use ($searchString) {
                $query->where('name', 'like', "%$searchString%")
                    ->orWhere('email', 'like', "%$searchString%")
                    ->orWhere('phone_number', 'like', "%$searchString%");
            });
        if ($searchType !== null) {
            $contactsQuery = $contactsQuery->where('type_id', '=', $searchType);
        }

        $contacts = $contactsQuery->get();

        $formattedContacts = $contacts->map(function ($contact) {
            return [
                'id' => $contact->id,
                'type_id' => $contact->type_id,
                'type_name' => $contact->type === null ? null : $contact->type->name,
                'name' => $contact->name,
                'email' => $contact->email,
                'phone_number' => $contact->phone_number,
                'created_at' => $contact->created_at,
                'updated_at' => $contact->updated_at,
            ];
        });
        return response()->json($formattedContacts);
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
        $contact = Contact::with('type')->find($id);

        if (!empty($contact)) {
            return response()->json([
                'id' => $contact->id,
                'type_id' => $contact->type_id,
                'type_name' => $contact->type === null ? null : $contact->type->name,
                'name' => $contact->name,
                'email' => $contact->email,
                'phone_number' => $contact->phone_number,
                'created_at' => $contact->created_at,
                'updated_at' => $contact->updated_at,
            ]);
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
