import { useSelector } from 'react-redux';

import type { RootState } from '../redux/store';

import { PermissionService } from '../sections/auth/permissionsService';

type PermissionCheckType = 'all' | 'any';

export const usePermission = () => {
  const userData = useSelector((state: RootState) => state.userInfo.userData);

  const checkPermission = (
    requiredPermissions?: string | string[],
    checkType: PermissionCheckType = 'all'
  ): boolean => {
    if (!requiredPermissions) return true;
    
    const permissionsToCheck = Array.isArray(requiredPermissions) 
      ? requiredPermissions 
      : [requiredPermissions];
    
    return checkType === 'all'
    ? PermissionService.hasAllPermissions(userData, permissionsToCheck)
    : PermissionService.hasAnyPermission(userData, permissionsToCheck);
  };

  return { checkPermission };
};