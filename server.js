const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let logInfo = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', logInfo + '\n', err => {
        if (err) { console.log('Unable to write log info'); }
    });

    console.log(logInfo);
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        headerTitle: 'Header'
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = { app };