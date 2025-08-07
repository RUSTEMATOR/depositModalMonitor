@echo off
echo Updating Playwright screenshot baselines...
echo This will regenerate all expected screenshots with the current appearance.
echo.
set /p confirm="Are you sure you want to update all screenshots? (y/N): "
if /i "%confirm%"=="y" (
    echo Updating screenshots...
    npx playwright test --update-snapshots
    echo.
    echo Screenshots updated successfully!
    echo Please review the changes before committing.
) else (
    echo Operation cancelled.
)
pause
