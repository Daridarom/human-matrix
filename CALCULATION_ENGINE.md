# Human Matrix calculation engine

## Selected astronomy layer
`hd-chart-engine` (MIT path) is used as the first local astronomical Human Design calculation layer.
It runs in the browser and returns Personality/Design activations for all supported bodies.

## Why the layers are separated
Human Matrix will not make one opaque package responsible for everything.
1. Birth moment + timezone + coordinates.
2. Astronomical activations (gates/lines/etc.).
3. BodyGraph derivation (channels, centers, Type, Authority, Profile).
4. Interpretation text.
5. Relationship/team analysis.
6. User observations.

This lets us test each layer independently and swap an engine without losing the product model.

## Current status
- Browser bundle builds successfully.
- Local smoke test is in `tests/engine-smoke.mjs`.
- Test fixture 1989-03-26 12:00 Europe/Moscow: Personality Sun gate 17, Design Sun gate 58.
- UI does not yet present these numbers as a finished Human Design profile.

## Next verification
Compare a documented set of charts against at least two independent calculators before marking calculated fields as verified.
