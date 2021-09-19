const express = require('express');
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection(require('./config').mysql);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/insert/', (req, res) => {
    const body = req.body;

    db.query(`INSERT INTO names(name) VALUES('${body.name}')`, err => {
        if(err) return console.log(err);

        console.log('inserted name');

        res.json({ok: true});
    })
});

app.get('/select/', (req, res) => {
    db.query(`SELECT * FROM names`, (err, results) => {
        if(err) return console.log(err);

        res.json(results);
    })
});

app.listen(5000, () => {
    console.log(`running server on http://localhost:5000`)
});