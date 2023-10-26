const randomstring = require('randomstring');


module.exports.genRandom = (prefix = 'HasH', length = 11) => {
  const str = prefix.replaceAll(' ', '');
  const rand = randomstring.generate({
    length,
    charset: 'alphanumeric',
    capitalization: 'uppercase',
  });
  return str.toUpperCase().substr(0, 3) + rand;
};
