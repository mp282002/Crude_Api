const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const bidsRouter = require('./routes/bids');
const { connectToDatabase } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(bodyParser.json());

// Routes
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/items/:itemId/bids', bidsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
