#!/bin/bash
# Tüm platformlara dışa aktar: web (docs/), Windows exe, imzalı Android APK
set -e
SP=/tmp/claude-0/-home-claude/4c6d1a69-816f-5379-a92f-82c1000e8860/scratchpad
G=$SP/dl/Godot_v4.4.1-stable_linux.x86_64
cd "$(dirname "$0")/.."
VER=$(grep -o 'version/code=[0-9]*' export_presets.cfg | head -1 | cut -d= -f2)
echo $VER > version.txt
for C in paris roma londra; do
  timeout 300 $G --headless --export-pack "Pack_$C" docs/$C.pck > $SP/out/pack_$C.log 2>&1
done
timeout 400 $G --headless --export-release "Web" docs/index.html > $SP/out/web.log 2>&1
python3 tools/post_web.py $VER
timeout 400 $G --headless --export-release "Windows Desktop" $SP/out/MahalleDostlari.exe > $SP/out/win.log 2>&1
timeout 400 $G --headless --export-release "Android" $SP/out/unsigned.apk > $SP/out/apk.log 2>&1
python3 -I $SP/tools/apk_sign_v2.py $SP/out/unsigned.apk docs/MahalleDostlari.apk $SP/proj/keys
cp $SP/out/MahalleDostlari.exe /mnt/user-data/outputs/MahalleDostlari.exe
echo "export ok v$VER"
