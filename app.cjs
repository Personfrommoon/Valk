
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Import the mysql2 library
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd",
    database: "fcvalkdrizzle",
});

  // Array to store player data
  const players = [];
  
  app.get('/', (req, res) => {
    // Retrieve player data and associated team names
    db.query('SELECT id, name, birthday, teamId FROM players;', (err, results) => {
      if (err) {
        console.error('Error fetching player data: ' + err.message);
      } else {
        const players = results;
        // Render your HTML page with player data and team names
        res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mängijad</title>
    </head>
    <body>
    <h1>Lisa mängija</h1>
    <form method="post" action="/insertdata">
      <input type="text" name="name" id="name" placeholder="Mängija nimi">
      <input type="date" name="birthday" id="birthday" placeholder="Sünnipäev">
      <select name="teamId" id="teamId">
        <option value="1">Team 1</option>
        <option value="2">Team 2</option>
        <option value="3">Team 3</option>
        <option value="4">Team 4</option>
      </select>
      <input type="submit" value="Lisa">
    </form>
    
        <h2>Mängijad</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                ${players.map((player, index) => `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.birthday}</td>
                        <td>${player.teamId}</td>
                        <td><a href="/edit/${index}">Edit</a></td>
                        <td><a href="/delete/${index}">Delete</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </body>
    </html>
    `);
    }
    });
  });
 

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.message);
    } else {
      console.log('Connected to the database');
    }
  });
  
  
  app.post('/insertdata', (req, res) => {
    const { name, birthday, teamId } = req.body;
  
    // Insert the player data into the database
    db.query('INSERT INTO players (name, birthday, teamId) VALUES (?, ?, ?)', [name, birthday, teamId], (err, results) => {
      if (err) {
        console.error('Error inserting player data: ' + err.message);
      } else {
        console.log('Player data inserted');
      }
    });
    res.redirect('/');
  });

  app.get('/edit', (req, res) => {
    // Get the player ID from the query parameters in the URL
    const playerId = req.query.id;
    
    if (!playerId) {
      res.send('Player ID is missing in the URL');
      return;
    }
  
    // Fetch player data from the database
    db.query('SELECT id, name, birthday, teamId FROM players WHERE id = ?', [playerId], (err, results) => {
      if (err) {
        console.error('Error fetching player data: ' + err.message);
        res.send('Error fetching player data');
      } else if (results.length > 0) {
        const player = results[0]; // Assuming the ID is unique, so we fetch the first result
        // Render a form to edit the player's data
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Edit Player</title>
          </head>
          <body>
              <h1>Muuda mängija nime</h1>
              <form method="post" action="/editdata/${player.id}">
                <input type="text" name="name" id="name" value="${player.name}">
                <input type="date" name="birthday" id="birthday" value="${player.birthday}">
                <select name="teamId" id="teamId">
                  <option value="${player.teamId}">Team 1</option>
                  <option value="${player.teamId}">Team 2</option>
                  <option value="${player.teamId}">Team 3</option>
                  <option value="${player.teamId}">Team 4</option>
                <input type="submit" value="Muuda">
              </form>
          </body>
          </html>
        `);
      } else {
        res.send('Player not found');
      }
    });
  });
  
  app.post('/editdata/:id', (req, res) => {
    const playerId = req.params.id;
    const { name, birthday, teamId } = req.body;
  
    // Update the player data in the database
    db.query('UPDATE players SET name = ?, birthday = ?, teamId = ? WHERE id = ?', [name, birthday, teamId, playerId], (err, results) => {
      if (err) {
        console.error('Error updating player data: ' + err.message);
        res.send('Error updating player data');
      } else {
        console.log('Player data updated');
        res.redirect('/');
      }
    });
  });
  
  
  app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    if (players[index]) {
      // Display a form to edit the player's name
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Edit Player</title>
      </head>
      <body>
          <h1>Muuda mängija nime</h1>
          <form method="post" action="/editdata/${index}">
          <input type="text" name="name" id="name" value="${players[index].name}">
          <input type="date" name="birthday" id="birthday" value="${players[index].birthday}">
          <select name="teamId" id="teamId">
          <option value="${players[index].teamId}">Team 1</option>
          <option value="${players[index].teamId}">Team 2</option>
          <option value="${players[index].teamId}">Team 3</option>
          <option value="${players[index].teamId}">Team 4</option>
          <input type="submit" value="Muuda">
      </form>
      </body>
      </html>
      `);
    } else {
      res.send('Player not found');
    }
  });
  
  app.post('/editdata/:index', (req, res) => {
    const index = req.params.index;
    if (players[index]) {
      const { name, birthday, teamId } = req.body;
      const playerId = players[index].id;
  
      // Update the player data in the database
      db.query('UPDATE players SET name = ?, birthday = ?, teamId = ? WHERE id = ?', [name, birthday, teamId, id], (err, results) => {
        if (err) {
          console.error('Error updating player data: ' + err.message);
          res.send('Error updating player data');
        } else {
          console.log('Player data updated');
          // Update the players array with the edited data
          players[index] = { id: playerId, name, birthday, teamId };
          res.redirect('/');
        }
      });
    } else {
      res.send('Player not found');
    }
  });
  
  app.get('/delete/:id', (req, res) => {
    const playerId = req.params.id;
    
    // Delete the player from the database
    db.query('DELETE FROM players WHERE id = ?', [playerId], (err, results) => {
      if (err) {
        console.error('Error deleting player: ' + err.message);
        res.send('Error deleting player');
      } else {
        console.log('Player deleted');
        // No need to remove from the array as it's now managed in the database
        res.redirect('/');
      }
    });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });