import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private authser:AuthService) { }


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
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.last_name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: 'user'
      };
       this.authser.addUser(user).subscribe(
         (data)=>{
             console.log(data);
            alert("success");
         },(error)=>{
           console.log(error);
           alert("something wrong");
         }
       )
      console.log(user);
    } else {
      alert('Please fill in all required fields.');
    }
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
