const AuthenticationController = require('../controllers/authentication'),  
      express = require('express'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Get our API routes
const api = require('./api');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false }); 

module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
  apiRoutes.use('/', requireAuth, api);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
};