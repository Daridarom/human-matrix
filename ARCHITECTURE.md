# Human Matrix — architecture

## Product layers
1. Profile data — birth date, time, place, timezone, accuracy.
2. Calculation engines — independent modules (Human Design first).
3. Interpretation — texts and practical hypotheses, never mixed with raw calculations.
4. Relationships — pair and 3–5 person team analysis.
5. Evidence — user observations for comparing theory with lived experience.

## Human Design engine contract
Input: ISO date, local time, IANA timezone, coordinates/place identifier.
Output: personality/design activations, gates/lines, centers, channels, type, strategy, authority, profile, definition.

## Verification rule
No calculated field enters production until it matches a reference test set across edge cases: DST/history, midnight boundaries, uncertain birth times, and multiple locations.

## Privacy
Prototype stores profiles in browser localStorage only. No server storage yet.
