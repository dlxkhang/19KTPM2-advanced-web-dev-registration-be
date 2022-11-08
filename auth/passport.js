const passport = require("passport");
const LocalStrategy = require("passport-local");
const userService = require("../api/user/user.service");
const { Config } = require("../config");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Config.JWT_SECRET;

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function verify(
    username,
    password,
    cb
  ) {
    try {
      const user = await userService.verifyUser(username, password);
      if (user) return cb(null, user);
      return cb(null, false, { message: "Incorrect username or password" });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  new JwtStrategy(opts, async function ({ _id }, done) {
    try {
      const user = await userService.verifyTokenPayload(_id);
      if (user) return done(null, user);
      return done(null, false, { message: "Invalid token" });
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
