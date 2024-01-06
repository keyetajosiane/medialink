const admin_seed = require('./admin_seed');
const departement_seed = require('./departement_seed');
const permissions_seed = require('./permissions_seed');

console.log('Start seeding');
admin_seed.createAdminAccount();