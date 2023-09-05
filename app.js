const express = require('express');
// Create the Express app

// load environment variables
require("dotenv").config()

const app = express();
// Use the JSON middleware to parse the request body
app.use(express.json());
// Import the routers


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


// Define a catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});
// Define an error-handling middleware for 500 errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});
// Start the server and listen for incoming requests
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app