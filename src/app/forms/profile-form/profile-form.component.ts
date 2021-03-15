import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms';
import { Subscription } from 'rxjs';

// describes what the return value of the form control will look like
export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements OnInit, OnDestroy, ControlValueAccessor  {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get emailControl() {
    return this.form.controls.email;
  }

  get firstNameControl() {
    return this.form.controls.firstName;
  }

  get value(): ProfileFormValues {
    return this.form.value;
  }

  set value(value: ProfileFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: ['', Validators.required]
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false } };
  }



}
