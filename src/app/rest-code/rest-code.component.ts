import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rest-code',
  templateUrl: './rest-code.component.html',
  styleUrls: ['./rest-code.component.css']
})
export class RestCodeComponent {

  displayModal!:boolean;
  ResForm!: FormGroup;
  showPassword = true;
  email!:any

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) { }
  ngOnInit(): void {
    this.ResForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

}

  navigateToRes() {
    this.router.navigate(['/reset']);
   }

   onSubmit() {
    if(this.ResForm.valid){
      this.authService.checkEmail(
        this.ResForm.value.email
      ).subscribe(
        (data: any) => {
          if(data.result == 1) {
            this.router.navigate(['/resetPassword']);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Email doesn't exist!",
            })
          }
        },
        (error: any) => {

        }
      )
    }
    else {
      alert('Please fill in all required fields.');
    }
    }
}
