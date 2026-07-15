# Issue tracker: GitHub

Issues and specs (PRDs) for this repo live as GitHub issues at
[YunVisal/habit-tracker](https://github.com/YunVisal/habit-tracker/issues). Use the `gh` CLI for all operations.

_Recorded inline by `/to-spec` when `setup-matt-pocock-skills` had not yet been run. Re-run that skill to configure triage labels and domain-doc rules properly._

## Conventions

- **Create an issue**: `gh issue create --title "..." --body-file ...` (use `--body-file` for multi-line specs).
- **Read an issue**: `gh issue view <number> --comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels`.
- **Comment**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close**: `gh issue close <number> --comment "..."`.

Infer the repo from `git remote -v` — `gh` does this automatically inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Triage labels

Canonical roles map 1:1 to label strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Only `ready-for-agent` exists in the repo so far (created when issue #1 was published).
