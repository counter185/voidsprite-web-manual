#!/usr/bin/env sh

[[ $(wget https://cntrpl.itch.io/voidsprite -O -) =~ \&quot\;https:\/\/[a-z\.\-]+itch\.zone\/html\/([0-9]+)\/[a-zA-Z0-9\/\?=\.]+\&quot\; ]] && ITCHID=${BASH_REMATCH[1]}
echo new itch id is $ITCHID
if [[ $ITCHID =~ ([0-9]+) ]]; then
  sed -i -E "s*src=\"[^\"]+\" allowfullscreen*src=\"https://itch.io/embed-upload/$ITCHID?color=040404\" allowfullscreen*g" ./manual/run_web.html
  exit 0
fi
exit 1

