const { createConnection } = require('../config/connection');

// Define modules for the CS department with names and descriptions
const csModules = [
  { name: "Computer Science 101", description: "Introduction to Computer Science" },
  { name: "Data Structures", description: "Fundamentals of Data Organization" },
  { name: "Algorithms", description: "Algorithm Design and Analysis" },
  { name: "Computer Architecture", description: "Exploring the Structure and Functionality of Computer Systems" },
  { name: "Operating Systems", description: "Principles of Modern Operating Systems and their Design" },
  { name: "Database Systems", description: "Database Design, SQL, and Transaction Management" },
  { name: "Networking Fundamentals", description: "Basics of Computer Networking and Data Communication" },
  { name: "Software Engineering", description: "Software Development Life Cycle and Methodologies" },
  { name: "Web Development", description: "Designing and Developing Applications for the Web" },
  { name: "Artificial Intelligence", description: "Introduction to AI Concepts and Techniques" },
  { name: "Machine Learning", description: "Algorithms and Statistical Models for Predictive Data Analysis" },
  // Add more modules as needed
];

const seedCSModules = async () => {
  try {
    // Connect to the database
    const connection = await createConnection();
    
    // Seed the modules for CS department
    console.log(`Seeding CS modules...`);
    for (const module of csModules) {
      await connection.query('INSERT INTO modules (module_name, description, departement_id) VALUES (?, ?, ?)', 
                             [module.name, module.description, 7]);
      console.log(`Inserted module: ${module.name}`);
    }
    
    // Close the connection
    await connection.end();
  } catch (error) {
    console.error('Error seeding CS modules:', error);
  }
};

module.exports = { seedCSModules };
// seedCSModules();