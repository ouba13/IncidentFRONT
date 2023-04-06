import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  showPassword = false;
  constructor(private router: Router, private formBuilder: FormBuilder,private authser:AuthService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.authser.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

   
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authser.TokenUser(user).subscribe(
        (data: any) => {
          if(data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/']);
            console.log(data.token);
          }
          else {
            alert('Token is empty');
          }
          
        },
        (error: any) => {
          console.error(error); // handle error
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  navigateToTarget() {
    this.router.navigate(['/sign']);
  }

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
