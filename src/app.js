import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import serviceRoutes from './routes/service-routes';

var app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', serviceRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  let errorMessage = err;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.status == 403) {
    errorMessage = {
      "success": false,
      "message": "access_forbidden"
    }
  }

  if (err.status == 404) {
    errorMessage = {
      "success": false,
      "message": "page_not_found"
     }
  }
  if (err.status == 401) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'Unauthorized'
     }
  }
  if (err.status == 400) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'bad_request',
      "processorResponseCode": err.processorResponseCode
        ? err.processorResponseCode
        : undefined
     }
  }
  if(err.status == 500) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'internal_server_error',
    }
  }
  // render the error page
  res.status(err.status || 500);
  if (err && !err.status) {
    res.jsonp({success: false});
  } else {
    if(!isNaN(errorMessage.status)) {
      delete errorMessage.status;
    }
    res.jsonp(errorMessage);
  }
});
module.exports = app;
