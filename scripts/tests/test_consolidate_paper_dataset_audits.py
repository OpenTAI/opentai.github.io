import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "consolidate-paper-dataset-audits.py"


def load_module():
    spec = importlib.util.spec_from_file_location("consolidate_paper_dataset_audits", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class ConsolidatePaperDatasetAuditsTests(unittest.TestCase):
    def test_quality_overrides_apply_exact_url_replacements_to_metadata_and_mentions(self):
        module = load_module()
        old_url = "https://old.example.test/dataset"
        new_url = "https://new.example.test/dataset"
        result = module.consolidate(
            [
                {
                    "name": "Dataset",
                    "dataUrl": old_url,
                    "sourceUrl": old_url,
                    "trainingEvidence": "Used for training.",
                }
            ],
            [
                {
                    "datasetName": "Dataset",
                    "paper": {"arxivId": "1"},
                    "evidence": "Used for training.",
                    "source": old_url,
                }
            ],
            [],
            [],
            {},
            quality_overrides={
                "urlReplacements": [
                    {
                        "from": old_url,
                        "to": new_url,
                        "reason": "The first-party project moved this resource.",
                        "evidenceUrl": new_url,
                    }
                ]
            },
        )

        self.assertEqual(result["metadata"][0]["dataUrl"], new_url)
        self.assertEqual(result["metadata"][0]["sourceUrl"], new_url)
        self.assertEqual(result["mentions"][0]["source"], new_url)
        self.assertEqual(
            result["metadata"][0]["linkVerificationEvidenceUrl"], new_url
        )

    def test_quality_overrides_can_drop_a_redundant_stale_source_url(self):
        module = load_module()
        stale_url = "https://old.example.test/about"
        data_url = "https://new.example.test/dataset"
        result = module.consolidate(
            [
                {
                    "name": "Dataset",
                    "dataUrl": data_url,
                    "sourceUrl": stale_url,
                    "trainingEvidence": "Used for training.",
                }
            ],
            [],
            [],
            [],
            {},
            quality_overrides={
                "urlReplacements": [
                    {
                        "from": stale_url,
                        "to": None,
                        "reason": "The stale page duplicated the verified project source.",
                        "evidenceUrl": data_url,
                    }
                ]
            },
        )

        self.assertNotIn("sourceUrl", result["metadata"][0])
        self.assertEqual(result["metadata"][0]["dataUrl"], data_url)

    def test_quality_overrides_exclude_bad_identity_and_suppress_stale_evidence(self):
        module = load_module()
        existing_metadata = [
            {"name": "Wrong identity", "dataUrl": "https://wrong.test/data"},
            {"name": "Keep", "dataUrl": "https://example.test/data"},
        ]
        existing_mentions = [
            {
                "datasetName": "Wrong identity",
                "paper": {"arxivId": "1"},
                "evidence": "Wrong.",
            },
            {
                "datasetName": "Keep",
                "paper": {"arxivId": "2"},
                "evidence": "Stale.",
            },
        ]
        existing_aliases = [
            {"alias": "Wrong", "canonicalName": "Wrong identity", "reason": "Bad merge."}
        ]
        quality_overrides = {
            "excludeCanonicalNames": ["Wrong identity"],
            "suppressMentions": [{"datasetName": "Keep", "arxivId": "2"}],
        }

        result = module.consolidate(
            existing_metadata,
            existing_mentions,
            existing_aliases,
            [],
            {},
            quality_overrides=quality_overrides,
        )

        self.assertEqual([item["name"] for item in result["metadata"]], ["Keep"])
        self.assertEqual(result["mentions"], [])
        self.assertEqual(result["aliases"], [])

    def test_correction_item_can_replace_existing_evidence(self):
        module = load_module()
        existing_metadata = [
            {
                "name": "Dataset",
                "dataUrl": "https://example.test/data",
                "trainingEvidence": "Stale evidence.",
            }
        ]
        correction = {
            "domain": "LLMs",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "Dataset",
                        "replacesExisting": True,
                        "dataUrl": "https://example.test/data",
                        "trainingEvidence": "Exact training evidence.",
                        "mentions": [
                            {
                                "paper": {"arxivId": "1", "domain": "LLMs"},
                                "evidence": "Exact training evidence.",
                            }
                        ],
                    }
                ]
            },
        }

        result = module.consolidate(existing_metadata, [], [], [correction], {})

        self.assertEqual(
            result["metadata"][0]["trainingEvidence"], "Exact training evidence."
        )

    def test_preserves_flat_openalex_paper_identity_from_audited_mentions(self):
        module = load_module()
        audit = {
            "domain": "Embodied AI",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "KITTI",
                        "dataUrl": "https://www.cvlibs.net/datasets/kitti/",
                        "trainingEvidence": "Both papers explicitly train on KITTI.",
                        "mentions": [
                            {
                                "openAlexId": "W1",
                                "paperTitle": "First KITTI training paper",
                                "source": "https://example.test/first-paper",
                            },
                            {
                                "openAlexId": "W2",
                                "paperTitle": "Second KITTI training paper",
                                "source": "https://example.test/second-paper",
                            },
                        ],
                    }
                ]
            },
        }

        result = module.consolidate([], [], [], [audit], {})

        self.assertEqual(len(result["mentions"]), 2)
        self.assertEqual(
            [mention["paper"]["openAlexId"] for mention in result["mentions"]],
            ["W1", "W2"],
        )
        self.assertEqual(
            [mention["paper"]["title"] for mention in result["mentions"]],
            ["First KITTI training paper", "Second KITTI training paper"],
        )
        self.assertEqual(
            {mention["paper"]["domain"] for mention in result["mentions"]},
            {"Embodied AI"},
        )

    def test_discards_legacy_mentions_without_a_paper_identity(self):
        module = load_module()
        existing_metadata = [
            {"name": "KITTI", "dataUrl": "https://www.cvlibs.net/datasets/kitti/"}
        ]
        existing_mentions = [
            {
                "datasetName": "KITTI",
                "paper": {"domain": "Embodied AI"},
                "evidence": "Legacy record lost its paper identity.",
            }
        ]

        result = module.consolidate(
            existing_metadata, existing_mentions, [], [], {}
        )

        self.assertEqual(result["mentions"], [])

    def test_load_enrichment_accepts_audited_datasets_wrapper(self):
        module = load_module()
        result = module.load_enrichment(
            [{"datasets": [{"canonicalName": "TrainSet", "status": "verified"}]}]
        )

        self.assertEqual(result["TrainSet"]["status"], "verified")

    def test_load_enrichment_merges_identical_cross_domain_records(self):
        module = load_module()
        result = module.load_enrichment(
            [
                [{"canonicalName": "Shared", "status": "verified", "dataUrl": "https://example.org/data"}],
                [{"canonicalName": "Shared", "status": "verified", "dataUrl": "https://example.org/data", "paperUrl": "https://example.org/paper"}],
            ]
        )

        self.assertEqual(result["Shared"]["paperUrl"], "https://example.org/paper")

    def test_load_enrichment_rejects_conflicting_cross_domain_records(self):
        module = load_module()
        with self.assertRaises(ValueError):
            module.load_enrichment(
                [
                    [{"canonicalName": "Shared", "status": "verified", "dataUrl": "https://a.test/data"}],
                    [{"canonicalName": "Shared", "status": "verified", "dataUrl": "https://b.test/data"}],
                ]
            )

    def test_omits_a_globally_ambiguous_alias_and_records_the_conflict(self):
        module = load_module()
        audits = [
            {
                "domain": "Agents",
                "coverage": {
                    "approved": [
                        {
                            "canonicalName": "News Articles",
                            "aliases": ["News"],
                            "githubUrl": "https://example.org/news-articles",
                            "paperUrl": "https://example.org/news-articles-paper",
                            "trainingEvidence": "Used for training.",
                            "mentions": [],
                        }
                    ]
                },
            },
            {
                "domain": "LLMs",
                "coverage": {
                    "approved": [
                        {
                            "canonicalName": "AG News",
                            "aliases": ["News"],
                            "githubUrl": "https://example.org/ag-news",
                            "paperUrl": "https://example.org/ag-news-paper",
                            "trainingEvidence": "Used for training.",
                            "mentions": [],
                        }
                    ]
                },
            },
        ]

        result = module.consolidate([], [], [], audits, {})

        self.assertEqual(result["aliases"], [])
        self.assertEqual(result["aliasConflicts"][0]["alias"], "News")
        self.assertEqual(
            result["aliasConflicts"][0]["canonicalNames"],
            ["AG News", "News Articles"],
        )

    def test_adds_verified_metadata_mentions_and_explicit_aliases(self):
        module = load_module()
        audit = {
            "domain": "Agents",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "AgentTrain",
                        "aliases": ["Agent Train"],
                        "nameMatchReason": "The paper and repository use both names.",
                        "year": 2024,
                        "venue": "ACL 2024",
                        "paperUrl": "https://arxiv.org/abs/2401.00001",
                        "githubUrl": "https://github.com/example/agent-train",
                        "trainingEvidence": "We fine-tune the agent on AgentTrain.",
                        "mentions": [
                            {
                                "paper": {
                                    "arxivId": "2401.00001",
                                    "title": "Agent paper",
                                    "domain": "Agents",
                                },
                                "evidence": "We fine-tune the agent on AgentTrain.",
                                "source": "sections/04-training.md",
                            }
                        ],
                    }
                ]
            },
        }

        result = module.consolidate([], [], [], [audit], {})

        self.assertEqual(result["metadata"][0]["name"], "AgentTrain")
        self.assertEqual(
            result["metadata"][0]["dataUrl"],
            "https://github.com/example/agent-train",
        )
        self.assertEqual(result["mentions"][0]["role"], "training")
        self.assertEqual(result["aliases"][0]["alias"], "Agent Train")
        self.assertEqual(result["unresolved"], [])

    def test_does_not_publish_an_item_without_a_verified_public_data_link(self):
        module = load_module()
        audit = {
            "domain": "Agents",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "PrivateData",
                        "paperUrl": "https://arxiv.org/abs/2401.00001",
                        "trainingEvidence": "Used for training, but not released.",
                        "mentions": [],
                    }
                ]
            },
        }

        result = module.consolidate([], [], [], [audit], {})

        self.assertEqual(result["metadata"], [])
        self.assertEqual(result["mentions"], [])
        self.assertEqual(result["unresolved"][0]["canonicalName"], "PrivateData")

    def test_enrichment_can_supply_a_verified_data_link(self):
        module = load_module()
        audit = {
            "domain": "LLMs",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "SafeTrain",
                        "paperUrl": "https://arxiv.org/abs/2401.00002",
                        "trainingEvidence": "SafeTrain is used to fine-tune the model.",
                        "mentions": [],
                    }
                ]
            },
        }
        enrichment = {
            "SafeTrain": {
                "status": "verified",
                "huggingFaceUrl": "https://huggingface.co/datasets/example/safe-train",
                "evidenceUrl": "https://huggingface.co/datasets/example/safe-train",
                "reason": "The authors' data card cites the same paper and dataset release.",
            }
        }

        result = module.consolidate([], [], [], [audit], enrichment)

        self.assertEqual(
            result["metadata"][0]["dataUrl"],
            "https://huggingface.co/datasets/example/safe-train",
        )
        self.assertEqual(
            result["metadata"][0]["linkVerificationReason"],
            "The authors' data card cites the same paper and dataset release.",
        )

    def test_enrichment_replaces_a_stale_automated_link(self):
        module = load_module()
        audit = {
            "domain": "Agents",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "SafetyBench",
                        "githubUrl": "https://github.com/example/wrong-name-match",
                        "trainingEvidence": "The released split is used for training.",
                        "mentions": [
                            {
                                "paper": {"arxivId": "2401.1", "domain": "Agents"},
                                "evidence": "The released split is used for training.",
                                "source": "sections/04.md",
                            }
                        ],
                    }
                ]
            },
        }
        enrichment = {
            "SafetyBench": {
                "status": "verified",
                "githubUrl": "https://github.com/authors/safety-bench",
                "dataUrl": "https://github.com/authors/safety-bench/tree/main/data",
            }
        }

        result = module.consolidate([], [], [], [audit], enrichment)

        self.assertEqual(
            result["metadata"][0]["githubUrl"],
            "https://github.com/authors/safety-bench",
        )
        self.assertEqual(
            result["metadata"][0]["dataUrl"],
            "https://github.com/authors/safety-bench/tree/main/data",
        )

    def test_explicit_existing_alias_merges_into_existing_canonical_metadata(self):
        module = load_module()
        existing_metadata = [
            {
                "name": "Crafted datasets",
                "paperUrl": "https://arxiv.org/abs/2502.16580",
                "dataUrl": "https://github.com/authors/project/tree/main/data",
                "trainingEvidence": "Released crafted data is used for training.",
            }
        ]
        existing_aliases = [
            {
                "alias": "Indirect PIA Crafted Training Datasets",
                "canonicalName": "Crafted datasets",
                "reason": "The paper and repository prove these are the same files.",
            }
        ]
        audit = {
            "domain": "Agents",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "Indirect PIA Crafted Training Datasets",
                        "trainingEvidence": "Released crafted data is used for training.",
                        "mentions": [
                            {
                                "paper": {"arxivId": "2502.16580", "domain": "Agents"},
                                "evidence": "Released crafted data is used for training.",
                                "source": "sections/04.md",
                            }
                        ],
                    }
                ]
            },
        }

        result = module.consolidate(
            existing_metadata, [], existing_aliases, [audit], {}
        )

        self.assertEqual(len(result["metadata"]), 1)
        self.assertEqual(result["metadata"][0]["name"], "Crafted datasets")
        self.assertEqual(result["mentions"][0]["datasetName"], "Crafted datasets")

    def test_existing_alias_metadata_is_folded_into_canonical_entry(self):
        module = load_module()
        existing_metadata = [
            {
                "name": "Canonical",
                "dataUrl": "https://example.org/data",
                "trainingEvidence": "Canonical evidence.",
            },
            {
                "name": "Old name",
                "dataUrl": "https://example.org/data",
                "paperUrl": "https://example.org/paper",
                "trainingEvidence": "Alias evidence.",
            },
        ]
        existing_mentions = [
            {
                "datasetName": "Old name",
                "paper": {"arxivId": "2401.1"},
                "evidence": "Used for training.",
                "source": "section.md",
            }
        ]
        aliases = [
            {
                "alias": "Old name",
                "canonicalName": "Canonical",
                "reason": "Both point to the same verified release.",
            }
        ]

        result = module.consolidate(existing_metadata, existing_mentions, aliases, [], {})

        self.assertEqual(len(result["metadata"]), 1)
        self.assertEqual(result["metadata"][0]["name"], "Canonical")
        self.assertEqual(result["metadata"][0]["paperUrl"], "https://example.org/paper")
        self.assertEqual(result["mentions"][0]["datasetName"], "Canonical")

    def test_merges_mentions_into_existing_verified_metadata_without_duplicates(self):
        module = load_module()
        existing_metadata = [
            {
                "name": "XGuard-Train",
                "domain": "Agents",
                "paperUrl": "https://arxiv.org/abs/2504.13203",
                "dataUrl": "https://huggingface.co/datasets/marslabucla/XGuard-Train",
                "trainingEvidence": "Official training dataset.",
            }
        ]
        mention = {
            "datasetName": "XGuard-Train",
            "status": "approved",
            "role": "training",
            "paper": {"arxivId": "2504.13203", "title": "X-Teaming", "domain": "Agents"},
            "evidence": "We train XGuard on XGuard-Train.",
            "source": "sections/04-training.md",
        }
        audit = {
            "domain": "Agents",
            "coverage": {
                "approved": [
                    {
                        "canonicalName": "XGuard-Train",
                        "trainingEvidence": "We train XGuard on XGuard-Train.",
                        "mentions": [mention["paper"] and {
                            "paper": mention["paper"],
                            "evidence": mention["evidence"],
                            "source": mention["source"],
                        }],
                    }
                ]
            },
        }

        first = module.consolidate(existing_metadata, [mention], [], [audit], {})
        second = module.consolidate(
            first["metadata"], first["mentions"], first["aliases"], [audit], {}
        )

        self.assertEqual(len(second["metadata"]), 1)
        self.assertEqual(len(second["mentions"]), 1)


if __name__ == "__main__":
    unittest.main()
