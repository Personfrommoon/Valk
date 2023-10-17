const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mängijad</title>
  </head>
  <body>
      <form method="post" action="insertdata" id="name">
          <input type="text" name="name" id="name" value="Kasutaja nimi">
          <input type="submit" value="Lisa">
      </form>
  </body>
  </html>
  `)
})

app.post('/insertdata', (req, res) => {
  const { name } = req.body;
  res.send(name);

  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })