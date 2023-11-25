import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {
  isAuthenticated: boolean = false;
  userId: string | null = null;
  userEmail: string | null = null;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getIsAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.userService.getUserId().subscribe((userId) => {
      this.userId = userId;
    });

    this.userService.getUserEmail().subscribe((userEmail) => {
      this.userEmail = userEmail;
    });
  }
}
