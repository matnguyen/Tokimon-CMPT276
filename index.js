const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  connectionString: 'postgres://postgres:495997@localhost/postgres'
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
  // .engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/main'))
  // .get('/db', async (req, res) => {
app.get('/', async (req, res) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM Tokimon');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/main', results );
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    })
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
