import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiServiceService: ApiServiceService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    //Priemras pruebas para la redireccion del login
    this.apiServiceService.login({Usuario:usuario,Password: password})
    .subscribe(() => {
      this.succes('dashboard');
    }, (error:any) => {
      this.error();
    })
  }

  //Funcion para muestra error en el login
  error(){
    Swal.fire({
      icon: 'error',
      title: 'Usuario o Contraseña inválido',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Inténtalo de Nuevo'
    })
  }

  succes(url:string){
    this.router.navigate([url]);
  }

  seePassword(){
    this.showPassword = !this.showPassword;
  }

  redirectSignIn() {
    this.router.navigate(['/signin']);
  }

}
