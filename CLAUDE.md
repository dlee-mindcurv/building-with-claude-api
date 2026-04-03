# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Node.js/TypeScript project for building with the Anthropic Claude API. Uses the `@anthropic-ai/sdk` package and `dotenv` for configuration.

## Setup

- `npm install` to install dependencies
- Requires `ANTHROPIC_API_KEY` set in `.env`

## Commands

- `npm run build` — compile TypeScript to `dist/`
- `npm run typecheck` — type-check without emitting
- `npm run check` — run Biome (format + lint)
- `npm run format` — auto-fix formatting and lint issues
- `npm run lint` — lint only

## Code Style

- Biome handles formatting and linting (configured in `biome.json`)
- Tabs for indentation, double quotes for strings
- Run `npm run format` before committing
