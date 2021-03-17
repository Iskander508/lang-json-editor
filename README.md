# Language json editor

No install editor for i18n like json files. Only Node.js needed.

## Usage

This will install the necessary dependencies and start editor for the specified json language files

```bash
npx github:Iskander508/lang-json-editor -f ./path/to/language/en.json -f ./path/to/another/language/es.json --openBrowser
```

### Command-line parameters

Run `npx github:Iskander508/lang-json-editor --help` to see all available settings.

## **Development**

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

In order to connect to the server part you can redirect via search param: [http://localhost:3000?serverPort=3001](http://localhost:3000?serverPort=3001)

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

This is done automatically on github when merged to the `master` branch.

### `node cli.js`

Runs the server side from the local repository.
