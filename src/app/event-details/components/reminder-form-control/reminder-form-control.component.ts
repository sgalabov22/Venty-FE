import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ReminderItem } from '@app/event-details/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder-form-control',
  templateUrl: './reminder-form-control.component.html',
  styleUrls: ['./reminder-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ReminderFormControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ReminderFormControlComponent,
      multi: true
    }
  ]
})
export class ReminderFormControlComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() reminderItem?: ReminderItem;

  private onChange: (value: ReminderItem) => void;
  private onTouched: (value: ReminderItem) => void;
  private unsubscribe$$ = new Subject<void>();

  public reminderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public get name(): FormControl {
    return this.reminderForm.get('name') as FormControl;
  }

  public get scheduled(): FormControl {
    return this.reminderForm.get('scheduled') as FormControl;
  }

  public get emailBody(): FormControl {
    return this.reminderForm.get('emailBody') as FormControl;
  }

  public ngOnInit(): void {
    if (this.reminderItem) {
      this.reminderForm = this.formBuilder.group({
        name: [this.reminderItem.name, Validators.required],
        scheduled: [new Date(this.reminderItem.scheduled), Validators.required],
        emailBody: [this.reminderItem.email_body, Validators.required]
      });
    } else {
      this.reminderForm = this.formBuilder.group({
        name: [null, Validators.required],
        scheduled: [null, Validators.required],
        emailBody: [null, Validators.required]
      });
    }

    this.reminderForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((value: ReminderItem) => {
        this.onChange(value);
      });
  }

  public writeValue(value: ReminderItem): void {
    if (value) {
      this.reminderForm = this.formBuilder.group({
        name: [this.reminderItem.name, Validators.required],
        scheduled: [new Date(this.reminderItem.scheduled), Validators.required],
        emailBody: [this.reminderItem.email_body, Validators.required]
      });
    }
  }

  public registerOnChange(fn: (value: ReminderItem) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (value: ReminderItem) => void): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  public validate(): ValidationErrors {
    return this.reminderForm.valid ? null : { reminderForm: { valid: false } };
  }
}
