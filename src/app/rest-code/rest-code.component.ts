import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-code',
  templateUrl: './rest-code.component.html',
  styleUrls: ['./rest-code.component.css']
})
export class RestCodeComponent {
  displayModal!:boolean;
  ResForm!: FormGroup;
  showPassword = true;
  constructor(private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.ResForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

}

  navigateToRes() {
    this.router.navigate(['/reset']);
   }
}
