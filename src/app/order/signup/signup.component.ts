import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  id: any;
  constructor(
    private item: ItemService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  };
  get f(){
    return this.signupForm.controls;
  }
  signup(value){
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }
    else {
      this.item.signPost(value).subscribe(res => {
        console.log(value)
        Swal.fire(
          'SignUp Successful!',
          '',
          'success'
        )
      })
    }
  }

}
