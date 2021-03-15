import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReusableFormsExampleComponent } from './forms/reusable-forms-example/reusable-forms-example.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { PasswordFormComponent } from './forms/password-form/password-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ReusableFormsExampleComponent,
    ProfileFormComponent,
    PasswordFormComponent
  ],
  imports: [
    [ BrowserModule, ReactiveFormsModule ],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
