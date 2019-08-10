/* eslint consistent-return:0 import/order:0 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const socket = require('socket.io');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
require('./models').connect(process.env.dbUri);

// const options = {
//   key: fs.readFileSync(path.join(__dirname, '../config', 'lsucssa.key')),
//   cert: fs.readFileSync(path.join(__dirname, '../config', 'ssl-bundle.crt')),
// };

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

app.use(cors());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, `../build`)));
// app.use('/.well-known/pki-validation/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, 'static')));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });
app.post('/image', (req, res) => {
  const imagedir = path.join(__dirname, '/static/images');
  fs.readdir(imagedir, (err, images) => {
    res.status(200).json({
      url: images[Math.floor(Math.random() * (+images.length - +0) + +0)],
    });
  });
});

const authCheckMiddleware = require('./middlewares/auth-check');
app.use('/api', authCheckMiddleware);
app.use('/post', authCheckMiddleware);

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'localhost:5000',
    '207.148.5.205',
    'lsucssa.com',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const postRoutes = require('./routes/post');
const tokenRoutes = require('./routes/token');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/post', postRoutes);
app.use('/token', tokenRoutes);

// Start your app.
const server = app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  console.log(`Server is running on port ${port}`);
  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
const io = socket(server);
io.on('connection', socket => {
  // console.log("socket connect");
  socket.on('volunteer accepted', function(msg) {
    io.emit('volunteer accepted', msg);
    // console.log("accepted?: " + msg);
  });
  socket.on('pickup request', function(msg) {
    io.emit('pickup request', msg);
    // console.log('accepted?: ' + msg);
  });
});
