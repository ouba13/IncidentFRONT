import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  ResetFom!: FormGroup;
  showPassword = true;
  showConPassword= true;

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) { }
  ngOnInit(): void {
    this.ResetFom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      //emailReset: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confiCode: ['', [Validators.required, Validators.minLength(4)]],
    });
}


togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

togglePasswordVisibilityCon(){
  this.showConPassword = !this.showConPassword;
}
navigateToLog(){
  this.router.navigate(['/login'])
}

onSubmit() {
  console.log('frst')
  if(this.ResetFom.valid){
    this.authService.resetPassword(
      this.ResetFom.value.email,
      this.ResetFom.value.onfiCode,
      this.ResetFom.value.password
    ).subscribe(
      (data: any) => {
        if(data.result == 1) {
          Swal.fire(
            'Good job!',
            'User logged In!',
            'success'
          )
          this.router.navigate(['/login']);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Invalid confirmation code!",
          })
        }
      },
      (error: any) => {
        console.log('here')

      }
    )
  }
  else {
    alert('Please fill in all required fields.');
  }
  }

}
