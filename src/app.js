import express from 'express';
import { proxy } from './routes/proxy';
import serviceRoutes from './routes/service-routes';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// app.use((req, res, next) => {
//   const bodyChunks = [];
//   req.on('data', function (chunk) {
//     bodyChunks.push(chunk);
//   });
//   req.on('end', function () {
//     if (bodyChunks.length > 0) {
//       req.body = Buffer.concat(bodyChunks);
//     }
//     next();
//   });
// });

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
