---
title: QuelLLM MCP
description: Local MCP server that lets an AI client search and compare open-weight LLMs, estimate VRAM needs, and compare API versus self-hosting costs.
added: 2026-11-26
category: Development
icon: quelllm-mcp.svg
iconLink: https://quelllm.fr/
mark: QM
repository: https://github.com/MGM-FALCON/quelllm-mcp
license: MIT
managedHosting: false
screenshot:
  src: quelllm-mcp.webp
  alt: "QuelLLM.fr catalogue view in French, listing open-weight models with parameter counts, Q4 VRAM needs, context windows, hardware tiers and tokens per second"
  width: 1280
  height: 720
  credit: FOSS Index
  own: true
  captionNote: "Our capture of the quelllm.fr catalogue on November 26, 2026. The MCP server itself has no interface; this is the catalog it queries."
---

QuelLLM MCP is an MIT-licensed Model Context Protocol server that runs
locally and gives an MCP-compatible client - Claude Code, Claude Desktop,
Cursor, Continue and others - tools over the QuelLLM catalog of open-weight
language models: search and compare models, estimate VRAM at each
quantization, and compare API provider costs with self-hosted hardware.
The data comes from the free quelllm.fr API (CC BY 4.0, no key) and is
cached locally for an hour between lookups.

The name and logo belong to the project. This is an independent listing,
not an official QuelLLM resource or an endorsement.

The repository's LICENSE file is MIT. The project is young (first release
in May 2026) with a single maintainer. Two honest caveats from its own
README: the cost estimates use price, hardware and electricity assumptions
dated May 2026 and are indicative rather than current quotes, and the
quelllm.fr site is French-first. The site also sells paid guides; they are
not part of this listing, which covers only the open-source server and the
free catalog API.

## Quick start

*Researched against upstream documentation on November 26, 2026. We have
not installed QuelLLM MCP or run these steps as part of this listing.*

### Linux, macOS and Windows

Run it without installing, using [uv](https://docs.astral.sh/uv/):

```sh
uvx --from git+https://github.com/MGM-FALCON/quelllm-mcp.git quelllm-mcp
```

Or install it with pip (Python 3.10 or newer):

```sh
pip install git+https://github.com/MGM-FALCON/quelllm-mcp.git
```

Then point your MCP client at it. For Claude Code, add to `~/.claude.json`
or a project's `.mcp.json`:

```json
{
  "mcpServers": {
    "quelllm": {
      "command": "quelllm-mcp"
    }
  }
}
```

Or the zero-install variant:

```json
{
  "mcpServers": {
    "quelllm": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/MGM-FALCON/quelllm-mcp.git", "quelllm-mcp"]
    }
  }
}
```

Most MCP clients (Cursor, Continue, Cline) accept the same JSON config.

### NixOS

QuelLLM MCP is not packaged in nixpkgs at check time. Use the uvx or pip
route above inside a shell that provides them, for example
`nix-shell -p uv` for the zero-install route.

## First steps

- Ask your client which models fit your hardware:
  `list_models(filter_family='Mistral', max_params_b=24)`.
- Estimate VRAM for one model at a chosen quant:
  `estimate_vram('mistral-small-24b', 'q4')`.
- Compare two models side by side: `compare('llama33-70b', 'qwen25-32b')`.
- Compare a monthly token volume across API providers and self-hosted
  hardware: `estimate_cost(10_000_000, 2_500_000)`. Treat the numbers as
  indicative - the underlying price assumptions are dated May 2026.

Source: the [quelllm-mcp README](https://github.com/MGM-FALCON/quelllm-mcp#readme)
and the [QuelLLM API documentation](https://quelllm.fr/api/).
