const admin_seed = require('./admin_seed');
const departement_seed = require('./departement_seed');
const permissions_seed = require('./permissions_seed');
const modules_seed = require('./modules_seed');

const runSeeds = async () => {
  console.log('Start seeding');
  
  await admin_seed.createAdminAccount();
  await departement_seed.seedDepartement();
  await permissions_seed.seedPermissions();
  await modules_seed.seedCSModules();
  
  console.log('End seeding');
};

runSeeds().catch(console.error);