# Human Matrix architecture

- `src/hd-core.js`: independent deterministic calculation, validation, gate/channel/center derivation, relationship classification, transits; bundled to `dist/hd-core.js`.
- `src/bodygraph.js`: original SVG geometry for every gate and canonical channel; colors reflect the selected activation layer.
- `src/readings.js`: original interpretation registry, separate from calculated data.
- `src/app.js`: local profile persistence, views, interactions, notes, import/export.
- `src/style.css`: responsive layouts and interaction/accessibility styles.
- `tests/`: engine checks, independently transcribed reference fixtures, mechanics and user-flow regressions.

## Product contract

Calculation → interpretation → question → observation. Interpretation is not a measured personality trait. Relationship counts are not a quality score. Transit overlays do not change natal identity.

## Source continuity

Existing repository and GitHub Pages address are retained. localStorage key `human-matrix.profiles.v1` is unchanged; prior profile JSON remains readable. Empty profile lists remain empty after reload. No default profile resurrection after deletion.

## Verification gate

Every release runs build + existing checks + regressions for changed calculation rules and user flows. Reference comparisons must record actual outputs and their limits. Full browser review supplements DOM tests.

## Privacy

Birth data stays in the browser. Named-zone calculation requires no geocoding or external API request. Location text is descriptive; the user must choose the correct historical IANA zone. No automatic cross-device synchronization. Preserve user's files and sharing settings.
