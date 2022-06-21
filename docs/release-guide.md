# Release Guide

This guide is for those with proper access to the GH repo and NPM registry package, and outlines the steps for publishing a new release. Follow the below instructions, running all commands from the root of the repository.

1. Update `CHANGELOG.md`, following the format of the previous versions.
   1. Commit as `Changes for version ${VERSION}`
2. Run `yarn run version patch` (or `minor|major`) to tag a new version.
3. Run `yarn publish:core` to publish the package to NPM.
4. Run `git push && git push --tags`
