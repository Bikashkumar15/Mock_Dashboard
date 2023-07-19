
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.scss']
})
export class UserregistrationComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private _authService: AuthService,
      //private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          userName: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
      console.log("Registration:",this.form);
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  success:boolean=true;
  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
   

      this.loading = true;
       this._authService.userRegister(this.form.value)
           .subscribe({
              next: (response)  => {
                   this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                //   this.router.navigate(['../login'], { relativeTo: this.route });
                  this.success=true;
                  this.form.reset();
              },
             error: (error) => {
                  this.alertService.error(error);
                  this.loading = false;
              },
              complete :()=>console.log("Function Completed")
            });
            this.form.reset();
  }
}
