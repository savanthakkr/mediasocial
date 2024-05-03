const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const morgan = require('morgan');
const { sequelize, testConnection } = require('./config/database');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const path = require('path')
const http = require('http');
const { soket } = require('./controllers/soketController');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, './public/')))

// Test the database connection
testConnection()
  .then(() => {
    // Routes
    app.use('/api', userRoutes);
    app.use('/api', categoryRoutes);
    app.use('/api', productRoutes);

    const server = http.createServer(app);
    soket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to start server:', err);
  });