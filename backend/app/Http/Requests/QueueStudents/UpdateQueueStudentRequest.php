<?php

namespace App\Http\Requests\QueueStudents;

use App\Models\QueueStudent;
use App\Rules\UniqueStudentInQueue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdateQueueStudentRequest extends FormRequest
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
        $queueStudent = $this->route('queueStudent');

        return [
            'started_at' => 'required|date_format:Y-m-d H:i:s,Y-m-d H:i',
            'exited' => 'required|boolean',
            'exited_at' => 'required_if:exited,true|date_format:Y-m-d H:i:s,Y-m-d H:i|after_or_equal:started_at',
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
