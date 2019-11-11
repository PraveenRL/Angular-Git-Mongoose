import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  bindData: any;
  id: any;
  sign: any;
  phone: any;

  constructor(
    public auth: AuthService,
    public item: ItemService,
    public route: Router,
    public routing: ActivatedRoute
  ) { }

  onSubmit(value){
    this.auth.signIn(value);
  }

  // onSubmit(value) {
  //   this.item.signGet(value).subscribe(res => {
  //     this.sign = res;
  //     console.log(value)
  //     if(this.sign.phone == value.phone){
  //       Swal.fire(
  //         'SignIn Successful!',
  //         '',
  //         'success'
  //       )
  //       localStorage.setItem('phoneId', this.sign.phone);
  //       this.route.navigate(['/list']);
  //     }
  //     else{
  //       Swal.fire(
  //         'SignIn Failure!',
  //         'Invalid Information',
  //         'error'
  //       )
  //     }
  //   })
  // }
  
}
