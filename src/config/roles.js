const allRoles = {
  admin: [
    'manageConfig',
    'manageBanners',
    'getAdmins',
    'adminProfile',
    'manageBrands',
    'manageFeeds',
    'manageTiers',
    'viewMedia',
    'uploadMedia',
    'manageUsers',
    'manageBill',
    'manageRule',
  ],
  master: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
