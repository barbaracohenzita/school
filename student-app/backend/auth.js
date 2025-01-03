const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const User = require('./models/User'); // Assuming you have a User model

// JWT-based authentication
const jwtSecret = 'your_jwt_secret'; // Replace with your own secret

function generateToken(user) {
    return jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
}

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// OAuth-based authentication
passport.use(new GoogleStrategy({
    clientID: 'your_google_client_id',
    clientSecret: 'your_google_client_secret',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

passport.use(new FacebookStrategy({
    clientID: 'your_facebook_client_id',
    clientSecret: 'your_facebook_client_secret',
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

passport.use(new GitHubStrategy({
    clientID: 'your_github_client_id',
    clientSecret: 'your_github_client_secret',
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ githubId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

// Session-based authentication
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    });
}));

function initializeAuthentication(app) {
    app.use(session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // JWT routes
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            if (err || !user || !user.validatePassword(password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user);
            res.json({ token });
        });
    });

    app.post('/register', (req, res) => {
        const { username, password } = req.body;
        const newUser = new User({ username });
        newUser.setPassword(password);
        newUser.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            const token = generateToken(newUser);
            res.json({ token });
        });
    });

    app.get('/protected', authenticateJWT, (req, res) => {
        res.json({ message: 'This is a protected route' });
    });

    // OAuth routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/');
    });

    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/');
    });

    // Session routes
    app.post('/login-session', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

module.exports = initializeAuthentication;
