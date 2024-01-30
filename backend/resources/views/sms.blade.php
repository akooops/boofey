<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send SMS</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #007bff;
        }

        form {
            margin-top: 20px;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        textarea, input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        .result-message {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .success-message {
            color: #28a745;
        }

        .error-message {
            color: #dc3545;
        }
    </style>
</head>
<body>

    <h1>Send SMS</h1>

    <form action="{{ route('sms.send') }}" method="post">
        @method('post')
        @csrf

        <label for="message">Message:</label>
        <textarea name="message" id="message" cols="30" rows="5" required></textarea>

        <label for="send_to">Send To:</label>
        <select name="send_to" id="send_to" onchange="toggleCustomInput()" required>
            <option value="all">All</option>
            <option value="subscribed">Subscribed</option>
            <option value="not_subscribed">Not Subscribed</option>
            <option value="custom">Custom Numbers</option>
        </select>

        <div id="customInput" style="display: none;">
            <label for="custom_numbers">Custom Numbers (comma-separated):</label>
            <input type="text" name="custom_numbers" id="custom_numbers" placeholder="500000001, 500000002, 500000003">
        </div>

        <button type="submit">Send SMS</button>
    </form>

    @isset($data)
    <div class="result-message">
        @if ($data['status'] === 'success')
            <p class="success-message">SMS sent successfully! Job ID: {{ $data['data']['job_id'] }}</p>
        @else
            <p class="error-message">Error sending SMS: {{ $data['error'] }}</p>
        @endif
    </div>
@endisset

<script>
    function toggleCustomInput() {
        var sendTo = document.getElementById('send_to').value;
        var customInput = document.getElementById('customInput');

        if (sendTo === 'custom') {
            customInput.style.display = 'block';
        } else {
            customInput.style.display = 'none';
        }
    }
</script>
</body>
</html>
