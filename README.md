# snaly 🌡️

[![Netlify Status](https://api.netlify.com/api/v1/badges/40cdaa8b-fc18-4963-9e8a-1deb56c390f2/deploy-status)](https://app.netlify.com/sites/snaly/deploys)

Welcome to [snaly.io](https://snaly.netlify.com/) codebase !
Before going any further, I would like to thank :

-   [Open Weather Map](https://openweathermap.org/) for their great weather API
-   [Algolia Places](https://community.algolia.com/places/) for their geolocation/geocoding API
-   [Unsplash](https://unsplash.com) for their searchable photo database
-   [Eric Flowers](https://twitter.com/erik_flowers) for his beautiful [weather icons](https://erikflowers.github.io/weather-icons/)

## Technical stack

### Snaly is built with :

-   [Typescript](https://www.typescriptlang.org/)
-   [Tsyringe](https://github.com/microsoft/tsyringe): dependency injection in Typescript applications
-   [Vuex](https://vuex.vuejs.org/): State managment solution in Vue.js application
-   [Vue.js](https://vuejs.org/): Well... I know you know it 😄
-   [TailwindCss](https://tailwindcss.com/): CSS utility framework

More precisely, I used :
- [Axios](https://github.com/axios/axios) to handle fetch requests
- [date-fns](https://date-fns.org/) for the few date/time formatting I had to handle

### Snaly is tested with :

-   [Jest](https://jestjs.io/) for unit testing
-   [Vue test utils](https://vue-test-utils.vuejs.org/) for UI unit testing
-   [Cypress](https://www.cypress.io/) for end-to-end testing

### Snaly is deployed with :

-   [Netlify](https://www.netlify.com/)

### Snaly is watched by :

-   [Sentry](https://sentry.io/) for error alerting and reporting

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```
