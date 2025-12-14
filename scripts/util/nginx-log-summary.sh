#!/usr/bin/env bash
# Summarize nginx access log by IP: count, first seen, last seen.

set -euo pipefail

LOG_FILE="${1:-/var/log/nginx/access.log}"

if [[ ! -f "${LOG_FILE}" ]]; then
  echo "Log file not found: ${LOG_FILE}" >&2
  exit 1
fi

# Extract IP and timestamp, aggregate, then sort by count desc.
awk '
  function month_num(mon,   n) {
    n["Jan"]=1; n["Feb"]=2; n["Mar"]=3; n["Apr"]=4; n["May"]=5; n["Jun"]=6;
    n["Jul"]=7; n["Aug"]=8; n["Sep"]=9; n["Oct"]=10; n["Nov"]=11; n["Dec"]=12;
    return n[mon];
  }
  function to_key(ts,   m) {
    # ts example: 14/Dec/2025:00:10:35 +0900
    if (match(ts, /^([0-9]{1,2})\/([A-Za-z]{3})\/([0-9]{4}):([0-9]{2}):([0-9]{2}):([0-9]{2})/, m)) {
      day = m[1]; mon = month_num(m[2]); year = m[3];
      hh = m[4]; mi = m[5]; ss = m[6];
      return sprintf("%04d%02d%02d%02d%02d%02d", year, mon, day, hh, mi, ss);
    }
    return "";
  }
  function fmt_key(key,   y,mon,d,hh,mi,ss) {
    if (length(key) != 14) return key;
    y   = substr(key, 1, 4);
    mon = substr(key, 5, 2);
    d   = substr(key, 7, 2);
    hh  = substr(key, 9, 2);
    mi  = substr(key,11, 2);
    ss  = substr(key,13, 2);
    return y "-" mon "-" d " " hh ":" mi ":" ss;
  }
  match($0, /^([0-9a-fA-F:.]+)[[:space:]]+-[[:space:]]+-[[:space:]]+\[([^\]]+)\]/, m) {
    ip = m[1]; raw = m[2];
    key = to_key(raw);
    if (key == "") next;
    count[ip]++;
    if (!(ip in first) || key < first[ip]) first[ip] = key;
    if (!(ip in last)  || key > last[ip])  last[ip]  = key;
  }
  END {
    for (ip in count) {
      printf "%s\t%d\t%s\t%s\n", ip, count[ip], fmt_key(first[ip]), fmt_key(last[ip]);
    }
  }
' "${LOG_FILE}" \
| sort -t $'\t' -k2,2nr \
| awk -F'\t' '
    NR==1 { print "IP                   Count      First               Last" }
    { printf "%-20s %-10s %-19s %-19s\n", $1, $2, $3, $4; }
  '
