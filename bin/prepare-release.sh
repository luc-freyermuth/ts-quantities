#!/bin/bash

if [[ $# != 1 ]]; then
  echo "Usage: $0 VERSION"
  exit 1
fi

VERSION="$1"
LOG_ENTRY="${VERSION} / $(date +%Y-%m-%d)\n\
------------------\n\
\n\
* ...\n"

sed -i "1i $LOG_ENTRY" History.md
sed -i "s/\(\"version\"\):.*$/\1: \"${VERSION}\",/" package.json
sed -i "s/\(v[[:digit:]]\+\.[[:digit:]]\+\.[[:digit:]]\+\)/v${VERSION}/g" README.md
sed -i "s/Qty.prototype.version =.*$/Qty.prototype.version = '${VERSION}';/" src/index.ts
echo "${VERSION}" > RELEASE
npm run build
