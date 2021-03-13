import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calendar } from './calendar.model';
import { CalendarData, UserCalendarData } from '../data-model/calendar-data.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CalendarService {
    private readonly API_URL = 'assets/data/calendar.json';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    dataChange: BehaviorSubject<Calendar[]> = new BehaviorSubject<Calendar[]>(
        []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    constructor(private httpClient: HttpClient) { }
    get data(): Calendar[] {
        return this.dataChange.value;
    }
    getDialogData() {
        return this.dialogData;
    }
    getAllCalendars(): Observable<Calendar[]> {
        return this.httpClient.get<Calendar[]>(this.API_URL)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    getAllEvents(): void {
        const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
        const calendarData: UserCalendarData = { authorization: authorization, user_id: sessionStorage.getItem("user_id") };
        console.log(calendarData);
        this.httpClient.post<any>(environment.apiBaseURL + 'calendar/get_all', calendarData)
            .subscribe(
                (data) => {
                    console.log(data.result);
                    this.dataChange.next(data.result);
                }
            );
    }

    addEvent(calendar: Calendar, checkedIDs: any, sdate:any, ndate:any): Observable<Boolean> {
        try {
            this.dialogData = calendar;
            const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
            const calendarData: CalendarData = { id:0,event_id: calendar.event_id, title: calendar.title, category: calendar.category, mode: calendar.mode, classN: "nothing", details: calendar.details, startDate: sdate, endDate: ndate, authorization: authorization, user_id: sessionStorage.getItem("user_id"), days: checkedIDs };
            console.log(calendarData);
            return this.httpClient.post<any>(environment.apiBaseURL + 'calendar/add_event', calendarData);
        } catch (error) {
            console.log(error);
        }

    }

    updateEvent(id:any,calendar: Calendar, checkedIDs: any, sdate:any, ndate:any): Observable<Boolean> {
        try {
            this.dialogData = calendar;
            const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
            const calendarData: CalendarData = { id:id,event_id: calendar.event_id, title: calendar.title, category: calendar.category, mode: calendar.mode, classN: "nothing", details: calendar.details, startDate: sdate, endDate: ndate, authorization: authorization, user_id: sessionStorage.getItem("user_id"), days: checkedIDs };
            console.log(calendarData);
            return this.httpClient.post<any>(environment.apiBaseURL + 'calendar/update_event', calendarData);
        } catch (error) {
            console.log(error);
        }

    }

    addUpdateCalendar(calendar: Calendar): void {
        this.dialogData = calendar;
    }
    deleteCalendar(id:any,calendar: Calendar): any {
        //console.log(calendar);
        this.dialogData = calendar;
        const authorization = { Authorization: `${sessionStorage.getItem("authorization")}` };
        const calendarData: CalendarData = { id:id,event_id: calendar.event_id, title: calendar.title, category: calendar.category, mode: calendar.mode, classN: "nothing", details: calendar.details, startDate: calendar.startDate, endDate: calendar.endDate, authorization: authorization, user_id: sessionStorage.getItem("user_id"), days: "" };
        console.log(calendarData);
        return this.httpClient.post<any>(environment.apiBaseURL + 'calendar/delete_event', calendarData);
    }
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
