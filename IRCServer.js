var net = require('net'),
    EventEmitter = require('events').EventEmitter,
    parse = require('./parser'),
    split = require('split');

function IRCServer(host, port=6667) {
  this.host = host;
  this.port = port;

  this.connect();
}

IRCServer.prototype = new EventEmitter();
IRCServer.prototype.constructor = IRCServer;

IRCServer.prototype.Events = {
  CONNECT: 'connect'
};

IRCServer.prototype.parseData = function (data) {
  console.log(parse(data.toString()));
};

IRCServer.prototype.connect = function () {
  console.log('connecting', this.port, this.host);
  this.client = net.createConnection(this.port, this.host);

  this.client
      .pipe(split())
      .on('connect', () => this.emit(this.Events.CONNECT))
      .on('data', this.parseData.bind(this))
      .on('close', this.connect.bind(this))
      .on('error', console.error);
};

IRCServer.prototype.sendCommand = function (c) {
  var buf = c.command;
  if (c.params)
    buf += ' ' + c.params.join(' ');
  buf += '\r\n';
  this.client.write(buf);
};

IRCServer.prototype.sendRaw = function(buf) {
  this.client.write(buf.toString());
};

module.exports = IRCServer;