const fs = require('fs');
const crypto = require('crypto');
const args = process.argv.slice(2);
const filePath = 'config.json';

try {
  if (args[0] == undefined) {
    console.log(new Error(
        'Please specify allowed endpoints param (e.g "*" or "users,products").',
    ));
  } else {
    if (args[0].match('/') != null ||
          typeof args[0] != 'string') {
      throw new Error(
          'Enter only endpoint names, not paths. Remove / from the endpoints.'+
              ` e.g "users,products" or "*".\nProvided: ${args[0]}`,
      );
    }
  }
  let ipArray = [];
  if (args[1] != undefined) {
    ipArray = args[1].split(',');
    ipArray.forEach((ip) => {
      if (ip.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) == null) {
        throw new Error(`You have provided and invalid ip address: ${ip}`);
      }
    });
  }
  const data = fs.readFileSync(filePath);
  const config = JSON.parse(data);
  const newKey = {key: crypto.randomBytes(12).toString('hex')};
  const accessArray = args[0].split(',');
  const keyAccess = accessArray.find((e) => e == '*') != undefined ?
  ['*'] : accessArray;
  newKey.access = keyAccess;
  newKey.allowedIP = ipArray;
  config.apiKeys.push(newKey);
  const fileContent = JSON.stringify(config, null, 1);
  fs.writeFile(filePath, fileContent, {flag: 'w'}, function(err) {
    if (err) throw err;
    console.log('Added new api key ' + newKey.key);
  });
} catch (err) {
  console.error(err);
}
