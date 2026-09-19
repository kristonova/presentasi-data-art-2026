@echo off
REM Server lokal opsional untuk deck presentasi Data Art 2026.
REM
REM Biasanya tidak perlu: klik dua kali index.html sudah langsung jalan dari file://.
REM Skrip ini disediakan bila browser Anda memiliki batasan keamanan pada berkas lokal.

cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python tidak ditemukan di PATH.
  echo Buka index.html langsung dengan klik dua kali.
  pause
  exit /b 1
)

echo Menjalankan presentasi Data Art 2026 di http://localhost:8080
echo Tekan Ctrl+C untuk menghentikan server.
start "" "http://localhost:8080/index.html"
python -m http.server 8080
