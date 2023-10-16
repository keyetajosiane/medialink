


// Middleware pour activer 
const cors = require('cors');
const passport =  require('passport');
const bodyParser = require('body-parser');
const express = require('express');
require("dotenv").config()// load environment variables
const helmet = require('helmet');

const app = express();// Create the Express app

app.use(helmet());// Use the helmet middleware

app.use(passport.initialize());// Initialize passport middleware
app.use(cors());// Enable CORS'permet de gerer les donnees
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(express.json());// Use the JSON middleware to parse the request body



const profile = require('./profil/profilRoute');// Import the routers
app.use('/profile', passport.authenticate('jwt', { session: false }), profile);
app.use('/upload', express.static('upload'));// server static files from the "upload" directory

const userRouter = require('./routes/userRoutes');
// const profileRouter = require('./routes/profile');
// Use the routers for the corresponding routes
app.use('/user', userRouter);
// app.use('/profile', profileRouter);

const permissionRouter = require('./routes/permissionRoutes');
// const profileRouter = require('./routes/profile');
// Use the routers for the corresponding routes
app.use('/permissions', permissionRouter);
// app.use('/profile', profileRouter);

const departementRouter = require('./routes/departementRoutes');
// const profileRouter = require('./routes/profile');
// Use the routers for the corresponding routes
app.use('/departement', departementRouter);
// app.use('/profile', profileRouter);


const ressourceRouter = require('./routes/ressourceRoutes');
// const profileRouter = require('./routes/profile');
// Use the routers for the corresponding routes
app.use('/ressources', ressourceRouter);
// app.use('/profile', profileRouter);

 const apprenantRouter = require('./routes/apprenantRoutes');
 app.use('/apprenant', apprenantRouter );

 const formateurRouter = require('./routes/formateurRoutes');
 app.use('/formateur', formateurRouter);

const administration_membersRouter = require('./routes/administration_membersRoutes');
 app.use('/administration_members', administration_membersRouter);



// This middleware function is used to handle errors in the application.
app.use((err, req, res, next) => {
  // Log the error to the console.
  console.error(err);

  // Check if the error is an instance of SyntaxError.
  if (err instanceof SyntaxError) {
    // If it is, set the response status to 400 (Bad Request) and send a JSON response with the message 'Bad Request'.
    res.status(400).json({ message: 'Bad Request' });
  } else {
    // If it's not a SyntaxError, set the response status to 500 (Internal Server Error) and send a JSON response with the message 'Internal server error'.
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server and listen for incoming requests
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app