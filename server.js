const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
    connection.query(
        "select id, image, name, birthday, gender, job, rmk, date_format(create_dttm, '%Y-%m-%d') as create_dttm, date_format(update_dttm, '%Y-%m-%d') as update_dttm from customer WHERE ISDELETED = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (NULL, ?, ?, ?, ?, ?, ?, now(), now(), 0)';
    let imageFile = (req.file.filename === null ? "https://placeimg.com/64/64/any" : req.file.filename);
    let image = '/image/' + imageFile;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let rmk = req.body.rmk;
    let params = [image, name, birthday, gender, job, rmk];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
            console.log(rows);
        }
    );

})

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET ISDELETED = 1 WHERE ID = ?';
    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));