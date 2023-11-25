import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {
  constructor(private usersService: UsersService, private router: Router) { }

  signOut() {
    this.usersService.logout();
    this.router.navigate(['/']);
  }

}
