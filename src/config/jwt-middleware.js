import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../model/users.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};
const passportAuth = (passport) => {
  passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};

export default passportAuth;
