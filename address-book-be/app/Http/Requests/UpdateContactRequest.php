<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    /*  public function authorize(): bool
    {
        return true;
    } */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', Rule::unique('users')->ignore($this->user), 'max:50', 'string'],
            'email' => ['nullable', 'max:100', 'string'],
            'phone_number' => ['nullable', 'max:100', 'string'],
            'type_id' => ['nullable', 'exists:types,id']
        ];
    }
}
