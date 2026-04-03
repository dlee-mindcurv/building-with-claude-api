# Building with the Claude API

A hands-on project for learning the Anthropic Claude API, covering both TypeScript SDK usage and Python-based prompt evaluation.

## Prerequisites

- Node.js (for TypeScript examples)
- Python 3.9+ (for prompt evaluation notebooks)
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Add your Anthropic API key to `.env`:

```
ANTHROPIC_API_KEY=your-api-key-here
```

### Python environment (for prompt evaluation notebooks)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Project Structure

```
src/
├── accessing-claude-with-the-api/   # TypeScript examples using @anthropic-ai/sdk
│   ├── sdk.ts                       # Direct API access
│   ├── core.ts                      # Core SDK usage
│   ├── messages.ts                  # Messages API basics
│   ├── messages-streaming.ts        # Streaming responses
│   ├── messages-temperature.ts      # Temperature parameter
│   ├── messages-structured-data.ts  # Structured data extraction
│   └── ...
└── prompt-evaluation/               # Python notebooks for prompt evals
    ├── 001_prompt_evals.ipynb       # Evaluation pipeline: dataset generation, running prompts, grading
    ├── 001_prompt_evals_fns.ipynb   # Enhanced evals with syntax validation + model grading
    ├── 001_prompt_evals_grader.ipynb # Model-based grading approach
    └── dataset.json                 # Generated evaluation dataset (AWS tasks)
```

## Usage

### TypeScript examples

```bash
npm run build          # Compile TypeScript
npx tsx src/accessing-claude-with-the-api/messages.ts
```

### Prompt evaluation notebooks

```bash
source .venv/bin/activate
jupyter notebook src/prompt-evaluation/
```

The evaluation notebooks demonstrate a prompt eval pipeline that:

1. **Generates** a dataset of AWS-related tasks (Python, JSON, Regex)
2. **Runs** each task through Claude to produce solutions
3. **Grades** outputs using syntax validation and model-based review
4. **Reports** an average score across all test cases

## Development

```bash
npm run typecheck   # Type-check TypeScript
npm run check       # Run Biome (format + lint)
npm run format      # Auto-fix formatting and lint issues
```
