import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  constructor(public authService : AuthService,public router:Router) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    goToHome(){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/home']));

    }


    logout(){
      this.authService.logout();
      this.router.navigate([''])
    }


}
