import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignOutComponent } from './sign-out/sign-out.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'loggedin', component: SignOutComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
