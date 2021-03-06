import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/ordercreate/order.component';
import { ListComponent } from './order/list/list.component';
import { EditorderComponent } from './order/editorder/editorder.component';
import { SigninComponent } from './order/signin/signin.component';
import { SignupComponent } from './order/signup/signup.component';
import { PageNotFoundComponent } from './order/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditorderComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
