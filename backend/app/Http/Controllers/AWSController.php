<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use App\Http\Requests\Billings\StoreBillingRequest;
use App\Http\Requests\Billings\UpdateBillingRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Aws\Rekognition\RekognitionClient;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AWSController extends Controller
{
    function index(){
        return view('aws');
    }

    public function searchFace(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file = $request->file('image');

        $clientOriginalName = $file->getClientOriginalName();
        $clientExtention = $file->getClientOriginalExtension();
    
        $fileName = auth()->id() . '_' . Str::uuid()->toString() . '.' . $clientExtention;  
    
        $directory = public_path('uploads/test');
    
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }
    
        $file->move($directory, $fileName);

        $searchResult = $this->performFaceSearch(public_path().'/uploads/test/'.$fileName);

        // Redirect back to the form with the search result
        return view('aws', [
        'searchResult' =>  $searchResult
    ]);
    }

    private function performFaceSearch($image)
    {
        // Initialize Rekognition client and collection ID
        $rekognition = new RekognitionClient([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION'),
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);

        $collectionId = 'BOOFEY'; // Replace with your collection ID

        // Search for faces in the specified collection using the input image
        $response = $rekognition->searchFacesByImage([
            'CollectionId' => $collectionId,
            'Image' => [
                'Bytes' => file_get_contents($image),
            ],
            'FaceMatchThreshold' => 80, // Adjust the confidence threshold as needed
            'MaxFaces' => 1, // Retrieve information for the top matching face
        ]);

        // Extract information about the identified face
        $faceMatches = $response->get('FaceMatches');

        if (!empty($faceMatches)) {
            // Get information about the top matching face (assuming only one face is retrieved)
            $topMatch = $faceMatches[0];

            // Extract relevant information (e.g., face ID, external image ID, confidence)
            $identifiedFaceId = $topMatch['Face']['FaceId'];
            $confidence = $topMatch['Similarity'];

            // Return detailed search result
            return [
                'match' => true,
                'confidence' => $confidence,
                'faceId' => $identifiedFaceId,
            ];
        } else {
            // No match found
            return [
                'match' => false,
            ];
        }
    }
}