import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacebookAuthComponent } from './facebook-auth/facebook-auth.component';


const routes: Routes = [
  {path: 'facebook-auth', component: FacebookAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
