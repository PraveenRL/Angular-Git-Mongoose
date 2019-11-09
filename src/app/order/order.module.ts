import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './ordercreate/order.component';
import { ListComponent } from './list/list.component';
import { EditorderComponent } from './editorder/editorder.component';
import { ItemService } from './item.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from '../shared/auth.service';


 
@NgModule({
  declarations: [
    OrderComponent,
    ListComponent,
    EditorderComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ItemService, AuthService]
})
export class OrderModule { }
