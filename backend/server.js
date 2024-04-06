require('dotenv').config();

const express = require('express');
const tweetRoutes = require('./routes/tweets')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/tweets', tweetRoutes)

app.listen(process.env.PORT, () => {
    console.log('listening on port 4000');
});