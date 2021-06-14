# kryptocurrencies dashboard example

## Decisions made:
Libraries used and reasons:
-Axios: Instead of using native fetch I prefer to start the project directly with Axios as it has a powerful set of utilities out of the box, f.e. interceptors-> As the webapp grows we'll need to make common logic for all the API calls errors (for example show a toast with a description)
-Pinia: state management library: A new state management library to use with Vue 3, never tested before but I thing it an interesting lib to test as it has a little less verbose api than Vuex. Provide as a single source of truth across the app views/components and the ability to caching api responses and manage all the service layer.
-Vue-i18n: A library that provides internationalization but also numbers and currencies formatting for each locale
-Tailwind: Nice tool for prototyping and with a nice base set of css classes to focus on other things at this early stage of development
-Vite: Frontend tooling to make the bundle with hot module replacement and native ES modules mechanism to serve source files. Its relatively easy to refactor this into a Webpack project when the app turns into something more professional or retro-compatible if needed.
-chart.js: A MIT license javascript library to represent data in charts.

## Webapp design:
-A couple of components have been made in order to be able to reuse them as the webapp grows:
  -BaseTable: A table compontent that can draw rows and columns with type formatting, col sorting and other capabilities.
  -BaseCard: A card component to show an array of props that includes a couple of slots to allow the parent component to insert title and subtitle easily also with type inference.
-Formatting numbers: Percentages, currencies and decimals have been rounded to 2 decimals, but this can be easily changed in the main.js file editing 'minimumFractionDigits' prop for each type if we want more/less precision

#Resources
Image not found ico: https://icons8.com/icon/35618/image-not-available

## Next steps:
- The coins logos are extracted from www.cryptofonts.com directly from the site statics/assets, a more convenient way should be: To donwload the svg's and create a custom font in this project to use and not depend on their assets.
- Maybe other parts of the webapp need to be refactored as reusable components (for example the breadcrumbs) as the app grows.
- A polling to the endpoint can also be a nice feature to do, in order to show to the user real-time updates in the main dashboard when the crypto prices change.
