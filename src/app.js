import express from 'express';
import { proxy } from './routes/proxy';
import serviceRoutes from './routes/service-routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import EthTransactionController from './controllers/eth-controller';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cm', serviceRoutes);

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

// let config = {
//   "abi": [
//       {
//           "name": "set",
//           "type": "function",
//           "inputs": [
//               {
//                   "name": "x",
//                   "type": "uint256"
//               }
//           ],
//           "outputs": [],
//           "payable": false,
//           "constant": false,
//           "stateMutability": "nonpayable"
//       }
//   ],
//   "dlt_type": "eth",
//   "endpoint": "http://127.0.0.1:8545",
//   "default_gas": 0,
//   "contract_address": "0xed34bea23f2cde2d0608d61fb4dfb6377aca3dcf",
//   "default_gasPrice": 0
// };
// const eth = new EthTransactionController(config);
// let param = [ { method: 'set', value: [ 10 ] } ];
// eth.processTransaction(param, '0xa99aa66cc990Cbd2C1d31087430A9A42C8ea28cC').then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })

module.exports = app;
