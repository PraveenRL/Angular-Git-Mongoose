import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm : FormGroup;
  submitted = false;
  phone: any;

  constructor(private item: ItemService ,
              private formBuilder : FormBuilder, 
              private route : ActivatedRoute, 
              private router : Router
              ) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      item : ['', Validators.required],
      price : ['', Validators.required],
      quantity : ['', Validators.required]
    });
  }
  get f(){
    return this.orderForm.controls;
  }

  order(value){
    this.submitted = true;
    if(this.orderForm.invalid){
      return;
    }
    else {
      // value.phone = JSON.parse(localStorage.getItem('phoneId'))
      this.item.postOrder(value).subscribe(res => {
        console.log(value);
        Swal.fire(
          'Order Added',
          '',
          'success'
        )
      })
    }
  }

}
