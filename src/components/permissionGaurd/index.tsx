import { usePermission } from 'src/hooks/usePermission';

interface PermissionGuardProps {
  children: React.ReactNode;
  to: string | string[];
  mode?: 'all' | 'any';
  fallback?: React.ReactNode;
}

export const PermissionGuard = ({
  children,
  to,
  mode = 'all',
  fallback = null,
}: PermissionGuardProps) => {
  const { checkPermission } = usePermission();
  const permissions = Array.isArray(to) ? to : [to];
  const hasPermission = checkPermission(permissions, mode);

  return hasPermission ? <>{children}</> : <>{fallback}</>;
};