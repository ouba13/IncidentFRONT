import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private router: Router, private formBuilder: FormBuilder, private authser: AuthService) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        this.matchOtherValidator('password')
      ]))

    });
  }
  matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {
      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
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
        role: 'user'
      };
      this.authser.addUser(user).subscribe(
        (data) => {
          //console.log(data);
          Swal.fire(
            'Good job!',
            'Registration Done Successfully',
            'success'
          )
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Check the fields please'
          })
        }
      );
    } else {
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

  // onSubmit(){
  //   this.userservice.addUser(this.user).subscribe(
  //     (data)=>
  //   );
  // }
}
