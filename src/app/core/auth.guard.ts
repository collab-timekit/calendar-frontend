import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;
  const requiredRole = route.data['role'];

  console.log(grantedRoles);

  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean => {
    const inResourceRoles = Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));
    const inRealmRoles = grantedRoles.realmRoles.includes(role);

    return inResourceRoles || inRealmRoles;
  };
  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard(isAccessAllowed);
