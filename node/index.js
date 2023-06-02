const express = require("express")
const app = express()
app.use(express.json())

const port = 3300

const config = {
  host: 'fcmysql',
  user: 'root',
  password: 'db',
  database: 'db'
}

const mysql = require('mysql2')

app.get('/', (req, res) => { 
  const connection = mysql.createConnection(config)  

  connection.query(`INSERT INTO people (name) VALUES ("Fulano");`)

  connection.execute(`SELECT * FROM people`,
    function(err, people, fields) {

      let html = `<h1>Full Cycle Rocks!</h1>
                  <br />
                  <p>Pessoas cadastradas:</p>
                  <br />`

      if (people !== undefined && people !== null) {
        for (const person of people) {
          html += `<p>ID: ${person.id} NOME: ${person.name}</p>`
        }
      }

      res.status(200).send(html)  
    })
})

app.listen(port, () => { console.log("API rodando na porta", port) })