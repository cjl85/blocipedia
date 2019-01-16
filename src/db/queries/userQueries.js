const User = require( "../models" ).User;
const bcrypt = require("bcryptjs");
const User = require("./models").User;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      username: newUser.username,
         email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const info = {
          to: newUser.email,
        from: 'sample@sample.com',
     subject: 'user',
        text: 'Welcome to Blocipedia'
      };
      sgMail.send(info);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  }
});
