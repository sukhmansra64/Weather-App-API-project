//uses nodejs and expressjs to make a local server and push the files onto the server to be accessed by html
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));
const port=process.env.PORT || 5000;
app.listen(port);
console.log('server on '+port);
