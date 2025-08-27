export const PERMISSIONS = {
  PAGES: {
    HOME: 'pages.home',
  },

  // Operations
  OPERATIONS: {
    DELETE: 'ops.delete',
    EDIT: 'ops.edit',
    CREATE: 'ops.create',
    VIEW: 'ops.view',
  },

  // Features
  FEATURES: {
    EXPORT: 'features.export',
    IMPORT: 'features.import',
    SHARE: 'features.share',
  },
};

// ROLES
export const ROLES = {
  SUPER_ADMIN: 'superAdmin',
  ADMIN: 'admin',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    ...Object.values(PERMISSIONS.PAGES), // all permissions
    ...Object.values(PERMISSIONS.OPERATIONS),
  ],
  [ROLES.ADMIN]: [
    ...Object.values(PERMISSIONS.PAGES),
    ...Object.values(PERMISSIONS.OPERATIONS),
  ],
};
