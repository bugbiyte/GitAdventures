const User = require('../models/User');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
let errors = { email: '', password: '' };
    }
//validation errors
if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
    });
        console.log('validation error');
}


module.exports. signup_get = (req, res) => {
    res.render('signup');
    };

    module.exports. login_get = (req, res) => {
    res.render('login');
    };

    module.exports. signup_post = async (req, res) => {
const { email, password } = req.body;
try {
User.create({ email, password });
res.status(201).json({ user: user._id });

    }

catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });

}
    }

    module.exports. login_post = (req, res) => {
    res.send('user login');
    };
