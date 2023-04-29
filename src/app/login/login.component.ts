import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  displayModal!:boolean;
  loginForm!: FormGroup;
  showPassword = true;
  constructor(private router: Router, private formBuilder: FormBuilder,private authser:AuthService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // emailReset: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.authser.isLoggedIn()) {
      //to navigate to the home page after login**
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
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.decodedToken.role); // set the user's role in localStorage
            Swal.fire(
              'Good job!',
              'User logged In!',
              'success'
            )
            this.router.navigate(['/']);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.error
            })
          }
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email or password, Please check again.',
          })
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  
  }


  navigateToTarget() {
    this.router.navigate(['/sign']);
  }

  // navigateToTargetRes() {
  //   this.router.navigate(['/reset']);
  // }

  navigateToRES() {
    this.router.navigate(['/resetCode']);
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  showModalDialog() {
    this.displayModal = true;
  }



}
