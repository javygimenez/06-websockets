const express = require('express');
const http = require('http');
const ioServer = require('socket.io');
const app = express();
const { router, products, messages } = require('../../routes/router');
const { engine } = require('express-handlebars');
const fs = require('fs');




app.use(express.json());
app.use(express.static('views'));
app.engine("handlebars", engine())
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use('/', router);


const httpServer = http.Server(app);
const io = ioServer(httpServer);


io.on('connection', socket => {
	io.sockets.emit('products', products);
	io.sockets.emit('chat', messages);
	socket.on('newProduct', newProduct => {
		products.push(newProduct);
		fs.writeFileSync('./productos.txt', JSON.stringify(products));
		io.sockets.emit('products', products);
	})
	socket.on('newMessage', newMessage => {
		messages.push(newMessage);
		fs.writeFileSync('./chat.txt', JSON.stringify(messages));
		io.sockets.emit('chat', messages);
	})
});


module.exports= httpServer;