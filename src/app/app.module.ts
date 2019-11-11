import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { OrderModule } from './order/order.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ItemService } from './order/item.service';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { OrderComponent } from './order/ordercreate/order.component';
import { ListComponent } from './order/list/list.component';
import { EditorderComponent } from './order/editorder/editorder.component';
import { SignupComponent } from './order/signup/signup.component';
import { SigninComponent } from './order/signin/signin.component';
import { PageNotFoundComponent } from './order/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ListComponent,
    EditorderComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    // OrderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ItemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
