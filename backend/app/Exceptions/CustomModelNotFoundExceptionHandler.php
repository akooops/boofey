<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class CustomModelNotFoundExceptionHandler extends Exception
{
    public function render($request, \Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->render($request, $exception);
    }
}
