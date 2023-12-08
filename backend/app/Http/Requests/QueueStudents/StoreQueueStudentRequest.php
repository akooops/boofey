<?php

namespace App\Http\Requests\QueueStudents;

use App\Rules\CheckCurrentQueue;
use App\Rules\UniqueStudentInQueue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class StoreQueueStudentRequest extends FormRequest
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
        $queue = $this->route('queue');

        return [
            'simplified' => 'required|boolean',
            'started_at' => 'required_if:simplified,false|date_format:Y-m-d H:i:s,Y-m-d H:i',
            'exited' => 'required_if:simplified,false|boolean',
            'exited_at' => 'required_if:exited,true|date_format:Y-m-d H:i:s,Y-m-d H:i|after_or_equal:started_at',
            'student_id' => ['required', 'exists:students,id', new UniqueStudentInQueue($queue->id)],
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
