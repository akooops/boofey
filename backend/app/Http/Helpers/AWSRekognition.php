<?php

use Aws\Rekognition\RekognitionClient;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

function uploadFace($image, $faceID = null)
{
    // Replace these values with your own
    $collectionId = env('AWS_DEFAULT_COLLECTION');
    
    $faceId = Str::random(6);

    // Create a Rekognition client
    $rekognition = new RekognitionClient([
        'version' => 'latest',
        'region' => env('AWS_DEFAULT_REGION'),
        'credentials' => [
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
        ],
    ]);
    
    $collections = $rekognition->listCollections();

    if (in_array($collectionId, $collections['CollectionIds']) == false) {
        $rekognition->createCollection(['CollectionId' => $collectionId]);
    }

    $imagePath = public_path()."/uploads/{$image}";

    if(file_exists($imagePath) != true) return;

    if(is_null($faceID) == false){
        $rekognition->deleteFaces([
            'CollectionId' => $collectionId,
            'FaceIds' => [$faceID],
        ]);
    }

    $response = $rekognition->indexFaces([
        'CollectionId' => $collectionId,
        'Image' => [
            'Bytes' => file_get_contents($imagePath),
        ],
        'DetectionAttributes' => ['ALL'],
    ]);

    $faceRecords = $response->get('FaceRecords');
    
    if (!empty($faceRecords)) {
        $faceId = $faceRecords[0]['Face']['FaceId'];
        
        return $faceId;
    } else {
        return null;
    }
}