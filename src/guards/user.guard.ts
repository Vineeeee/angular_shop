import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router); 
  const isLoggedIn = localStorage.getItem("logado");
  
  if (!isLoggedIn || isLoggedIn === "false") {
    if (state.url !== '/login') {
      router.navigate(["/login"]);
    }
    return false
  }

  if (state.url === "/login" && isLoggedIn === "true") {
    router.navigate(["/home/exemploum"]);
    return false;
  }

  return true;
};