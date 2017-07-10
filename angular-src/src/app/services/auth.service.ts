import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired, AuthConfigConsts} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken :any;
  user :any;
  constructor(private http : Http) 
  {

  }

registerUser(user)
 {
   let headers = new Headers();
   headers.append('Content-Type','application/json');

  return this.http.post("http://localhost:3000/users/register",
                        user,
                        {headers : headers}
                        ).map(res => res.json());
                  
 }

 signIn(credentials)
 {
  let headers = new Headers();
  headers.append('content-Type','application/json');

  return this.http.post("http://localhost:3000/users/authenticate",
    credentials,
    {headers: headers}
    ).map(res => res.json());
 }

 storeUserData(token, user)
 {
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken = token;
  this.user = user;
 }

 getUserProfile()
 {
   this.loadToken();
   let headers = new Headers();

   headers.append('Authorization',this.authToken);
   headers.append('Content-Type','application/json');
   
  return this.http.get('http://localhost:3000/users/profile', {headers : headers})
   .map(res => res.json());
 }

 private loadToken()
 {
  this.authToken = localStorage.getItem('id_token');
 }

 loggedIn()
 {
   //console.log(AuthConfigConsts.DEFAULT_TOKEN_NAME);
   return tokenNotExpired('id_token');
 }

 logOut()
 {
   this.authToken =null;
   this.user = null;
   localStorage.removeItem('id_token');
   localStorage.removeItem('user');
 }
}
