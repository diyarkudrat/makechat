const express = require('express');

const app = express();

const server = require('http').Server(app);

//Web Socket connection
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("New user connected!")
});

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    extname: '.handlebars',
    defaultLayout: null
}));
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index.handlebars');
})

server.listen(3000, () => {
    console.log('Server listening on Port 3000');
});