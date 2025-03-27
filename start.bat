@echo off
setlocal enabledelayedexpansion

:: Get the directory where the script is located
set "SCRIPT_DIR=%~dp0"

:: Change to the script's directory
cd /d "%SCRIPT_DIR%"

:menu
cls
echo Playwright Test Script
echo ---------------------
echo 1. Install Dependencies
echo 2. Install Chromium
echo 3. Run Tests
echo 4. Update Snapshots
echo 5. Exit
echo.


:: Prompt user for input
set /p choice="Enter your choice (1-4): "

:: Remove spaces from input
set "choice=%choice: =%"

:: Validate input and execute corresponding command
if "%choice%"=="1" (
    echo Installing dependencies...
    call npm install
    echo.
    echo Dependencies installation complete.
    pause
    goto menu
) else if "%choice%"=="2" (
    echo Installing Chromium...
    call npx playwright install chromium
    echo.
    echo Chromium installation complete.
    pause
    goto menu
) else if "%choice%"=="3" (
    echo Running tests...
    call npx playwright test --headed
    echo.
    echo Test run complete.
    pause
    goto menu
) else if "%choice%"=="4" (
    echo Updating snapshots...
    call npx playwright test --update-snapshots
    echo.
    echo Snapshots update complete.
    pause
    goto menu
) else if "%choice%"=="5" (
    exit /b
) else (
    echo Invalid choice, please try again.
    pause
    goto menu
)
