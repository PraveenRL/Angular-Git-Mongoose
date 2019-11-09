import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {}
  constructor(
    private http: HttpClient,
    public route: Router
  ) { }

  //SignUp
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/sign`;
    return this.http.post(api, user)
      .pipe(catchError(this.handleError))
  }

  signIn(user: User) {
    return this.http.post(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.route.navigate(['bill' + res.msg._id])
        })
      })
  }

  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/bill/${id}`;
    return this.http.get(api, { headers: this.headers })
      .pipe(map((res: Response) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout(){
    let removeToken = localStorage.removeItem('access_token');
    if(removeToken == null){
      this.route.navigate(['signin']);
    }
  }

  //Error
  handleError(error: HttpErrorResponse) {
    let msg = ''
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;              //Client side error
    }
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg)
  }
}
