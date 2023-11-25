import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private usersService: UsersService) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    if(control.value === null || control.value.length === 0) {
      return null;
    }
    // Regular expression to match a valid email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    // Check if the control's value matches the email pattern
    if (control.value && !emailPattern.test(control.value.toLowerCase())) {
      return { invalidEmail: true };
    }

    return null;
  }

  onSubmit() {
    if (this.authForm.valid) {
      // Form is valid; you can proceed with form submission.
      const credentials = {
        email: this.authForm.get('email')?.value,
        password: this.authForm.get('password')?.value,
      };

      // Make the API request to authenticate the user
      this.http
        .post('https://apilb.tridevs.net/api/Users/login', credentials)
        .pipe(
          catchError((error) => {
            console.error('Error:', error);
            alert('Invalid email or password');
            return throwError(error);
          }),
          
        )

        .subscribe((response: any) => {
          // Authentication successful; you can store the token and user information
          const token = response.id;
          const userId = response.userId;
          // Do something with the token and user information, like storing it in a service or local storage.
          console.log(
            'Authentication successful. Token:',
            token,
            'User ID:',
            userId
          );
          this.usersService.login(userId, credentials.email);
          
          this.router.navigate(['/loggedin']);
          // alert('Authentication successful');
        });
    }
  }
}
