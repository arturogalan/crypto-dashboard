# Cryptocurrencies dashboard example

A cryptocurrencies dashboard example project, deployed in netlify:
[bot-coin](https://www.arturo-galan.com)

## Libraries used and reasons:
- Vite: Frontend tooling to make the bundle with hot module replacement and native ES modules mechanism to serve source files. Its relatively easy to refactor this into a Webpack project when the app turns into something more professional or retro-compatible if needed.
- Tailwind: Nice tool for prototyping and with a nice base set of css classes to focus on other things at this early stage of development
- Axios: Instead of using native fetch I prefer to start the project directly with Axios as it has a powerful set of utilities out of the box, f.e. interceptors-> As the webapp grows we'll need to make common logic for all the API calls errors (for example show a toast with a description)
- Pinia: state management library: A new state management library to use with Vue 3, never tested before but I thing it an interesting lib to test as it has a little less verbose api than Vuex. Provide as a single source of truth across the app views/components and the ability to caching api responses and manage all the service layer.
- Vue-i18n: A library that provides internationalization but also numbers and currencies formatting for each locale
- chart.js: A MIT license javascript library to represent data in charts.

## Webapp design description:
- All the source code is under src:
  - src/components and src/views: The vue components and views used in the app
  - src/router: The app router configuration
  - src/store: The app store-management. Divided into funcionalities modules, here the api calls are made as well as the store of the responses and the data transformations.
  - src/services: The api calls layer
  - src/utils: Javascript utils modules that offer functions all across the other modules
  - test/unit: Component unit testing
  - test/e2e: End to end testing
- A couple of components have been made in order to be able to reuse them as the webapp grows:
  - BaseTable: A table compontent that can draw rows and columns with type formatting, col sorting and other capabilities.
  - BaseCard: A card component to show an array of props that includes a couple of slots to allow the parent component to insert title and subtitle easily also with type inference.
- Formatting numbers: Percentages, currencies and decimals have been rounded to 2 decimals, but this can be easily changed in the main.js file editing 'minimumFractionDigits' prop for each type if we want more/less precision

## Resources
- bot-coin logo: Made by me with aseprite app
- Image not found ico: https://icons8.com/icon/35618/image-not-available

## Testing
- Unit testing: command `npm run test:unit`. For unit testing I've choosen Vue test utils https://next.vue-test-utils.vuejs.org/ A library to easily test Vue components, and Jest as the runner for this tests. I've made an example test for BaseCard.vue, you can see that I test the existence of props, non-existen props and slots. The evolution will be to test some css classes if we want to ensure they are present, or other behaviors. For other complex components/views we can also mock the store-management methods by symply adding methods to the mocks section when mounting the wrapper in the tests. Next step will be also to connect the execution to a ci to see the coverage of the code and stablish a coverage minimum for all the app, currently you can seee the report in text format when running `npm run test:unit`
- End-to-end testing: command `npm run test:e2e`. For e2e testing I selected Cypress, it allows you to test elements in the screen, you can search for content as a result of some endpoint call (I test the presence of 'Bitcoin' row in the cryptos table), you can test navigation (I test the navigation to a currency detail) etc... It also make an screenshot when it fails (for instance, you can simply edit the second test Bitcoin word to Batcoin an run `npm run test:e2e` to see the failure snapshot under the cypress/screenshots folder). The evolution of this e2e maybe require them to be in a separated project as they depend on the internet (api calls) and can take some time to be executed.
## Next steps:
- Webpage features:
  - If we are gointo to consume from other apis and have more currencies, we can add an infinite scroll in the page
  - A polling to the assets endpoint can also be a nice feature to do, in order to show to the user real-time updates in the main dashboard as the crypto prices change.
- Testing: Unit testing of each component, and extract the mocks logic into a common file to reuse it in all tests (f.e. i18n and number formatting plugins $n $t etc...).
- CI feature:
  - The currencies logos are extracted from www.cryptofonts.com directly from the site statics/assets, a more convenient way should be: To donwload the svg's and create a custom font in this project to use and not depend on their assets.
  - We can add and see purgeCSS and other tools in order to reduce the final bundle size.
- Maybe other parts of the webapp need to be refactored as reusable components (for example the breadcrumbs) as the app grows.

