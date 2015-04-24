require('babel/register');
var IRCServer = require('./IRCServer');

var irc = new IRCServer('irc.freenode.net');

irc.on(irc.Events.CONNECT, function () {
  irc.sendCommand({command: 'NICK', params: ['whatisup____']});
  irc.sendCommand({command: 'USER', params: ['guest', 0, '*', ':Test User']});
});

process.stdin.pipe(irc.client);