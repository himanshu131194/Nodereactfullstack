const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');
const app = express();

app.use(cookieSession({
      maxAge : 30*24*60*60*1000,
      keys : [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURL, (err)=>{
  (err) ? console.log(err) : console.log("Connected to the mongodb");
});

app.get('/', (req ,res)=>{
    res.send({
        key : "value"
    });
})
app.get('/api/current_user', (req ,res)=>{
    console.log(req.user);
    res.send(req.user);
})


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
