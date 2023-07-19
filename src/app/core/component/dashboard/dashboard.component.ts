import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public _authService: AuthService, 
    private _router: Router) {
  }

  ngOnInit(): void {

  }
  

  logout() {
    this._authService.logout().subscribe((apiResponse: any) => {
      if(apiResponse && apiResponse.id > 0) {
        localStorage.removeItem(AppConstants.myTokenKey);
        this._router.navigate(['/']);
      }
    });
  }
}