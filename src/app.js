import express from 'express';
import { proxy } from './routes/proxy';
import serviceRoutes from './routes/service-routes';

const app = express();

app.use((req, res, next) => {
  const bodyChunks = [];
  req.on('data', function (chunk) {
    bodyChunks.push(chunk);
  });
  req.on('end', function () {
    if (bodyChunks.length > 0) {
      req.body = Buffer.concat(bodyChunks);
    }
    next();
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, POST, PUT, GET, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'origin, content-type, X-Auth-Token, Tenant-ID, Authorization, Fiware-Service, Fiware-ServicePath, x-eth-public-address');
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.header('Content-Length', '0');
    res.send();
    res.end();
  } else {
    next();
  }
});


// route prefix
app.use('/cm', serviceRoutes);

// routes without prefix (request forward to to proxy host)
app.use((req, res, next) => {
  if (req.path != '@(?=cm)') {
    proxy(req, res, next);
  }
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
