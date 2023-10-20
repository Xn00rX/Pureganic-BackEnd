const Dumy = require('../models/Dumy')
const bcrypt = require("bcrypt")
const salt = 10

exports.dumyregister = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    console.log('File', req.file.path);

    const email = req.body.email;

 
    // User does not exist, proceed with registration
    const password = req.body.password;
    const salt = 10; // Define the salt factor for bcrypt

    const hash = bcrypt.hashSync(password, salt);

    const dumy = new Dumy({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      image: req.file ? req.file.filename : null,
      gender: req.body.gender,
      role: req.body.role,
      phonenumber: req.body.phonenumber,
    });

    dumy
      .save()
      .then(() => {
        console.log('Data saved successfully');
        res.json(dumy);
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).send('Error while saving data');
      });

    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}



  exports.dumyLogin = async (req, res) => {
    console.log('Received data for login:', req.body);
    const { email, password } = req.body
    
    try {



      const user = await Dumy.findOne({ email })
      const userimage = user.image
      const username= user.firstName
      if (!user) {
        return res.status(401).send('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      console.log(user.image)
  
      if (!passwordMatch) {
        return res.status(401).send('Incorrect password');
      }
      res.status(200).json({ userimage , username });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Login failed');
    }
  }


  exports.dumyupdatepassword = async (req, res) => {
    console.log('Received data for password update:', req.body);
    const { email, password, newpassword } = req.body;
    
    try {
      const user = await Dumy.findOne({ email });
      if (!user) {
        return res.status(401).send('User not found');
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).send('Incorrect password');
      } else {
        const hash = bcrypt.hashSync(newpassword, saltRounds);
        user.password = hash;
        user.save();
        res.status(200).json({ message: 'Password updated successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Password update failed');
    }
  }