"""Extract API lookup targets from verified training-dataset records."""

from __future__ import annotations

import re
from typing import Any


def training_metadata_targets(
    rows: list[dict[str, Any]],
) -> dict[str, dict[str, str]]:
    targets: dict[str, dict[str, str]] = {
        "github": {},
        "arxiv": {},
        "huggingface": {},
    }

    for row in rows:
        name = row["name"]
        hugging_face_match = re.match(
            r"https://huggingface\.co/datasets/([^?#]+)",
            row.get("huggingFaceUrl") or row.get("dataUrl", ""),
        )
        if hugging_face_match:
            targets["huggingface"][name] = hugging_face_match.group(1).rstrip("/")

        paper_match = re.match(
            r"https://arxiv\.org/abs/([^?#]+)", row.get("paperUrl", "")
        )
        if paper_match:
            targets["arxiv"][name] = paper_match.group(1).rstrip("/")

        github_match = re.match(
            r"https://github\.com/([^/]+/[^/#]+)", row.get("githubUrl", "")
        )
        if github_match:
            targets["github"][name] = github_match.group(1)

    return targets
