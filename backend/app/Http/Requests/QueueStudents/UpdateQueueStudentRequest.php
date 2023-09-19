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
        $queueStudent = QueueStudent::findOrFail($this->route('queueStudent'));

        return [
            'started_at' => 'required|date_format:Y-m-d H:i:s',
            'exited' => 'required|boolean',
            'exited_at' => 'required_if:exited,true|date_format:Y-m-d H:i:s|after_or_equal:started_at',
            'student_id' => ['required', new UniqueStudentInQueue($queueStudent->queue_id, $queueStudent->id)],
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
