import { Injectable } from '@angular/core';
import { LoginData } from '../interfases/loginData.interface';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../interfases/registerData.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  api_url = environment.URL_API;

  constructor(private httpClient: HttpClient) { }

  public register(user: RegisterData){
    return this.httpClient.post(this.api_url + 'register', user);
  }

  public login(loginData:LoginData){
    return this.httpClient.post(this.api_url + 'login', loginData);
  }

  public CountUsers(){
    return this.httpClient.get(this.api_url + 'count');
  }
}
