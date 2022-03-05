import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChecklistItem } from '../../interfaces';

@Component({
  selector: 'app-checklist-form-control',
  templateUrl: './checklist-form-control.component.html',
  styleUrls: ['./checklist-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChecklistFormControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ChecklistFormControlComponent,
      multi: true
    }
  ]
})
export class ChecklistFormControlComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() checklistItem?: ChecklistItem;

  private onChange: (value: ChecklistItem) => void;
  private onTouched: (value: ChecklistItem) => void;
  private unsubscribe$$ = new Subject<void>();

  public checklistForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  public get name(): FormControl {
    return this.checklistForm.get('name') as FormControl;
  }

  public get items(): FormArray {
    return this.checklistForm.get('items') as FormArray;
  }

  public ngOnInit(): void {
    if (this.checklistItem) {
      this.checklistForm = this.fb.group({
        name: [this.checklistItem.name, Validators.required],
        items: this.fb.array(
          this.checklistItem.items.map((i) =>
            this.fb.control(i.value, Validators.required)
          )
        )
      });
    } else {
      this.checklistForm = this.fb.group({
        name: [null, Validators.required],
        items: this.fb.array([this.fb.control(null, Validators.required)])
      });
    }

    this.checklistForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((value: ChecklistItem) => {
        this.onChange(value);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }

  public writeValue(value: ChecklistItem): void {
    if (value) {
      this.checklistForm = this.fb.group({
        name: [this.checklistItem.name, Validators.required],
        items: this.fb.array(
          this.checklistItem.items.map((i) =>
            this.fb.control(i.value, Validators.required)
          )
        )
      });
    }
  }

  public registerOnChange(fn: (value: ChecklistItem) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (value: ChecklistItem) => void): void {
    this.onTouched = fn;
  }

  public addNewValueInput(): void {
    const newValueControl: FormControl = this.fb.control(
      null,
      Validators.required
    );
    this.items.push(newValueControl);
  }

  public removeValueInput(index: number): void {
    this.items.removeAt(index);
  }

  public validate(): ValidationErrors {
    return this.checklistForm.valid
      ? null
      : { checklistForm: { valid: false } };
  }
}
