import { Iconify } from 'src/components/iconify';
import { PERMISSIONS } from 'src/constants/permissions';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <Iconify icon={name} />
);
export const navData = [
  {
     title: 'Home',
    path: '/',
     icon: icon('hugeicons:quiz-02'),
     requiredPermissions:[],
    subItems: [
      { title: '1', path: '/', icon: icon('icon-park-outline:data-all'),requiredPermissions:[PERMISSIONS.PAGES.HOME] },

    ]
  }
];

export const navUserFunc = [
];