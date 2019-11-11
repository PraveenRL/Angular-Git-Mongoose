import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemService } from '../item.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  bindData: any;
  phone: any;
  value: any;
  list: Object = {}

  constructor(
    private item: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  // ngOnInit() {
  //   let id = this.activatedRoute.snapshot.paramMap.get('id');
  //   this.auth.getUserProfile(id).subscribe(res => {
  //     this.bindData = res.msg
  //     console.log(this.bindData);
  //   })
  // }

  ngOnInit() {
    // this.phone = JSON.parse(localStorage.getItem('phoneId'))
    this.item.getOrder().subscribe(res => { 
      this.bindData = res;
      console.log(this.bindData);
    })
  } 

  delete(value) {
    Swal.fire({
      title: 'Are you sure?',
      // text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.item.deleteOrder(value).subscribe(res => {
          this.ngOnInit();
          Swal.fire(
            'Deleted!',
            'Your Order has been deleted.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Order is safe :)',
          'error'
        )
      }
    })
  }
}
