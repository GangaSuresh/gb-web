import type { ROLES } from 'src/constants/permissions';
import type { UserInfo } from 'src/redux/userInfoSlice';

import { ROLE_PERMISSIONS } from 'src/constants/permissions';

export class PermissionService {
  static hasPermission(userData:UserInfo, permission: string): boolean {
    return userData?.permissions.includes(permission);
  }

  static hasAnyPermission(userData:UserInfo, permissions: string[]): boolean {
    return permissions.some(perm => this.hasPermission(userData, perm));
  }

  static hasAllPermissions(userData:UserInfo, permissions: string[]): boolean {
    return permissions.every(perm => this.hasPermission(userData, perm));
  }

  static getPermissionsForRoles(roles: string[]): string[] {
    const permissions = new Set<string>();

    roles.forEach(role => {
      (ROLE_PERMISSIONS[role as keyof typeof ROLES] || []).forEach(perm => {
        permissions.add(perm);
      });
    });

    return Array.from(permissions);
  }
}