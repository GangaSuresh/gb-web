import type { RootState } from 'src/redux/store';

import { useSelector } from 'react-redux';
import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useProfileIfMissingData } from 'src/hooks/useProfile';

import { AuthService } from './authService';
import { PermissionService } from './permissionsService';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string | string[];
  anyPermissions?: string | string[];
  unauthorizedRedirect?: string;
}

export const AuthGuard = ({
  children,
  requiredPermissions,
  anyPermissions,
  unauthorizedRedirect = '/unauthorized',
}: AuthGuardProps) => {
  const authService = useMemo(() => new AuthService(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);
  const userData = useSelector((state: RootState) => state.userInfo.userData);
  useProfileIfMissingData();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/sign-in', { state: { from: location }, replace: true });
    }
    if (userData.email !== '') {
      if (requiredPermissions) {
        const required = Array.isArray(requiredPermissions)
          ? requiredPermissions
          : [requiredPermissions];

        if (!PermissionService.hasAllPermissions(userData, required)) {
          navigate(unauthorizedRedirect, { replace: true });
          return;
        }
      }

      if (anyPermissions) {
        const any = Array.isArray(anyPermissions) ? anyPermissions : [anyPermissions];

        if (!PermissionService.hasAnyPermission(userData, any)) {
          navigate(unauthorizedRedirect, { replace: true });
          return;
        }
      }

      setVerified(true);
    }
  }, [
    navigate,
    location,
    requiredPermissions,
    anyPermissions,
    unauthorizedRedirect,
    authService,
    userData.email,
    userData,
  ]);
  return verified ? <>{children}</> : null;
};

export default AuthGuard;
