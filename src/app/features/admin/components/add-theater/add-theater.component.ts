import { Component, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FieldConfig } from './../../../../interfaces/field.interface';
import { DynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTheaterComponent {
  // newTheater = this.fb.group({
  //   tid: ['', Validators.required],
  //   name: ['', Validators.required],
  //   city: ['', Validators.required],
  //   gLocation: ['', Validators.required],
  //   capacity: ['', Validators.required]
  // });

  // @Output() addTheater = new EventEmitter();
  // @ViewChild('successDialog') successDialog: TemplateRef<any>;

  // constructor(private fb: FormBuilder, private matDialog: MatDialog) {}

  // ngOnInit() {}
  // onSubmit() {
  //   if (this.newTheater.valid) {
  //     this.matDialog.open(this.successDialog);
  //     this.addTheater.emit(this.newTheater.value);
  //   }
  // }
  // dialogOk() {
  //   this.newTheater.reset();
  //   this.matDialog.closeAll();
  // }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @Output() addTheater = new EventEmitter();
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  public submittedForm: any = {};

  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Theater ID',
      inputType: 'text',
      name: 'theatreId',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Theatre id'
        }
      ]
    },
    {
      type: 'input',
      label: 'Theatre Name',
      inputType: 'text',
      name: 'theatreName',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Theatre name is required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }
      ]
    },
    {
      type: 'input',
      label: 'City',
      inputType: 'text',
      name: 'City',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'City Required'
        }
      ]
    },
    {
      type: 'input',
      label: 'G-Location path',
      inputType: 'text',
      name: 'GLocationpath',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'GLocationpath Required'
        }
      ]
    },
    {
      type: 'input',
      label: 'Capacity',
      inputType: 'number',
      name: 'Capacity',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Capacity Required'
        }
      ]
    },
    {
      type: 'button',
      label: 'Submit'
    }
  ];

  constructor(private router: Router, private matDialog: MatDialog) {}


  public submit(event: any): void {
    console.log('Event :', event);
    this.submittedForm = event;
    this.addTheater.emit(this.submittedForm);
    this.matDialog.open(this.successDialog);
  }

  dialogOk() {
    this.matDialog.closeAll();
    this.router.navigateByUrl('/home');
  }

}
