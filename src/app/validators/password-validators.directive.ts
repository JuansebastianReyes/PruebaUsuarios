import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidatorsDirective = new PasswordValidatorsDirective();
    return PasswordValidatorsDirective.passwordMatchValidator(control);
  }
}

@Directive({
  selector: '[passwordValidators]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorsDirective, multi: true }]
})
export class PasswordValidatorsDirective {
  static passwordMatchValidator(control: AbstractControl): import("@angular/forms").ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ NoPassswordMatch: true });
      return { NoPassswordMatch: true }
    } else {
      return null;
    }
  }
}
