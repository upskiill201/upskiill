# One-shot helper: logs into production as your admin account, fetches the
# WhatsApp QR page, and opens it. Your password is never saved or shown.

$backend = "https://teyro-backend.onrender.com"

$email = Read-Host "Admin email"
$securePassword = Read-Host "Admin password" -AsSecureString
$password = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
)

Write-Host "Logging in..."
$session = $null
try {
    Invoke-RestMethod -Uri "$backend/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body (@{ email = $email; password = $password } | ConvertTo-Json) `
        -SessionVariable session | Out-Null
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Logged in. Fetching QR page..."
try {
    Invoke-WebRequest -Uri "$backend/whatsapp/qr-page" -WebSession $session -OutFile qr.html
} catch {
    Write-Host "Could not fetch QR page (are you an ADMIN?): $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Opening qr.html - scan it with Tey's phone (WhatsApp > Settings > Linked Devices > Link a Device)."
Start-Process qr.html

Write-Host ""
Write-Host "Checking current connection status..."
try {
    $status = Invoke-RestMethod -Uri "$backend/whatsapp/status" -WebSession $session
    Write-Host ""
    Write-Host "isConnected: $($status.isConnected)"
    Write-Host "enabled:     $($status.enabled)"
    Write-Host "hasQrCode:   $($status.hasQrCode)"
} catch {
    Write-Host "Could not check status: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "To re-check status later in THIS SAME window, run:"
Write-Host '  Invoke-RestMethod -Uri "https://teyro-backend.onrender.com/whatsapp/status" -WebSession $session'
Write-Host "(in a new window, just run this script again instead - it re-logs in automatically)"
