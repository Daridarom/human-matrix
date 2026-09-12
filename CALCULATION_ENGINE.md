# Human Matrix — calculation engine

## v0.3 pipeline

1. Birth date + local birth time + IANA timezone.
2. `hd-chart-engine` computes Personality and Design planetary activations locally in the browser.
3. Human Matrix derives activated gates, 36 canonical channels, defined/open centers, Type, Strategy, Authority and Profile.
4. The UI renders its own schematic center graph; it does not copy a proprietary BodyGraph drawing.
5. Pair analysis is derived only from the two calculated gate sets and is kept separate from interpretation.

## Accuracy boundary

The MIT astronomy engine reports gate, line and color as reliable in its documented validation range. Tone/base are not treated as authoritative in the Human Matrix interface. Exact chart outputs still need regression checks against reference charts before a 1.0 release.

## Privacy

Profiles are stored in browser `localStorage`. Calculation is local. No birth data is sent to a Human Matrix server in v0.3.

## Product rule

Calculation, interpretation, hypothesis, and observation are separate data layers. A symbolic interpretation must never silently become a calculated fact.
