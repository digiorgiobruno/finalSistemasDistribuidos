const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const {sequelize}=require('./models/index');
//Moddlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Routes
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  sequelize.authenticate().then(() => {
    console.log('Nos hemos conectado a la base de datos');
})
})