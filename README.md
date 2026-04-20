# Deck List Expander

A simple Nuxt web app that converts standard deck lists into an expanded format and optionally shuffles them.

## What It Does

This tool takes a deck list in the typical format:

```
4x GD01-118
2x ST04-010
```

…and converts it into an expanded list where each card is listed individually:

```
1x GD01-118
1x GD01-118
1x GD01-118
1x GD01-118
1x ST04-010
1x ST04-010
```

It also includes an optional shuffle feature using the Fisher–Yates algorithm to randomize the final output.

## Why This Exists

MSA reportedly has issues with its internal shuffling. Players have found that importing *expanded* deck lists (such as those from Exburst and Egman) results in better randomized opening hands and draws.

Manually expanding deck lists is tedious and error-prone. This tool automates that process and adds optional pre-shuffling to further improve randomness.

## Features

* Converts `Nx CARD` into repeated `1x CARD` lines
* Ignores comments (e.g., `// Main Deck`)
* Optional Fisher–Yates shuffle
* Browser-based (no setup required once deployed)

## Tech Stack

* Nuxt 3
* Vue 3
* Web Crypto API (`crypto.getRandomValues`) for secure randomness

## Usage

1. Paste your deck list into the input field
2. Enable shuffle (optional)
3. Copy the generated output
4. Import into MSA