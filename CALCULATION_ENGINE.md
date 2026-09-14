# Calculation engine v0.5

1. Validate Gregorian birth date (1800–2200), local HH:mm and named IANA zone.
2. Luxon resolves historical zone offsets. Reject nonexistent and ambiguous wall times rather than silently choosing an occurrence. An ambiguous input can be supplied as the verified UTC moment.
3. MIT `hd-chart-engine` computes 13 Personality and 13 Design activations, with Design at 88° of solar arc before birth.
4. Derive gates, full canonical channels, defined centers and connected components, Type, Strategy, Authority and Profile.
5. Render each individual gate and channel half. Undefined centers and completely open centers are distinguished.
6. Pair: derive union of both sets, classify electromagnetic / companionship / compromise / dominance; report owner for directional classes. Never treat the composite's inferred type or authority as either person's new type/authority.
7. Transit: retain only 13 present-moment Personality activations; no prenatal Design side, no natal profile. Overlay compares these to the unmodified natal chart.

## Boundaries

The default astronomy implementation can disagree at gate/line boundaries. Library `precision` labels describe model capability, not independent certification. UI does not label a chart as unconditionally reliable. Approximate birth time is labeled; unknown time suppresses natal calculation.

Tone/base and related variables/health interpretations are intentionally omitted. Rendering and interpretations are independent of the calculation module. No external AI API is required: texts are selected from a local original content registry by calculated gates/channels/type/profile.

## Reference provenance

User-supplied images were visually reviewed locally. One reference's 26 gate/line positions, type/profile/authority and five channels match the current calculation. A second reference gate set reproduces the composite's 7–2 center configuration and four connection classes. The second person's birth details were neither inferred nor published. These fixtures cover mechanics and reference consistency, not the scientific validity of Human Design.
