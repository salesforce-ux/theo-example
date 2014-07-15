theo-example
============

Example project for how to use [theo](https://github.com/salesforce-ux/theo).

## Dependencies

Upfront you'll need to install [nodejs](http://nodejs.org) and Gulp:

    $ sudo npm install -g gulp

## Setup

    $ git clone https://github.com/salesforce-ux/theo-example.git
    $ cd theo-example
    $ npm install .

Open the `./www/index.html` and `./www/example.html`.

## Develop

While developing your website or variables run:

    $ gulp dev

It's kicks of a local webserver with LiveReload.
Open Chrome with the [LiveReload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) installed and point to [localhost:3000](http://localhost:3000).

Now you can start editing your `src/index.html` and `src/sass/main.scss`.

To see the generated docs for your variables go to [localhost:3000/example.html](http://localhost:3000/example.html).
Note: You can change your variables in `./variables/example.json` or the `./variables/aliases.json` and see live changes to the docs.

Further if you open [localhost:3000](http://localhost:3000) and change the variables the changes are reflected live as well.