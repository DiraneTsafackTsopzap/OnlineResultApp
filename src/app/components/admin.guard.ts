import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { MeinUser } from '../Model/user';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getUserRole().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true; // L'utilisateur a le rôle "admin", donc autorisez l'accès
        } else {
          // L'utilisateur n'a pas le rôle "admin", redirigez-le vers une autre page (par exemple, page d'accueil)
          this.router.navigate(['/pagenotfound']);
          return false; // N'autorisez pas l'accès
        }
      })
    );
  }
}
