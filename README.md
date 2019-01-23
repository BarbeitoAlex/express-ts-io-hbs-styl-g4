# Example: Express + Typescript + Sockets + Handlebars + Stylus + Gulp4

Template to make projects with these technologies.

## Install

Install all the dependencies:
````shell
npm install
npm install --only=dev
````

If you want to use the command with **gulp** and not npm install *gulp-cli* globally:
````shell
npm install --global gulp-cli
````

## Commands

Build and run:
````shell
npm run start
````

Develop mode. Watch changes, update and run again.
````shell
npm run build ||or|| gulp ||or|| gulp start
````

Build *typescript* and *stylus* files:
````shell
npm run build ||or|| gulp build
````

See changes in *typescript* and *stylus* files and update them:
````shell
npm run watch ||or|| gulp watch
````
