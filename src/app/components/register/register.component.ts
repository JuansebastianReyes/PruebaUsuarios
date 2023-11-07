import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidatorsDirective } from 'src/app/validators/password-validators.directive';
import Swal from 'sweetalert2';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatButtonModule } from '@angular/material/button';
import { RegisterData } from 'src/app/interfases/registerData.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('passInput') passInput: ElementRef = {} as ElementRef;
  @ViewChild('passConfInput') passConfInput: ElementRef = {} as ElementRef;

  form: FormGroup = new FormGroup({});
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //patron letras
  patternLetters = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  //patron numeros
  patternNumbers = /^[0-9]+$/;

  constructor(
    private fb: FormBuilder,
    private apiServiceService: ApiServiceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      documentNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern(this.patternNumbers)]],
      identificationType:['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: PasswordValidatorsDirective.passwordMatchValidator
    })
  }


  ngOnInit(): void {
  }


  save() {
     var user: RegisterData = {
      Nombres: this.form.value.name,
      Apellidos: this.form.value.lastName,
      Email: this.form.value.email,
      User: this.form.value.user,
      Pass: this.form.value.password,
      NumeroIdentificacion: this.form.value.documentNumber,
      TipoIdentificacion: this.form.value.identificationType
    }
    this.apiServiceService.register(user).subscribe(
      () => {
        this.succesMesage();
      }, (error:any) => {
        this.error();
      })
  }

  succes(url:string){
    this.router.navigate([url]);
  }

  togglePasswordInputType() {
    this.passInput.nativeElement.type = this.passInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  toogleConfirmPasswordInputType() {
    this.passConfInput.nativeElement.type = this.passConfInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  succesMesage(){
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Se ha registrado correctamente',
      confirmButtonText: 'Ok'
    })
    this.succes('login');
  }

  error(){
    Swal.fire({
      icon: 'error',
      title: 'Error al crear usuario',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Inténtalo de Nuevo'
    })
  }

}
