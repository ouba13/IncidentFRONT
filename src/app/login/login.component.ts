import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      // Login logic here
    } else {
      alert('Please fill in all required fields.');
    }
  }

  navigateToTarget() {
    this.router.navigate(['/sign']);
  }

}
