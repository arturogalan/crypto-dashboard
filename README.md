# Cryptocurrencies dashboard example

A cryptocurrencies dashboard example project, deployed in netlify:
## <a href="https://bot-coin.netlify.app/" target="_blank">bot-coin.netlify.app</a>  
  

### 1. Install the project (npm is required)

 - `npm install`

### 2. run the project

 - `npm run dev`

### 2. run the tests

 - `npm run test:unit` to run unit tests
 - `npm run test:e2e` to run e2e tests

### 3. build the app

  - To build the app in the dist directory, run `npm run build`
  
## Libraries used and reasons:
- Vue.js: Progressive Javascript framework with component based structure and single file components divided into html-javascript-style sections.
- Vite: Frontend tooling to make the bundle with hot module replacement and native ES modules mechanism to serve source files. Its relatively easy to refactor this into a Webpack project when the app turns into something more professional/complex or make it retro-compatible with old browsers etc... but even being Vite a recent tool it already has plugins for the most common required features.
- Tailwind CSS framework: Tool for fast prototyping and with a nice base set of css classes and color palette to focus on other things at this early stage of development
- Axios: Instead of using native fetch I prefer to start the project directly with Axios as it has a powerful set of utilities out of the box, f.e. interceptors-> As the webapp grows we'll need to make common logic for all the API calls errors (for example show a toast with a description)
- Pinia: state management library: A new state management library to use with Vue 3, never tested before but I think it's an interesting lib to test as it has a little less verbose api than Vuex (the standard state library for Vue). This library provides a single source of truth across the app views/components and the ability to caching api responses and manage all the service layer.
- Vue-i18n: A library that provides internationalization but also numbers and currencies formatting for each installed locale. You can see in src/main.js the configuration, as it grows we can separate to JSON files all this keys and values, or even consume them from another external endpoint.
- chart.js: A MIT license javascript library to represent data in charts.

## Webapp design description:
- All the source code is under src as you can see in the project structure section:
- Some components have been made in order to be able to reuse them as the webapp grows, more complex ones are:
  - BaseTable: A table compontent that can draw rows and columns with type formatting, col sorting and other capabilities.
  - BaseCard: A card component to show an array of props that includes a couple of slots to allow the parent component to insert title and subtitle easily also with type inference.
- Formatting numbers: Percentages, currencies and decimals have been rounded to 2 decimals, but this can be easily changed in the main.js file editing 'minimumFractionDigits' prop for each type if we want more/less precision
- The dark mode only changes backgroundcolor, but we can specify a set of primary/secondary colors/backgrounds etc to customize the look and feel more deeply
- When coming back from a currency detail to the dashboard, the table reset itself as the Dashboard.vue compontent is destroyed and created. If we want to keep the filter we just have to also store the searchCurrencyText value in the crypto.js store
- Used emojis for the sorting direction arrows for fast prototyping purposes, we can use an embbebed font with svg's to make better icons.
## Project structure
```
├── cypress                         # Cypress folder for snapshots
├── dist                            # Generated files of the app
├── src                             # Source code
|         ├── assets                # Static images folder
|         ├── components            # Vue reusable components
|         ├── router                # The app routes and the definition of components that render them as well as the url queries and params
|         ├── services              # API calls layer, first data transformations to request and receive data from endpoints
|         ├── store                 # State management stores
|         ├── utils                 # Utilities javascript functions
|         ├── views                 # Vue views components, each one corresponding to one app path
├── test                            # Unit and e2e tests
|         ├── e2e                   # Unit tests with jest and Vue test utils, you can also add simple jest tests of vanilla function if required
|         ├── unit                  # e2e tests with cypress

```

## Resources
- bot-coin logo: Made by me with aseprite app
- Image not found ico: https://icons8.com/icon/35618/image-not-available
- Fonts: Google fonts 'Nunito' and 'Press Start 2P'

## Testing
- Unit testing: command `npm run test:unit`. For unit testing I've choosen Vue test utils https://next.vue-test-utils.vuejs.org/, a library to easily test Vue components and Jest as the runner for this tests. I've made an example test for BaseCard.vue, you can see that I test the existence of props, non-existent props and slots behavior. The evolution will be to test some css classes if we want to ensure they are present, or other behaviors. For other complex components/views we can also mock the store-management methods by symply adding methods to the mocks section when mounting the wrapper in the tests. Next step will be also to connect the execution to a ci to see the coverage of the code and stablish a coverage minimum for all the app, currently you can see it the report in text format when running `npm run test:unit`
- End-to-end testing: command `npm run test:e2e`. For e2e testing I selected Cypress, it allows you to test elements in the screen, you can search for content as a result of some endpoint call (I test the presence of 'Bitcoin' row in the cryptos table), you can test navigation (I test the navigation to a currency detail) etc... It also make an screenshot when it fails (for instance, you can simply edit the second test Bitcoin word to Batcoin an run `npm run test:e2e` to see the failure snapshot under the cypress/screenshots folder). The evolution of this e2e maybe require them to be in a separated project as they depend on internet (api calls) and can take some time to be executed. This test should also be executed daily decoupled from webapp releases/deploys to ensure that the app is working correctly.

## Next steps:
- Webpage features:
  - If we are goin to to consume from other apis and have more currencies/rows, we can add an infinite scroll in the table to avoid painting all the rows at once
  - Add exchanges selector to show the data in different currencies
  - Review the API calls to adjust the headers and ensure we take advantage of all the api capabilities (compression etc...).
- Testing: Unit testing of each component, and extract the mocks logic into a common file to reuse it in all tests (f.e. i18n and number formatting plugins $n $t etc...).
- CI features:
  - The currencies logos are extracted from www.cryptofonts.com directly from the site statics/assets, a more convenient way should be: To donwload the svg's and create a custom font in this project to use and not depend on their assets.
  - We can add purgeCSS and some other tools in order to reduce the final bundle size.
- Maybe other parts of the webapp need to be refactored as reusable components (for example the breadcrumbs) as the app grows.

