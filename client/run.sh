#!/usr/bin/env sh

set -x
set -e

branch='master'

if [ "${1}" != '' ]; then
  branch="${1}"
fi

git fetch --all
git reset --hard HEAD
git checkout "${branch}"
git pull origin "${branch}"

rm -rf node_modules
npm i

pushd ios
rm -rf Pods
pod install
popd

npm start -- --reset-cache
