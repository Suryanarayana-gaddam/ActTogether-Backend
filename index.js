const express = require('express')
const app = express()
const port = process.env.PORT || 5000 
require('dotenv').config(); 
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');

const corsOptions = {
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qa7kwkd.mongodb.net/ActTogether?retryWrites=true&w=majority&appName=Cluster0`)
.then(
  console.log(" Mongo DB connected successfully !")
)
.catch((error) => console.log("Error connecting to the Mongo DB !",error));

app.post('/jwt', async (req, res) => {
  try {
    const user = req.body;

    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: '1hr'
    });
    res.send({ token });
  } catch (error) {
    console.error('Error generating JWT:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// const bookRoutes = require('./api/routes/bookRoutes');
// const userRoutes = require('./api/routes/userRoutes');
// const orderRoutes = require('./api/routes/orderRoutes');

// app.use('/',bookRoutes);

//   app.use('/user',userRoutes);
//   app.use('/',userRoutes);

// app.use('/user',orderRoutes);
// app.use('/',orderRoutes);

app.get('/',  (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;




