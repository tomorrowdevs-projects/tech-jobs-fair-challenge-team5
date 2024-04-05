<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    /*  public function authorize(): bool
    {
        return true;
    }
 */
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:50'],
            'email' => ['required', 'max:50'],
            'phone_number' => ['required', 'max:50'],
            'type_id' => ['required', 'exists:types,id']
        ];
    }
}
