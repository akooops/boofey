<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Face Recognition</title>
</head>
<body>

    <h2>Face Recognition</h2>

    @if(session('success'))
        <div style="color: green;">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div style="color: red;">{{ session('error') }}</div>
    @endif

    @if(session('match'))
        <div style="color: blue;">{{ session('match') }}</div>
    @endif

    @if ($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('search.face') }}" method="post" enctype="multipart/form-data">
        @csrf
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Search Face</button>
    </form>

    @if(isset($searchResult))
        @if($searchResult['match'])
            <div style="color: green;">Face Match Found!</div>
            <div style="color: green;">Face Match Found! Confidence: {{ $searchResult['confidence'] }}</div>
            <div style="color: green;">Face Match Found! FaceID: {{ $searchResult['faceId'] }}</div>
            <div style="color: green;">Face Match Found! Confidence: {{ $searchResult['student']['firstname'] }}</div>

        @else
            <div style="color: red;">No Match Found</div>
        @endif
    @endif

</body>
</html>
