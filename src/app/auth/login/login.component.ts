import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loginRequest } from 'src/app/reducers/auth/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  getErrorMessage() {
    if (this.formGroup.get('email').hasError('required')) {
      return 'Debes ingresar un email';
    }

    return this.formGroup.get('email').hasError('email') ? 'El email no es válido' : '';
  }

  getPasswordErrorMessage() {
    if (this.formGroup.get('password').hasError('minlength')) {
      return 'Debes ingresar mínimo 8 carácteres';
    }
    return this.formGroup.get('password').hasError('required') ? 'Debes ingresar una contraseña' : '';
  }

  login() {
    if(this.formGroup.valid) {
      this.store.dispatch(loginRequest(this.formGroup.getRawValue()));
    }
  }

}
