<?php

namespace App\Http\Requests\Queues;

use App\Rules\CanStudentEnterQueue;
use App\Rules\UniqueStudentInQueue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class SyncQueueRequest extends FormRequest
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
        $canteen = $this->get('canteen');

        $queueID = (is_null($canteen->currentQueue)) ? null : $canteen->currentQueue->id;

        return [
            'students' => 'required|array',
            'students.*.id' => ['required', 'exists:students,id', new UniqueStudentInQueue($queueID), new CanStudentEnterQueue($queueID)],
            'students.*.started_at' => 'required|date_format:Y-m-d H:i:s',
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
