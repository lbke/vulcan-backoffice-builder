# Vulcan Backoffice Builder

## Setup a backoffice in a matter of minutes

This  package provides helpers to quickly create a backoffice for [Vulcan.js](http://vulcanjs.org/) applications. Given any collection (`Users`, `Posts`, `Customers` etc.), it creates pages that allow to list, visualize, create and edit data.

It relies on [Vulcan Material UI package](https://github.com/ErikDakoda/vulcan-material-ui) for the frontend. See the [Awesome Vulcan demo app](https://github.com/lbke/awesome-vulcan)  `core` package for an usage example.

**/!\ This is an experimental package, API will certainly evolve in the months to come**.

## Installation

Clone this repo:

```sh
git clone https://github.com/lbke/vulcan-backoffice-builder
```

You can clone it directly in your app `packages` folder. You can also clone it in an isolated `vulcan-packages` folder outside of your app, and then set the `METEOR_PACKAGE_DIRS` environment variable to `"/some-dir/vulcan-packages"`. This way, you can put all your reusable package in this `vulcan-packages` folder without polluting your own app.

Then use the package in your app:

```js
import { theFunctionYouNeed } from "vulcan:backoffice-builder"
```

This package won't be published on Atmosphere or npm until it is a bit more mature.

## Contributing

This package will evolve and improve depending on the use cases we encounter. Best way to contribute is to use it in your own app, and propose ideas, suggestions and PR based on your experience.

We seek for maximum reusability, so each method should be as configurable as possible, and split into independant functions whenever possible.



*[Built with love by LBKE](https://github.com/lbke)*

