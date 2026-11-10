import json
from pathlib import Path

# 以脚本所在目录为基准，避免从其他目录运行时读写错位置。
BASE_DIR = Path(__file__).resolve().parent
NOTES_DIR = BASE_DIR / "notes"
OUTPUT_FILE = BASE_DIR / "notes_list.json"

notes = []

if NOTES_DIR.exists():
    for path in sorted(NOTES_DIR.glob("*.md")):
        notes.append({
            "title": path.stem,
            # 在网站上始终使用 posix 相对路径：notes/2026-05-03.md
            "file": path.relative_to(BASE_DIR).as_posix(),
            "mod_time": path.stat().st_mtime,
        })

notes.sort(key=lambda item: item["mod_time"], reverse=True)

with OUTPUT_FILE.open("w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"Generated {OUTPUT_FILE} with {len(notes)} notes.")
