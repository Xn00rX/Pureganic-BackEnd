const User = require("../models/User")
// const bcrypt = require("bcrypt")




// const saltRounds = 10;

// exports.user_signup_post = async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log(req.file.path);
//     const { firstName, lastName, email, phoneNumber, seller, gender } = req.body;
//     const password = req.body.password; // Extract the password field correctly

//     const hash = bcrypt.hashSync(password, saltRounds);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       seller,
//       gender,
//       password: hash,
//     });

//     await newUser.save();
//     console.log('User registered:', newUser);

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }


exports.UserController = async (req,res)=> {
  console.log(req.body)

    try {
      const { firstName, lastName, phoneNumber, email, password, dateOfBirth, seller, gender } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        dateOfBirth,
        seller,
        gender,
      });

      if (req.file) {
        newUser.image = req.file.path;
      }

      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User registration failed" });
    }

};


