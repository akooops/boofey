<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send SMS</title>
</head>
<body>

    <h1>Send SMS</h1>

    <form action="{{ route('sms.send') }}" method="post">
        @method('post')
        @csrf

        <label for="message">Message:</label>
        <textarea name="message" id="message" cols="30" rows="5" required></textarea>

        <br>

        <label for="numbers">Array of Numbers (comma-separated):</label>
        <input type="text" name="numbers" id="numbers" placeholder="500000001, 500000002, 500000003" required>

        <br>

        <button type="submit">Send SMS</button>
    </form>

</body>
</html>
