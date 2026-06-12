const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        // Check if user exists by google_id or email
        let user = await db.query('SELECT * FROM users WHERE google_id = $1 OR email = $2', [id, email]);

        if (user.rows.length === 0) {
          // Create new user (automatically approved for Google login? Usually yes, or follow the same approval flow)
          // User said "once after user registered to our website approval should be done by admin"
          // Let's keep it consistent: Google users also need approval OR maybe not since Google is trusted.
          // The prompt says "once after user registered to our website approval should be done", 
          // usually Google login is considered a "registration" if user doesn't exist.
          // I'll set is_approved = true for Google users as it's a common pattern, 
          // but I'll stick to the strict "all new users need approval" if that's what's implied.
          // Actually, let's set is_approved = true for Google users to make it "easy", 
          // but if the user wants strictly all, I'd set it to false.
          // Let's set it to FALSE to be safe and follow the instruction "once after user registered... approval should be done".
          
          const newUser = await db.query(
            'INSERT INTO users (name, email, password, google_id, is_approved) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, is_approved',
            [displayName, email, 'google-auth-no-password', id, false]
          );
          user = newUser;
        } else if (!user.rows[0].google_id) {
          // Link google_id if email matches but google_id was empty
          await db.query('UPDATE users SET google_id = $1 WHERE email = $2', [id, email]);
          user.rows[0].google_id = id;
        }

        return done(null, user.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
