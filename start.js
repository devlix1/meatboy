const Server = require('./app/Server');
const Bot = require('./app/Bot/main');

const Setting = require('./config/Setting');

new Server().then(data => {
    const {express, socket, server} = data;

    const socketHandler = new (require(__dirname + '/app/Controllers/socket/socket'))(socket).connect();

    new Bot(Setting).then(bot => {
        bot.setSocketHandler(socketHandler);

        bot.pushCommand('ALL', __dirname + '/app/Controllers/commands/text');

        bot.pushCommand('cmd/цмд', __dirname + '/app/Controllers/commands/cmd');
        bot.pushCommand('memes/meme/мем/мемес/мемы', __dirname + '/app/Controllers/commands/memes');
    });

    server.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    server.use('/assets', express.static(__dirname + '/public/assets/'));
});
