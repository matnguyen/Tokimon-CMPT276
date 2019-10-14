const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();
var bodyParser = require('body-parser')

const { Pool } = require('pg')
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  connectionString: 'postgres://postgres:495997@localhost/postgres'
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
  // .engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/main'))
  // .get('/db', async (req, res) => {
app.get('/', async (req, res) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM Tokimon')
        const results = { 'results': (result) ? result.rows : null}
        res.render('pages/main', results)
        client.release()
      } catch (err) {
        console.error(err)
        res.send("Error " + err)
      }
    })

app.get('/tokimon/:name', (req, res) => {
  var query = `SELECT * FROM Tokimon WHERE name='${req.params.name}'`
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      var results = {'results': result.rows}
      res.render('pages/tokimon', results)
    }
  })
})

// Adding new Tokimon
app.post('/add', function(req, res) {
  try {
    var total = parseInt(req.body.fly) + parseInt(req.body.fight) + parseInt(req.body.fire) + 
                parseInt(req.body.water) + parseInt(req.body.electric) + parseInt(req.body.ice)
    if (req.body.gender == 'male') {
      var gender = 'M'
    } else {
      var gender = 'F'
    }
    var text = "INSERT INTO Tokimon VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);"
    var values = [req.body.name, req.body.weight, req.body.height, req.body.fly, req.body.fight,
                  req.body.fire, req.body.water, req.body.electric, req.body.ice, total,
                  req.body.trainer, gender, req.body.friendship, req.body.experience]
    pool.query(text, values)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Deleting Tokimon
app.post('/del', function(req, res) {
  try {
    var query = `DELETE FROM Tokimon WHERE name='${req.body.delName}'`
    pool.query(query)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.send("Error " + err)
  }
})