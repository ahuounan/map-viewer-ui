# README

## Intro

Front end of map webapp to view boat ramps. The backend of this project can be found ![here](https://github.com/ahuounan/map-viewer-api). This webapp is deployed at ![http://map-viewer.on-alanhu.com/](http://map-viewer.on-alanhu.com/).

## Get Started

To run this locally, you will need to also run the api simultaneously. Check the ![backend repo](https://github.com/ahuounan/map-viewer-api) for instructions.

1. Fork and clone the repo
2. npm i
3. Set up your .env file from the .env-template
4. npm start

## Tech Stack

Language: Typescript
Framework: React/Redux
Middleware: redux-observables
Styling: Tailwind CSS
Map Lib: mapbox-gl
Charting Lib: visx

## To-Do

- Cypress testing
- More jest testing
- Storybook for chart components
- Depending on requirements, generalize Map component and boatRamp reducer

## Notes

1. Had a choice between mapbox-gl and maplibre. Went with mapbox-gl for better maintenance and documentation. However non-OSS license may mean it's not usable for other projects.
2. Wanted to try out redux-observables as redux middleware. It's interesting but ultimately wasn't necessary for this project.
3. Wanted to try out visx for chart building. It wasn't too bad to use, and a lot more flexible than out-of-the-box charting solutions.
