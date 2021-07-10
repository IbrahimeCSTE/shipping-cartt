const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const orderRouter = require('./router/orderRouter');
const productRouter = require('./router/productRouter');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
