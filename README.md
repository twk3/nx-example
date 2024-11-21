## NX Currents example
This repository shows how to use NX with Currents

## How to test it?
It is ready to use. You only need to:
- Install dependencies: `npm install`
- Execute in the root of the project: `CURRENTS_RECORD_KEY=your-key CURRENTS_PROJECT_ID=your-id  CURRENTS_CI_BUILD_ID=unique-id npx nx run-many -t e2e --verbose --parallel=2`

## Explanation
This NX workspace contains 2 projects within `apps` folder: `example-app` and `example-app-e2e`.
These two projects has as target `e2e` to that will be the target to run when using `-t e2e` in the previous command.
The `--parallel=2` will execute each project in different machines parallelizing the execution by project.

## Considerations
- The `pwc-p` is being used as executed command in `project.json` files
- When using `CURRENTS_CI_BUILD_ID` env variable is will generate a single run for all your parallelized project