---
title: Ollama
description: Run large language models locally with one command - a CLI and local API for downloading and serving open-weight models.
category: Development
tags:
- Self-hosted
icon: ollama.png
iconLink: https://ollama.com/
mark: OL
repository: https://github.com/ollama/ollama
license: MIT
nixosModule: services.ollama
screenshot:
  src: ollama-source.webp
  alt: "Terminal showing ollama run llama3 downloading the model and starting an interactive chat session on Linux"
  width: 1329
  height: 492
  credit: MGeog2022
  sourceUrl: https://commons.wikimedia.org/wiki/File:Ollama-running-llama3-in-linux.png
  license: CC BY 4.0
  captionNote: "Wikimedia Commons capture of Ollama running Llama 3 in a Linux terminal; shows an older model version, not our install."
---

Ollama is an MIT-licensed tool that runs open-weight language models on your
own machine: one command downloads a model and starts a chat, and a local
API on port 11434 serves it to other apps. It handles model storage,
quantized weights and GPU use, and is the backend many local-AI frontends
expect. The models you download carry their own licenses - the MIT license
covers the Ollama tool, not each model's weights or terms.

Ollama is the name and mark of the project. This is an independent listing,
not an official Ollama resource or an endorsement.

## Quick start

*Researched from Ollama's documentation and GitHub releases on November 12,
2026. We have not installed or run it.*

### Linux

The project's documented install route:

```sh
curl -fsSL https://ollama.com/install.sh | sh
ollama run llama3.2
```

The first `run` downloads the model (several GB) and starts an interactive
session. Native installers also exist for macOS and Windows, and a Docker
image is published. Check your GPU and RAM against the model's size on the
model library page before pulling; a quantized 7-8B model is a practical
starting point on a desktop.

### NixOS

```nix
services.ollama = {
  enable = true;
  # acceleration = "cuda"; # or "rocm", if your GPU is supported
};
```

Apply with `sudo nixos-rebuild switch`. The module runs the Ollama service
and its API; pull models with `ollama pull` as your user or through the
module's `loadModels` option, and keep the API bound to localhost unless
you deliberately share it.

## First use

Try a small model interactively, then point a frontend or your own scripts
at `http://127.0.0.1:11434`. Watch memory use: concurrent models stay
loaded until they idle out, and larger models need proportionally more RAM
or VRAM.

## Documentation

- [Ollama](https://ollama.com/)
- [GitHub repository and releases](https://github.com/ollama/ollama)
- [Model library](https://ollama.com/library)
