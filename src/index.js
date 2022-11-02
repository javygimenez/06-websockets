const server = require('./services/server');



const PORT = 8080;



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));