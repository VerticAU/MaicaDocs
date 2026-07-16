#!/usr/bin/env bash
set -euo pipefail

# Structural spot-check of the rendered mkdocs-material site.
#
# Asserts that the transformed GitBook constructs actually RENDER to the
# correct mkdocs-material HTML in site/_site/ (not just that the build passed
# --strict). Deterministic: greps built HTML and resolves image targets on
# disk. No browser, no screenshots. Does NOT rebuild; assumes _site/ exists
# (run "./build.sh && mkdocs build --strict" first).
#
# Exits non-zero with a clear message if any construct is missing, any content
# image target is absent, or any legacy .gitbook/assets reference remains.

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${SITE_DIR}/_site"

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

[ -d "$OUT" ] || fail "_site/ not found at ${OUT}. Run ./build.sh && mkdocs build --strict first."

# --- Admonitions (from {% hint %}) -----------------------------------------
# GitBook ships info/warning/danger/success hints; the converter also maps
# tip, but no source page uses style="tip", so tip is checked soft.
for style in note warning danger success; do
  grep -rq "<div class=\"admonition ${style}\">" "$OUT" \
    || fail "admonition style '${style}' not rendered anywhere in _site/"
done
grep -rq '<p class="admonition-title">' "$OUT" \
  || fail "no admonition-title rendered (hint titles missing)"
if grep -rq '<div class="admonition tip">' "$OUT"; then
  pass "admonitions: note, warning, danger, success, tip all render"
else
  pass "admonitions: note, warning, danger, success render (tip has no source page; converter supports it)"
fi
# No literal admonition source leaked into HTML.
if grep -rEn '^\s*!!! (note|warning|danger|success|tip)\b' "$OUT" >/dev/null 2>&1; then
  fail "literal '!!! <type>' source found in rendered HTML (admonition not converted)"
fi

# --- Collapsibles (from <details>) -----------------------------------------
grep -rq '<details class=' "$OUT" || fail "no <details class=...> rendered (collapsibles missing)"
grep -rq '<summary>' "$OUT" || fail "no <summary> rendered (collapsibles missing)"
if grep -rEn '^\s*\?\?\? ' "$OUT" >/dev/null 2>&1; then
  fail "literal '??? ' collapsible source found in rendered HTML"
fi
pass "collapsibles: <details class> + <summary> render"

# --- Embeds (from {% embed %}) ---------------------------------------------
grep -rq '<iframe' "$OUT" || fail "no <iframe> rendered (embeds missing)"
if grep -rq '{% embed' "$OUT" || grep -rq 'endembed' "$OUT"; then
  fail "literal {% embed %} / {% endembed %} source found in rendered HTML"
fi
pass "embeds: <iframe> renders, no literal embed tokens"

# --- Code blocks with title (from {% code title= %}) -----------------------
grep -rq '<span class="filename">' "$OUT" \
  || fail "no <span class=\"filename\"> rendered (code block titles missing)"
if grep -rq '{% code' "$OUT"; then
  fail "literal {% code %} source found in rendered HTML"
fi
pass "code titles: <span class=\"filename\"> renders, no literal code tokens"

# --- Steppers (from {% stepper %}): nested block INSIDE an <ol><li> ---------
python3 - "$OUT" <<'PY' || exit 1
import sys, re, glob, os
out = sys.argv[1]
for f in glob.glob(os.path.join(out, "**", "index.html"), recursive=True):
    html = open(f, encoding="utf-8").read()
    i = 0
    while True:
        s = html.find("<ol>", i)
        if s < 0:
            break
        e = html.find("</ol>", s)
        block = html[s:e]
        # A converted stepper step nests an admonition or a highlighted code
        # block inside the <li>; a plain numbered list does not.
        if "<li>" in block and ('class="admonition' in block or 'class="highlight"' in block):
            print(f"PASS: steppers: <ol><li> with nested block renders ({os.path.relpath(f, out)})")
            sys.exit(0)
        i = e + 5
print("FAIL: no <ol> step with a nested admonition/code block found (steppers not rendered)", file=sys.stderr)
sys.exit(1)
PY
if grep -rq '{% stepper' "$OUT" || grep -rq '{% step ' "$OUT" || grep -rq 'endstepper' "$OUT"; then
  fail "literal stepper token found in rendered HTML"
fi

# --- Images: every content <img> target must exist; zero .gitbook/assets ---
if grep -rq '.gitbook/assets' "$OUT"; then
  fail "legacy '.gitbook/assets' reference still present in _site/"
fi
python3 - "$OUT" <<'PY' || exit 1
import sys, re, glob, os, urllib.parse
out = sys.argv[1]
total = ok = 0
broken = []
depths = set()
for f in glob.glob(os.path.join(out, "**", "index.html"), recursive=True):
    html = open(f, encoding="utf-8").read()
    base = os.path.dirname(f)
    for m in re.finditer(r'<img[^>]*src="([^"]+)"', html):
        src = m.group(1)
        if src.startswith(("http://", "https://", "data:")):
            continue
        if "maica-logo" in src or "favicon" in src:
            continue
        total += 1
        rel = urllib.parse.unquote(src.split("?")[0].split("#")[0])
        target = os.path.normpath(os.path.join(base, rel))
        if os.path.exists(target):
            ok += 1
            depths.add(src.count("../"))
        else:
            broken.append((os.path.relpath(f, out), src))
if total == 0:
    print("FAIL: no content images found in _site/ (asset rewrite may be broken)", file=sys.stderr)
    sys.exit(1)
if broken:
    print(f"FAIL: {len(broken)}/{total} content image targets do not exist under _site/.", file=sys.stderr)
    for f, s in broken[:10]:
        print(f"       {f} -> {s}", file=sys.stderr)
    sys.exit(1)
if len(depths) < 3:
    print(f"FAIL: content images resolve at only {len(depths)} nesting depth(s); expected 3+.", file=sys.stderr)
    sys.exit(1)
print(f"PASS: images: all {total} content image targets exist; resolve at {len(depths)} nesting depths")
PY

# --- Both nav trees + subsections ------------------------------------------
python3 - "$OUT" <<'PY' || exit 1
import sys, re, os
out = sys.argv[1]
page = os.path.join(out, "adminguide", "index.html")
html = open(page, encoding="utf-8").read()
labels = [l.strip() for l in re.findall(r'<span class="md-ellipsis">\s*([^<]+?)\s*</span>', html)]
missing = [w for w in ("Admin Guide", "User Guide", "Getting Started", "Data") if w not in labels]
if missing:
    print(f"FAIL: nav sidebar missing labels: {missing}", file=sys.stderr)
    sys.exit(1)
print("PASS: nav: 'Admin Guide' + 'User Guide' top sections with subsections render")
PY

# --- Branding: logo + favicon files present and referenced -----------------
[ -f "${OUT}/assets/maica-logo.svg" ] || fail "branding: _site/assets/maica-logo.svg missing"
ls "${OUT}"/assets/*favicon* >/dev/null 2>&1 || fail "branding: favicon asset missing under _site/assets/"
grep -rq 'maica-logo.svg' "${OUT}/adminguide/index.html" \
  || fail "branding: built page does not reference the logo in the header"
pass "branding: logo + favicon present and referenced"

echo "ALL SPOT-CHECKS PASSED"
