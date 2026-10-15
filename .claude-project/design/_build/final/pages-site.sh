#!/usr/bin/env bash
# Assemble the static site published on GitHub Pages:
# the final prototype pages plus the asset folders they load, and a root page that opens the review index.
# Usage: bash .claude-project/design/_build/final/pages-site.sh <out-dir>
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
design="$(cd "$here/../.." && pwd)"
out="${1:?usage: pages-site.sh <out-dir>}"

rm -rf "$out"
mkdir -p "$out/assets"
cp -R "$design/prototype" "$out/prototype"
for d in brand final fonts ghi images; do cp -R "$design/assets/$d" "$out/assets/$d"; done
touch "$out/.nojekyll"

cat > "$out/index.html" <<'HTML'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Textile Institution Management System — prototype</title>
<meta http-equiv="refresh" content="0; url=prototype/prototype-index.html">
<link rel="canonical" href="prototype/prototype-index.html">
</head>
<body style="font-family:system-ui,sans-serif;padding:24px">
<p>Opening the prototype… <a href="prototype/prototype-index.html">Open the review index</a> · <a href="prototype/index.html">Open the public website</a></p>
</body>
</html>
HTML

echo "Site assembled in $out ($(find "$out/prototype" -name '*.html' | wc -l | tr -d ' ') pages)"
