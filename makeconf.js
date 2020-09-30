const fs = require('fs');
const data = {
  mongodbUrl: '',
  cors: {enabled: true, allowedOrigins: ['*']},
  apiKeys: [],
  allowedIP: [],
};
const filePath = 'config.json';
const fileContent = JSON.stringify(data, null, 1);

fs.writeFile(filePath, fileContent, {flag: 'wx'}, function(err) {
  if (err) throw err;
  console.log('Configuration file "config.json" created!');
});
