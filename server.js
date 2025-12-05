const express = require('express');

const app = express();

app.use(express.json()); //middleware pour parser le json

app.use(require("./routes/tasks.js")); //importe les routes des taches
app.use(require("./routes/users.js")); //importe les routes des utilisateurs

app.listen(process.env.PORT, () => { //écoute les requetes sur le port 3000 d'écoute
  console.log(`Server is listening on port ${process.env.PORT}`); //message dans la console pour indiquer que le serveur fonctionne
});
