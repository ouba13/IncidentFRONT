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
  constructor(private router: Router, private formBuilder: FormBuilder,private authser:AuthService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
       this.authser.TokenUser(user).subscribe(
         (data)=>{
             console.log(data);
             console.log("success");
            
         },(error)=>{
           console.log(error);
           console.log("something wrong");
         }
       );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  navigateToTarget() {
    this.router.navigate(['/sign']);
  }

}
