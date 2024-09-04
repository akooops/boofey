<?php

use Aws\Rekognition\RekognitionClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\Else_;

function uploadFace($image, $faceID = null, $student = null)
{
    $jobId = Str::random(8);

    // Replace these values with your own
    $collectionId = env('AWS_DEFAULT_COLLECTION');
    
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

    $response = $rekognition->detectFaces([
        'Image' => [
            'Bytes' => file_get_contents($imagePath),
        ],
        'Attributes' => ['ALL'],
    ]);
    
    $detectedFaces = $response->get('FaceDetails');
    
    if(is_null($student) == false)
        Log::channel('rekognition')->info($jobId.' - Student '. $student->id .' Face uploaded at ' . now());

    if (empty($detectedFaces)) {
        if(is_null($student) == false){
            Log::channel('rekognition')->info($jobId.' No Face Detected');
        } 

        return ['status' => 'nothing'];
    }else if(count($detectedFaces) > 1){
        if(is_null($student) == false){
            Log::channel('rekognition')->info($jobId.' Many Faces Detected');
        }

        return ['status' => 'many'];
    }else{
        $faceDetail = $detectedFaces[0];
    
        $brightness = $faceDetail['Quality']['Brightness'];
        $sharpness = $faceDetail['Quality']['Sharpness'];
    
        if ($sharpness < 60 || $brightness < 45 || $brightness > 92) {
            if(is_null($student) == false){
                Log::channel('rekognition')->info($jobId.' Poor quality with sharpness '.$sharpness.' and brightness '.$brightness);
            }

            return ['status' => 'quality'];
        }
    }
        

    if(is_null($faceID) == false){
        $rekognition->deleteFaces([
            'CollectionId' => $collectionId,
            'FaceIds' => [$faceID],
        ]);

        if(is_null($student) == false){
            Log::channel('rekognition')->info($jobId.' Face deleted to be updated');
        } 
    }else{
        $response = $rekognition->searchFacesByImage([
            'CollectionId' => $collectionId,
            'Image' => [
                'Bytes' => file_get_contents($imagePath),
            ],
            'FaceMatchThreshold' => 96, 
            'MaxFaces' => 1,
        ]);

        $faceMatches = $response->get('FaceMatches');

        if (!empty($faceMatches)){
            if(is_null($student) == false){
                Log::channel('rekognition')->info($jobId.' Face Already Indexed');
            } 

            return ['status' => 'indexed'];
        }
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

            if(is_null($student) == false){
                Log::channel('rekognition')->info($jobId.' Many Faces Detected');
            } 

            return ['status' => 'many'];
        }

        $faceId = $faceRecords[0]['Face']['FaceId'];
        
        Log::channel('rekognition')->info($jobId.' Successfull Indexation with face id: '.$faceID);

        return [
            'status' => 'success',
            'faceId' => $faceId
        ];
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

function uploadFaceByS3($s3_object_bucket, $s3_object_name)
{
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
    
    $response = $rekognition->detectFaces([
        'Image' => [
            "S3Object" => [
                "Bucket" => $s3_object_bucket,
                "Name" => $s3_object_name,
            ],
        ],
        'Attributes' => ['ALL'],
    ]);
    
    $detectedFaces = $response->get('FaceDetails');
    
    if (empty($detectedFaces)) {
        return [
            'status' => 'error',
            'code' => 400,
            'message' => 'No face detected',
            'details' => 'The image does not contain a recognizable face.'
        ];
    } elseif (count($detectedFaces) > 1) {
        return [
            'status' => 'error',
            'code' => 400,
            'message' => 'Multiple faces detected',
            'details' => 'The image contains multiple faces. Please provide an image with a single face.'
        ];
    }
    
    $faceDetail = $detectedFaces[0];
    $brightness = $faceDetail['Quality']['Brightness'];
    $sharpness = $faceDetail['Quality']['Sharpness'];
    
    if ($sharpness < 60 || $brightness < 45 || $brightness > 92) {
        return [
            'status' => 'error',
            'code' => 400,
            'message' => 'Poor image quality',
            'details' => "Face quality is not sufficient for indexing. Brightness: $brightness, Sharpness: $sharpness"
        ];
    }
    
    $response = $rekognition->searchFacesByImage([
        'CollectionId' => $collectionId,
        'Image' => [
            'S3Object' => [
                'Bucket' => $s3_object_bucket,
                'Name' => $s3_object_name,
            ],
        ],
        'FaceMatchThreshold' => 96, 
        'MaxFaces' => 1,
    ]);
    
    $faceMatches = $response->get('FaceMatches');
    
    if (!empty($faceMatches)) {
        $faceId = $faceMatches[0]['Face']['FaceId'];

        return [
            'status' => 'success',
            'code' => 200,
            'message' => 'Face indexed successfully',
            'details' => [
                'faceId' => $faceId
            ]
        ];
    }
    
    $response = $rekognition->indexFaces([
        'CollectionId' => $collectionId,
        'Image' => [
            'S3Object' => [
                'Bucket' => $s3_object_bucket,
                'Name' => $s3_object_name,
            ],
        ],
        'DetectionAttributes' => ['ALL'],
    ]);
    
    $faceRecords = $response->get('FaceRecords');
    
    if (!empty($faceRecords)) {
        $faceId = $faceRecords[0]['Face']['FaceId'];
        return [
            'status' => 'success',
            'code' => 200,
            'message' => 'Face indexed successfully',
            'details' => ['faceId' => $faceId]
        ];
    }
    
    return [
        'status' => 'error',
        'code' => 500,
        'message' => 'Face indexing failed',
        'details' => 'The face could not be indexed for an unknown reason.'
    ];
}