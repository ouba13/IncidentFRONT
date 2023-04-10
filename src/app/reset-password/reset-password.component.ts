import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  ResetFom!: FormGroup;
  showPassword = true;
  showConPassword= true;

  constructor(private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.ResetFom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      emailReset: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confiCode: ['', [Validators.required, Validators.minLength(4)]],
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

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

togglePasswordVisibilityCon(){
  this.showConPassword = !this.showConPassword;
}

}
