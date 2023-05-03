import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword=true;
  showConPassword=true;
  roles: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private authser: AuthService) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        this.matchOtherValidator('password')
      ]))

    });

this.getRoles()
  }
  matchOtherValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const otherControl = control.parent?.get(otherControlName);
      if (!otherControl) {
        return null;
      }
      if (control.value !== otherControl.value) {
        return { matchOther: true };
      }
      return null;
    };
  }


  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const user = {
        firstname: this.registerForm.value.first_name,
        lastname: this.registerForm.value.last_name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role:this.registerForm.value.role
      };
      this.authser.addUser(user).subscribe(
        (data) => {
          console.log(data)
          Swal.fire(
            'Good job!',
            'Registration Done Successfully, check email to verify your account.',
            'success'
          );
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.log('Error occurred: ', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred. Please try again later.'
          });
        }

      );
    } else {
      console.log('4')
      alert('Please fill in all required fields.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibilityCon(){
    this.showConPassword = !this.showConPassword;
  }



  navigateToTarget() {
    this.router.navigate(['/login']);
  }

  getRoles(){
    this.authser.getRoles().subscribe(
      data=>{
        this.roles = data
      }
    )
  }


}
