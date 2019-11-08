import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
id: any;
bindData: any;
display: any ={
  item: '',
  price: '',
  quantity: ''
}

  constructor(public item: ItemService, 
              public routing : ActivatedRoute, 
              public router : Router
            ) { }

  ngOnInit() {
    this.id = this.routing.snapshot.params['id'];
    this.item.getOrders(this.id).subscribe(res => {
      this.display = res;
    })
  }
  
  updateOrder(value){
    this.id = this.routing.snapshot.params['id'];
    this.item.updateOrder(this.id, value).subscribe(res => {
      this.bindData = res;
      this.router.navigate(['/list']);
    })
  }
}
