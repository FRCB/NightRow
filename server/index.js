require('dotenv').config();

const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , controller = require('./controller')
    , stripe = require('stripe')(process.env.StripeKey)
    , cors = require('cors')
    , nodemailer = require('nodemailer')


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    EMAIL,
    EMAIL_PASSWORD
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.use(cors());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')
    let { id, displayName, picture } = profile;
    // console.log(profile)
    db.find_user([id]).then(user => {
        if (user[0]) {
            done(null, user[0].id)
        } else {
            db.create_user([displayName, picture, id]).then(createduser => {
                done(null, createduser[0].id)
            })
        }
    })
}))

passport.serializeUser((primaryKeyid, done) => {
    done(null, primaryKeyid);
})

passport.deserializeUser((primaryKeyid, done) => {
    app.get('db').find_session_user([primaryKeyid]).then(user => {
        done(null, user[0]);
    })
})

// ENDPOINTS
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/reservations'
}))

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})

app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Nice try!')
    }
})

app.get('/api/category/:category', controller.getCategory);

app.get('/api/event/:id', controller.getEvent);

app.post('/api/event', controller.createEvent);

app.post('/api/reservation', controller.createReservation);

app.put('/api/event/:id', controller.editEvent);

app.delete('/api/event/:id', controller.deleteEvent);

app.get('/api/reservation', controller.getReservations);

app.delete('/api/reservation/:id', controller.deleteReservation);

app.get('/api/reservation/:id', controller.payEvent);


//STRIPE
app.post('/api/payment', function (req, res) {
    const db = app.get('db')
    console.log(req.body)
    const charge = stripe.charges.create({
        amount: req.body.amount * 100,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Example charge'
    }, function (err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);

    });
});

// NODEMAILER
app.post('/send', function (req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    })
    const { user_name, user_email, message } = req.body;

    const mailOptions = {
        from: user_email,
        to: 'france.bushman@gmail.com',
        subject: user_name,
        text: message
    }

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(response)
        }
    })
})


app.listen(SERVER_PORT, () => {
    console.log(`Glittering on port :`, SERVER_PORT)
})