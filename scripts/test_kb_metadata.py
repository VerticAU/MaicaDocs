"""Tests for scripts/kb_metadata.py. Standard library only.

Run from the repo root:
    python -m unittest discover -s scripts -p "test_*.py"
"""

from __future__ import annotations

import contextlib
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import kb_metadata  # noqa: E402

REPO_KB = Path(__file__).resolve().parent.parent / "knowledgebase"


def write(path: Path, text: str) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


def run_main(args: list[str]) -> tuple[int, str]:
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(io.StringIO()):
        code = kb_metadata.main(args)
    return code, out.getvalue()


class RetiredReasonTest(unittest.TestCase):
    def reason(self, text: str) -> str | None:
        with tempfile.TemporaryDirectory() as tmp:
            return kb_metadata.retired_reason(write(Path(tmp) / "p.md", text))

    def test_live_page_is_kept(self):
        self.assertIsNone(self.reason("---\ndescription: x\n---\n\n# Page\n"))

    def test_no_frontmatter_is_kept(self):
        self.assertIsNone(self.reason("# Page\n\nhidden: true\n"))

    def test_hidden_is_retired(self):
        self.assertEqual(self.reason("---\nhidden: true\n---\n# P\n"), "hidden: true")

    def test_noindex_alone_is_retired(self):
        self.assertEqual(self.reason("---\nnoIndex: true\n---\n# P\n"), "noIndex: true")

    def test_both_flags_are_named(self):
        text = "---\ndescription: x\nhidden: true\nnoIndex: true\n---\n# P\n"
        self.assertEqual(self.reason(text), "hidden: true, noIndex: true")

    def test_quoted_and_capitalised_true_counts(self):
        self.assertEqual(self.reason("---\nhidden: 'True'\n---\n# P\n"), "hidden: true")

    def test_false_is_kept(self):
        self.assertIsNone(self.reason("---\nhidden: false\nnoIndex: false\n---\n# P\n"))

    def test_flag_after_the_frontmatter_is_ignored(self):
        self.assertIsNone(self.reason("---\ndescription: x\n---\n# P\n\n---\nhidden: true\n---\n"))

    def test_crlf_frontmatter(self):
        self.assertEqual(self.reason("---\r\nhidden: true\r\n---\r\n# P\r\n"), "hidden: true")


class StageTest(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        tmp = Path(self._tmp.name)
        self.root = tmp / "knowledgebase"
        self.stage = tmp / "stage"
        write(self.root / "userguide" / "SUMMARY.md", "# Summary\n")
        write(self.root / "userguide" / "live.md", "---\ndescription: x\n---\n\n# Live\n")
        write(self.root / "userguide" / "old.md", "---\nhidden: true\nnoIndex: true\n---\n\n# Old\n")
        write(self.root / "adminguide" / "sub" / "README.md", "# Sub\n")

    def tearDown(self):
        self._tmp.cleanup()

    def test_stage_holds_live_pages_and_sidecars_only(self):
        code, out = run_main(["--root", str(self.root), "--no-check", "--stage", str(self.stage)])
        self.assertEqual(code, 0)
        staged = sorted(p.relative_to(self.stage).as_posix() for p in self.stage.rglob("*") if p.is_file())
        self.assertEqual(
            staged,
            [
                "adminguide/sub/README.md",
                "adminguide/sub/README.md.metadata.json",
                "userguide/SUMMARY.md",
                "userguide/live.md",
                "userguide/live.md.metadata.json",
            ],
        )
        meta = json.loads((self.stage / "userguide" / "live.md.metadata.json").read_text(encoding="utf-8"))
        self.assertEqual(meta["metadataAttributes"]["title"], "Live")
        self.assertIn("skipped: userguide/old.md (hidden: true, noIndex: true)", out)
        self.assertIn("skipped (hidden or noIndex): 1", out)
        # The repo itself is left untouched in stage mode.
        self.assertEqual(list(self.root.rglob("*.metadata.json")), [])

    def test_stage_refuses_a_non_empty_folder(self):
        write(self.stage / "leftover.md", "# Leftover\n")
        code, _ = run_main(["--root", str(self.root), "--no-check", "--stage", str(self.stage)])
        self.assertEqual(code, 1)

    def test_in_place_skips_retired_pages_and_removes_their_stale_sidecar(self):
        stale = write(self.root / "userguide" / "old.md.metadata.json", "{}\n")
        code, _ = run_main(["--root", str(self.root), "--no-check"])
        self.assertEqual(code, 0)
        self.assertFalse(stale.exists())
        self.assertTrue((self.root / "userguide" / "live.md.metadata.json").exists())


@unittest.skipUnless(REPO_KB.is_dir(), "knowledgebase/ not present")
class RepoPositiveControlTest(unittest.TestCase):
    """The page that started this: a retired Care Recipient Sync and its live -1 copy, in both guides."""

    def test_care_recipient_sync(self):
        with tempfile.TemporaryDirectory() as tmp:
            stage = Path(tmp) / "stage"
            code, out = run_main(["--root", str(REPO_KB), "--no-check", "--stage", str(stage)])
            self.assertEqual(code, 0)
            for guide in ("userguide", "adminguide"):
                folder = stage / guide / "support-at-home"
                self.assertFalse((folder / "care-recipient-sync.md").exists(), guide)
                self.assertFalse((folder / "care-recipient-sync.md.metadata.json").exists(), guide)
                self.assertTrue((folder / "care-recipient-sync-1.md").exists(), guide)
                self.assertTrue((folder / "care-recipient-sync-1.md.metadata.json").exists(), guide)
            self.assertIn("skipped: userguide/support-at-home/care-recipient-sync.md", out)
            self.assertIn("skipped: adminguide/support-at-home/care-recipient-sync.md", out)


if __name__ == "__main__":
    unittest.main()
