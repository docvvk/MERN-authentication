const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    // Sign up
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const { firstName, lastName, password } = body;
        let { email } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();
        email = email.trim();

        // Steps: 
        // 1. Verify email doesn't exist
        // 2. Save

        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if ( previousUsers.length > 0 ) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists.'
                });
            }

            // Save the new user
            const newUser = new User();

            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed Up'
                });
            });
        });
    }); // end of sign up endpoint   

    // Sign in 

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { password } = body;
        let { email } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Passsword cannot be blank.'
            });
        }

        email = email.toLowerCase();
        email = email.trim();
        
        User.find({
            email: email
            }, (err, users) => {
            if (err) {
                console.log('err2:', err)
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } 
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }
            
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }

            // Otherwise correct user
            const userSession = new UserSession();
            userSession.userId =  user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Serveer error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });
            });
        
        })
    })

    // Log out 
    app.get('/api/account/logout', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test

        // Verify the token is one of its kind and its not deleted

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set : {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            return res.send({
                success: true,
                message: 'Good'
            })       
        })
    })

    // Verify endpoint
    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test
        // Verify the token is one of a kind and it's not deleted.
        UserSession.find({
          _id: token,
          isDeleted: false
        }, (err, sessions) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          if (sessions.length != 1) {
            return res.send({
              success: false,
              message: 'Error: Invalid'
            });
          } else {
            // DO ACTION
            return res.send({
              success: true,
              message: 'Good'
            });
          }
        });
      });    
};