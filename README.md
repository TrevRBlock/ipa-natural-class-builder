# IPA Natural Class Builder v1

An interactive LING 220 feature-filtering app based on the supplied Feature Chart.

## Inventory

The app uses only the 37 IPA symbols on the supplied chart:

- 25 consonants
- 12 vowels

## Feature behaviour

Unary nodes:
- LABIAL
- CORONAL
- DORSAL

All other listed features are binary and can be set to + or -.

A sound remains in the natural class only when:
1. it contains every selected unary node; and
2. every selected binary feature has the selected value in the source chart.

If the chart does not specify a binary feature for a sound, selecting that feature excludes the sound.

## Interface

- IPA-style consonant chart by place and manner
- IPA-style vowel chart by height and backness
- Natural-class feature-bundle notation
- Live remaining-symbol count
- Optional hiding of eliminated symbols
- Hover titles show the source-chart features for each sound

## Run

```bat
npm.cmd install
npm.cmd run dev
```

## Build

```bat
npm.cmd run build
```
