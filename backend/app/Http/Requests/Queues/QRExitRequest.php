<?php

namespace App\Http\Requests\Queues;

use App\Rules\CanteenHasActiveQueue;
use App\Rules\CheckCurrentQueue;
use App\Rules\NotClosedQueue;
use App\Rules\StudentIsInQueue;
use App\Rules\UniqueStudentInQueue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class QRExitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $canteen = request()->route('canteen');

        $this->merge([
            'canteen' => null
        ]);

        return [
            'student_id' => ['required', 'exists:students,id', new StudentIsInQueue($canteen->id)]
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->buildFailedValidationResponse($validator));
    }

    protected function buildFailedValidationResponse(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return new JsonResponse([
            'status' => 'error',
            'errors' => $validator->errors(),
        ], 422);
    }
}
