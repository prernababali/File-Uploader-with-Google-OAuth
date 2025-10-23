const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: "/auth/google/callback",
         callbackURL: process.env.GOOGLE_CALLBACK_URL, // ✅ use full URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.photos[0].value,
            },
          });
        }

        done(null, user); // ✅ send the DB user
      } catch (err) {
        done(err, null);
      }
    }
  )
);




passport.serializeUser((user, done) => {
  done(null, user.id); // ✅ only save the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user); // ✅ retrieve full user from DB
  } catch (err) {
    done(err, null);
  }
});
