import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from '../Login/services/login-service.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const loginService = inject(LoginServiceService);
  const router = inject(Router);
  const user = loginService.getUser();

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      loginService.logout();
      return router.createUrlTree(['/login'], { queryParams: { return: state.url } })
    }
    else {
      if (user.role.includes('Admin')) {
        return true;
      }
      else{
        alert('Unauthorized');
        return false;
      }
    }
  }
  else {
    loginService.logout();
    return router.createUrlTree(['/login'], { queryParams: { return: state.url } })
  }
};
