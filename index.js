require('dotenv').config();
const express = require("express");
const sequelize = require('./db');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static',)))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/',(req, res) =>{
res.status(200).json('WORKING!!!')
})





//Error handler is last

app.use(errorHandler)

const start = async () => {
try {
await sequelize.authenticate();
await sequelize.sync()
    app.listen(port, () =>
    console.log(`Server has been started on port ${port}...`)
  );
} catch (e) {
    console.log(e);
}
};

  start();
 

