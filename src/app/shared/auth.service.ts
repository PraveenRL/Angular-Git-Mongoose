import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: any;
  constructor(
    private http: HttpClient,
    public route: Router
  ) { }

  //SignUp
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}sign`;
    return this.http.post(api, user)
      .pipe(catchError(this.handleError))
  }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}sign/signauth`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          Swal.fire(
            'SignIn Success',
            '',
            'success'
          )
          this.currentUser = res;
          this.route.navigate(['/order'])
        })
      })
  }

  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}sign/${id}`;
    return this.http.get(api, { headers: this.headers })
      .pipe(map((res => this.currentUser = res))
      )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.route.navigate(['signin']);
    }
  }

  //Error
  handleError(error: HttpErrorResponse) {
    let msg = ''
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;                                      //Client side error
    }
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`  //Server side error
    }
    return throwError(msg)
  }
}
