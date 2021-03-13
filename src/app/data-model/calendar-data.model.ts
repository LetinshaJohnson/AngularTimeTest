export class CalendarData {
    id:number;
    event_id: number;
    user_id: string;
    title: string;
    category: string;
    mode: string;
    classN: string;
    startDate: string;
    endDate: string;
    details: string;
    days:any;
    authorization: any;
}

export class UserCalendarData {
    user_id: string;
    authorization: any;
}