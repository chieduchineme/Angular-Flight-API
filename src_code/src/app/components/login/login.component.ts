import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hasError! : boolean
  remember : boolean = false;
  errorMessage: string = ''
  password: string = '';
  

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    ) { }
  
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
   }

  onSubmit() { 
    if(this.loginForm.valid){
      this.router.navigate(['/dashboard']);
  } else {
    this.hasError = !this.hasError;
    this.errorMessage = "Email is not valid and Password is required"
  }
}

}
