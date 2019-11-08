import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';

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
    public item: ItemService,
    public route: Router,
    public routing: ActivatedRoute
  ) { }

  onSubmit(value) {
    this.item.signIn(value).subscribe(res => {
      this.sign = res;
      if(this.sign.length >= 1){
        Swal.fire(
          'SignIn Successful!',
          '',
          'success'

        )
        localStorage.setItem('phoneId', this.sign[0].phone);
        this.route.navigate(['/list']);
      }
      else{
        Swal.fire(
          'SignIn Failure!',
          'Invalid Information',
          'error'
        )
      }
    })
  }
  
}
