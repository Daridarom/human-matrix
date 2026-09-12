# Calculation engine decision

Prototype 0.3 uses `free-human-design` (MIT) bundled for the browser with esbuild.

Why: pure JavaScript, no runtime API, no user birth data leaves the browser, and no Swiss Ephemeris licensing dependency in the shipped application.

Current output used by Human Matrix: Type, Strategy mapping, Authority, Profile, centers, defined channels and activated gates.

## Verification gate
The engine is still marked experimental. Before calling results production-grade we will compare a reference set against at least two independent calculators and document birth-time/timezone edge cases.
