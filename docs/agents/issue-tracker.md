# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the [`gh`](https://cli.github.com/) CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc with `--body-file -` for multi-line descriptions. Omit `--body` to open an editor.
- **Read an issue**: `gh issue view <number> --comments`. Use `--json number,title,body,comments` for machine-readable output.
- **List issues**: `gh issue list --json number,title,labels` with appropriate `--label` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`. Multiple labels can be comma-separated or by repeating the flag.
- **Close**: `gh issue close <number>`. `gh issue close` accepts `--comment "..."`; otherwise post the explanation first with `gh issue comment <number> --body "..."`, then close.
- **Assign an issue**: `gh issue edit <number> --add-assignee fossadmin` (fossadmin is the verified maintainer username; `@me` is not assumed to work).
- **Pull requests**: Use `gh pr create --title "..." --body "..."` to create, `gh pr edit --body-file -` to change the body, `gh pr view`, `gh pr comment <number> --body "..."` to comment.

**Tracker changes require approval.** Creating, commenting on, labeling, assigning, or closing issues or pull requests changes the public tracker. Propose the action first and run it only with the maintainer's explicit approval. Skill instructions to publish, claim, or resolve do not override this rule.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external pull requests as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --json number,title,author`, then keep only PRs whose author is not a project member/owner (a contributor's PR, not a maintainer's in-flight work).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub numbers issues and PRs from a single sequence, so `#42` identifies exactly one item across both surfaces.

## When a skill says "publish to the issue tracker"

Create a GitHub issue. (Subject to the tracker-changes-require-approval rule above.)

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map --title "..." --body "..."`. GitHub has no epic object on the standard tier; the labelled issue is the map everywhere.
- **Child ticket**: an issue carrying `Part of #<map>` at the top of its description (GitHub renders this as a cross-reference to the map) and labels `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub has no native blocking link on the standard tier. The canonical representation is a `Blocked by: #<n>, #<n>` line at the top of the description. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list open issues carrying a `wayfinder:<type>` label with `gh issue list --label <type> --json number,title,body,assignees`; drop any with an open issue in its `Blocked by` line, or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee fossadmin` (fossadmin is the verified maintainer username; `@me` is not assumed to be a valid assignee target).
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far. (Subject to the tracker-changes-require-approval rule above.)
