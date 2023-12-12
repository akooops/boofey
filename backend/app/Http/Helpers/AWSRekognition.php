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
        if(count($faceRecords) > 1){
            $faceIdsToDelete = [];

            foreach ($faceRecords as $faceRecord) {
                if (isset($faceRecord['Face']) && isset($faceRecord['Face']['FaceId'])) {
                    $faceIdsToDelete[] = $faceRecord['Face']['FaceId'];
                }
            }

            $rekognition->deleteFaces([
                'CollectionId' => $collectionId,
                'FaceIds' => $faceIdsToDelete,
            ]);

            return ['status' => 'many'];
        }

        $faceId = $faceRecords[0]['Face']['FaceId'];
        
        return $faceId;
    } else {
        return ['status' => 'nothing'];;
    }
}

function removeFace($faceID){
    $collectionId = env('AWS_DEFAULT_COLLECTION');
    
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

    $searchResponse = $rekognition->searchFaces([
        'CollectionId' => $collectionId,
        'FaceId' => $faceID,
    ]);

    $matchingFaces = $searchResponse->get('FaceMatches');

    if (!empty($matchingFaces)) {
        $rekognition->deleteFaces([
            'CollectionId' => $collectionId,
            'FaceIds' => [$faceID],
        ]);

        return true; 
    }

    return false;
}