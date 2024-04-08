require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const tweetRoutes = require('./routes/tweets');
const userRoutes = require('./routes/user');
const relationRoutes = require('./routes/relation')
const reactionRoutes = require('./routes/reaction')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/tweets', tweetRoutes);
app.use('/api/user', userRoutes);
app.use('/api/relation', relationRoutes);
app.use('/api/reaction', reactionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
