/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn
  , fs = require('fs');

/**
 * Run HTML string through the html tidy application.
 *
 * @param {String} str
 * @param {Function} fn
 * @api public
 */

var tidy = function(str, fn) {
  var buffer = ''
    , error = '';
  
  if (!fn) {
      throw new Error('No callback provided for tidy.html');
  }
  
  var ptidy = spawn('tidy', [
    '--quiet',
    'y',
    '--force-output',
    'y',
    '--bare',
    'y',
    '--break-before-br',
    'y',
    '--output-xhtml',
    'y',
    '--fix-uri',
    'y',
    '--wrap',
    '0',
    '--indent',
    'y',
    '--tidy-mark',
    'n'
  ]);
  
  ptidy.stdout.on('data', function (data) {
    buffer += data;
  });
  
  ptidy.on('exit', function (code) {
    fn(buffer);
  });
  
  ptidy.stdin.write(str);
  ptidy.stdin.end();
};

/**
 * Expose `tidy` function.
 */

module.exports = tidy;