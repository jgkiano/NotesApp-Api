const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const routes        = require('./routes');
const config        = require('./config');

const app = express();

app.use(express.static(__dirname + '/public'));

//connecting to mongo
mongoose.connect('mongodb://localhost/notesapp', {}, function(error) {
    if(error) {
        console.log('failed to conntect to mongo');
    } else {
        console.log('successfully connected to mongo');
    }
});

//parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

//default route
app.get('/', (req, res) => {
    res.status(500).json({
        message: 'You shall not pass!'
    });
});

// everything on /api route
app.use('/notes', routes);

//start the server on 3000
app.listen(3000, () => {
    console.log('Running on port 3000');
});
