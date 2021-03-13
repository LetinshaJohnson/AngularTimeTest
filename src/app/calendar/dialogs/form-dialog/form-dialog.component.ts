import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Calendar } from '../../calendar.model';
import { formatDate } from '@angular/common';
export interface CheckLst {
  id: string;
  label: string;
  isChecked: boolean;
  subtasks?: CheckLst[];
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  showDeleteBtn = false;
  checkMode: string;


  selectedItemsList = [];
  checkedIDs = [];
  public checkboxesDataList: CheckLst = {
    id: 'All',
    label: 'All',
    isChecked: false,
    subtasks: [
      {
        id: '0',
        label: 'Sunday',
        isChecked: false
      },
      {
        id: '1',
        label: 'Monday',
        isChecked: false
      },
      {
        id: '2',
        label: 'Tuesday',
        isChecked: false
      },
      {
        id: '3',
        label: 'Wednesday',
        isChecked: false
      },
      {
        id: '4',
        label: 'Thursday',
        isChecked: false
      },
      {
        id: '5',
        label: 'Friday',
        isChecked: false
      },
      {
        id: '6',
        label: 'Saturday',
        isChecked: false
      }
    ]
  };


  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.checkboxesDataList.subtasks != null && this.checkboxesDataList.subtasks.every(t => t.isChecked);
    //this.fetchSelectedItems();
  }

  someComplete(): boolean {
    if (this.checkboxesDataList.subtasks == null) {
      return false;
    }
    return this.checkboxesDataList.subtasks.filter(t => t.isChecked).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.checkboxesDataList.subtasks == null) {
      return;
    }
    this.checkboxesDataList.subtasks.forEach(t => t.isChecked = completed);
  }

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {

    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      console.log(data.calendar);
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'New Event';
      this.calendar = new Calendar({});
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  checkList(st) {
    this.checkMode = st;
    console.log(this.checkMode);
  }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      event_id: [this.calendar.event_id],
      title: [
        this.calendar.title,
        [Validators.required]
      ],
      dayArray: [],
      category: [this.calendar.category],
      startDate: [this.calendar.startDate,
      [Validators.required]
      ],
      endDate: [this.calendar.endDate,
      [Validators.required]
      ],
      details: [
        this.calendar.details],
    });
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    console.log(this.calendarForm.getRawValue());
    //this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.calendarService.deleteCalendar(this.calendar.id,this.calendarForm.getRawValue())
      .subscribe(success => {
        if (success.response === 'Success') {
          this.showNotification(
            'snackbar-danger',
            'Deleted Successfully...!!!',
            'bottom',
            'center'
          );
        } else {
          this.showNotification(
            'black',
            'Cannot Delete!!!',
            'bottom',
            'center'
          );
        }
      });
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmsAdd(): void {
    console.log(this.calendarForm.getRawValue());
    // this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    // this.dialogRef.close('submit');
  }

  public confirmAdd(): void {

    this.checkedIDs = []
    this.checkboxesDataList.subtasks.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
    let sttm = formatDate(this.calendarForm.value.startDate, 'HH:mm:ss', 'en') || '';
    let stdt = formatDate(this.calendarForm.value.startDate, 'yyyy-MM-dd', 'en') || '';
    let ndtm = formatDate(this.calendarForm.value.endDate, 'HH:mm:ss', 'en') || '';
    let nddt = formatDate(this.calendarForm.value.endDate, 'yyyy-MM-dd', 'en') || '';
    console.log(ndtm);
    let sdate = stdt + ', ' + sttm;
    let ndate = nddt + ', ' + ndtm;
    if (this.action === 'edit') {
      this.calendarService.updateEvent(this.calendar.id,this.calendarForm.getRawValue(), this.checkedIDs, sdate, ndate)
        .subscribe(success => {
          console.log(success);
          if (success) {
            this.showNotification(
              'snackbar-success',
              'Updated Successfully...!!!',
              'bottom',
              'center'
            );
            this.dialogRef.close();
          } else {
            this.showNotification(
              'black',
              'Cannot Update!!!',
              'bottom',
              'center'
            );
          }
        });
    } else {
      this.calendarService.addEvent(this.calendarForm.getRawValue(), this.checkedIDs, sdate, ndate)
        .subscribe(success => {
          console.log(success);
          if (success) {
            this.showNotification(
              'snackbar-success',
              'Added Successfully...!!!',
              'bottom',
              'center'
            );
            this.dialogRef.close();
          } else {
            this.showNotification(
              'black',
              'Cannot Add!!!',
              'bottom',
              'center'
            );
          }
        });
    }

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
