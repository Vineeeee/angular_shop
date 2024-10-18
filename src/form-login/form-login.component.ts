import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';
import { Form } from 'src/models/form';
import { FormLoginService } from 'src/services/form-login.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss', '../product-detail/styles/button.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule]
})
export class FormLoginComponent implements OnInit {

  submitted = false

  formGroup: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required])]
  })

  constructor(private fb: FormBuilder, private toast: ToastController,
    private router: Router, private service: FormLoginService
  ) { }

  isFormError(control: string, validation: string): boolean {
    const controlErrors = this.formGroup.controls[control]?.errors;
    return controlErrors ? controlErrors[validation] : false;
  }

  formToValue(form: typeof this.formGroup): Form{
    return {
        email: form.value.email!,
        password: form.value.password!
    }
}

  ngOnInit() { }

  async form(){
    this.submitted = true
    if (this.formGroup.valid) {
        localStorage.setItem("logado", "true")
        this.service.saveForm(this.formToValue(this.formGroup))
        this.router.navigate(['/home/products'])
        
    } else {
      const toast = await this.toast.create({
        header: "Login error",
        message: "The data entered is wrong",
        duration: 2000,
        position: "top"
      });

      await toast.present();
    }
}
}