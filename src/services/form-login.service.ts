import { Injectable } from '@angular/core';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormLoginService {

  constructor() { }

  saveForm(form: Form) {
    localStorage.setItem('email', JSON.stringify(form))
  }
}
