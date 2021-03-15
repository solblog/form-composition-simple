import { Component, OnInit,  ChangeDetectionStrategy  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileFormValues } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-reusable-forms-example',
  templateUrl: './reusable-forms-example.component.html',
  styleUrls: ['./reusable-forms-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableFormsExampleComponent implements OnInit {
  signupForm: FormGroup;
  formConditonalSubscription: Subscription;
  values: ProfileFormValues;


  constructor(private formBuilder: FormBuilder) {

    this.signupForm = this.formBuilder.group({
      password: [],
      profile: []
    });

    /**
     * 1. How to set values?
     */

    // this.signupForm.controls.profile.setValue();

   }

  ngOnInit() {

    const profileValues: ProfileFormValues = null;
    profileValues.firstName = 'My First Name';
    profileValues.lastName = 'My Last Name';
    profileValues.email = 'email';
    this.signupForm.controls.profile.setValue(profileValues);

    console.log(this.signupForm.controls.profile);

    this.initCheckForm();
  }

  resetForm() {
    this.signupForm.reset();
  }

  submit() {
    console.log(this.signupForm.value);
  }

  initCheckForm() {

    this.formConditonalSubscription = this.signupForm.statusChanges.subscribe(
      result => {
          console.log('this.formConditionalValidation', this.signupForm);
          console.log('this.profile', JSON.stringify(this.signupForm.controls.profile.value));

    });

    console.log(this.signupForm.value);

  }


}

/**
 * Values
 */

class Profile implements ProfileFormValues {

  firstName: string;
  lastName: string;
  email: string;

  constructor(
  ) {
  }

}
