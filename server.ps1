$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()

Write-Host "Server running at http://localhost:8000"
Write-Host "Press Ctrl+C to stop"

$root = "C:\Users\Aman Kumar\Documents\Default Project\school-website"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $path = $request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    
    $filePath = Join-Path $root ($path.TrimStart('/').Replace('/', '\'))
    
    if (Test-Path $filePath) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        switch ($ext) {
            '.html' { $response.ContentType = 'text/html' }
            '.css' { $response.ContentType = 'text/css' }
            '.js' { $response.ContentType = 'application/javascript' }
            default { $response.ContentType = 'application/octet-stream' }
        }
        
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found')
        $response.StatusCode = 404
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }
    
    $response.Close()
}
