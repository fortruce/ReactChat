var COMMANDS = {
  PASS: 'PASS',
  NICK: 'NICK'
};

function isCommand(t) {
  // Commands are either IRC Commands (NICK, PASS, etc) or 3 digit codes
  return COMMANDS[t] || (t.length === 3 && !isNan(parseInt(t, 10)));
}

function isPrefix(t) {
  return t.indexOf(':') === 0;
}

function parse(line) {
  var components = line.split(' ');
  if (components.length < 1)
    return console.error('PARSE expected at least 1 component');

  var prefix = isPrefix(components[0]) ? components[0] : undefined;
  if (prefix && components.length < 2)
    return console.error('PARSE expected command, but found none');

  var command = prefix ? components[1] : components[0];
  var params = components.slice(2);
  return {
    prefix: prefix,
    command: command,
    params: params
  }
}

module.exports = parse;