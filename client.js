var net = require('net');

var client = net.connect({port: 6667,
                          host: 'irc.freenode.net'},
    () => {
      console.log('connected');
      client.write('NICK fortruce___\r\n');
      client.write('USER guest 0 * :test testing\r\n');
      client.write('JOIN #node.js\r\n');
    });

client.on('data', (data) => {
  console.log(data.toString());
});

process.stdin
      .pipe(client);