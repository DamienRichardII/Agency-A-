@echo off
echo.
echo ============================================
echo   Agency A - Push vers GitHub + Vercel
echo ============================================
echo.
echo Envoi du commit "site multi-pages" vers GitHub...
echo.
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================
    echo   Succes \! Vercel va deployer dans 1-2 min
    echo ============================================
) else (
    echo ============================================
    echo   Echec du push. Verifiez vos identifiants
    echo   GitHub puis relancez ce fichier.
    echo ============================================
)
echo.
pause
