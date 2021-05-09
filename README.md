# Flytrap

Flytrap is an audio cloud-based service for the Borum Ecosystem. The app consists of four main features:

 - [x] The ability to upload audio files to your account
 
 - [ ] The ability to use simple audio editing tools such as trimming
 
 - [x] The ability to link and share these audio files
 
 - [ ] The ability to record audio directly

Google, Microsoft, and Apple give users the ability to store documents, spreadsheets, and slideshows quite effectively, but not one of them offers the service both at zero price, honors consumer privacy, and offers the product to users not already in that ecosystem. Flytrap uses some features of G Suite plus simple editing tools that Google Drive does not supply.

Flytrap is named after the [Venus Flytrap](https://en.wikipedia.org/wiki/Venus_flytrap) and is part of the Borum Ecosystem.

## Usage

To use this project, go to https://audio.borumtech.com

## Installation

The Flytrap Web app is a lightweight PHP application that only requires a web server and a few tools that are strictly for development. PHP is used for the front-end and the back-end, pure CSS is used for styling, and JavaScript is used for API requests, interactivity, and a little bit of responsiveness. 

In order to run this project locally and see changes, you need to install the following prerequisites:

- The uglifyjs-folder package

uglifyjs-folder is an NPM package meant for minifying the JavaScript files. To install it, run `npm i uglifyjs-folder -g`.

_Note: The -g flag is necessary because this is not a Node project, and the JavaScript is run directly in the browser_

To run the PHP web server, you have two options:

- Install XAMPP, WAMPP, AAMPP, or LAMPP or manually download Apache, MySQL, and PHP. Then, start the web server and open `localhost` in your browser. You may have to update the DocumentRoot in the httpd.conf file. This will run on port 80. 

- **IN DEVELOPMENT** Use PHP's built-in server and the router script `/index.php`. You can serve this on any port of your choosing

## Built With

- PHP - the main scripting language used for content and server-side scripting

- JavaScript - another scripting language used for interactivity and API requests

- VSCode - the IDE used

- uglifyjs-folder - NPM package for minifying JavaScript `scripts/` folder

## Contributing

Thanks for considering contributing to Flytrap! To start contributing, fork and clone the project.

`git clone https://github.com/Borumer/Flytrap`

Then follow the [Installation](#Installation) steps outlined above.

Finally, read the [Contributing Guide](CONTRIBUTING.md) for information on how to connect the node files

## Author

I, Varun Singh, started this project, engineered the REST API, designed the logo, wrote the scripts, and own the domain on which the site is deployed. Flytrap is part of the Borum Family of Products

Copyright 2021 Borum Tech
