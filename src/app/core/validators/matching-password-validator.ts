import { FormControl } from '@angular/forms';

export const matchingPasswords = (passwordControl: FormControl) => {
  return (control: FormControl): null | { passwordsMustMatch: boolean } => {
    if (passwordControl.dirty) {
      return control.value !== passwordControl.value
        ? { passwordsMustMatch: true }
        : null;
    }

    return null;
  };
};
