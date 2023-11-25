import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule } from './app-routing.module';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UserPreviewComponent } from './user-preview/user-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    SignOutComponent,
    UserPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
