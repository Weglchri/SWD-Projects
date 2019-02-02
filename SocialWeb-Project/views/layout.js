var hbs = require('handlebars');

var layout = hbs.compile(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <title>{{title}} - TwitterMiner</title>
            <style>
                html{font-family: 'Roboto', sans-serif;}
            </style>
        </head>
        <body>
            <h1>Twitterminer</h1>
            <div>
                <div class="container">
                </div>
            </div>
            <div class="container">
                {{> (lookup . 'bodypartial') }}
            </div>
        </body>
    </html>`);

module.exports = layout;
