#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
set -e

# 打包編譯
npm run build

# 移動至到打包後的dist目錄 
cd dist

# 因為 dist 資料夾預設是被 ignore 的，因此在進入dist資料夾後初始化 git
git init 
git add -A
git commit -m 'deploy'

git push -f https://github.com/codewarrior1992/hex-hotel.git master:gh-pages

# cd
cd -