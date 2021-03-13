import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Calendar } from './calendar.model';
import { MatRadioChange } from '@angular/material/radio';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CalendarData, UserCalendarData } from '../data-model/calendar-data.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/authentication.service';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();
console.log(sessionStorage.getItem("user_id"));
export interface EventList {
  0: [{
    id: string;
    title: string;
    start: any;
    end: any;
    className: string;
    groupId: string;
    details: string;
  }];
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  public eventList: EventList[];
  filterOptions = "All";
  calendarData: any;
  dialogData: any;

  public filters = [
    { name: 'all', value: 'All', checked: 'true' },
    { name: 'work', value: 'Work', checked: 'false' },
    { name: 'personal', value: 'Personal', checked: 'false' },
    { name: 'important', value: 'Important', checked: 'false' },
    { name: 'travel', value: 'Travel', checked: 'false' },
    { name: 'friends', value: 'Friends', checked: 'false' }
  ];



  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<any>;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  todaysEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private http: HttpClient,
    public authService: AuthService,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar) {
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createContactForm(this.calendar);

  }

  public ngOnInit(): void {

    this.events();
  }

  createContactForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
      category: [calendar.category],
      mode: [calendar.mode],
      startDate: [calendar.startDate,
      [Validators.required]
      ],
      endDate: [calendar.endDate,
      [Validators.required]
      ],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
    });
  }

  addNewEvent() {

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.addCusForm.reset();
        this.ngOnInit();
    });
  }


  eventClick(row) {
    
    console.log(row.event);
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.start,
      mode: row.event.extendedProps.mode,
      details: row.event.extendedProps.details,
      event_id: row.event.extendedProps.event_id
    };
    // console.log(calendarData);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addCusForm.reset();
        this.ngOnInit();
    });
  }
  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }
  handleEventRender(info) {
    // console.log(info)
    // this.todaysEvents = this.todaysEvents.concat(info);
  }
  changeCategory(e: MatRadioChange) {
    this.filterOptions = e.value;
    this.calendarEvents = this.tempEvents;
    this.calendarEvents.forEach(function (element, index) {
      if (this.filterOptions !== "all" && this.filterOptions.toLowerCase() !== element.groupId) {
        this.filterEvent(element);
      }
    }, this);

  }
  filterEvent(element) {
    this.calendarEvents = this.calendarEvents.filter(item => item !== element);
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  public randomIDGenerate(length, chars) {
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  getClassNameValue(category) {
    let className: string;

    if (category === "work")
      className = "fc-event-success"
    else if (category === "personal")
      className = "fc-event-warning"
    else if (category === "important")
      className = "fc-event-primary"
    else if (category === "travel")
      className = "fc-event-danger"
    else if (category === "friends")
      className = "fc-event-info"

    return className;
  }
  createModel(x: EventList) {
    console.log(x[0]);
  }
  events(): any {
    const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
    const calendarData: UserCalendarData = { authorization: authorization, user_id: sessionStorage.getItem("user_id") };
    console.log(calendarData);
    var list;
    // return this.httpClient.post<any>(environment.apiBaseURL + 'calendar/get_all', calendarData);
    this.httpClient.post<any>(environment.apiBaseURL + 'calendar/get_all', calendarData)
      .subscribe(
        (data) => {
          this.calendarEvents = data.result;
          // console.log(data.result);

          this.tempEvents = this.calendarEvents;
          list = data.result.map(function (dd) {
            return {
              id: dd.schedule_id,
              title: dd.title,
              start: dd.issuedDt,
              end: dd.issuedDt,
              className: dd.classN,
              groupId: dd.category,
              details: dd.details,
              mode: dd.mode,
              event_id: dd.event_id
            };
          });
          // console.log(list);

          this.calendarEvents = list;
          this.tempEvents = this.calendarEvents;
        }
      );
  }
  onLogout() {
    //alert("yss");
    sessionStorage.clear();
    this.authService.logout()
      .subscribe(success => {
        console.log(success);
        if (success) {
          
        }
      });
  }
}
