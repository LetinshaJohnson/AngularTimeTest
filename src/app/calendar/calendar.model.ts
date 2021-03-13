import { formatDate } from '@angular/common';
export class Calendar {
    event_id: number;
    id: number;
    title: string;
    category: string;
    mode: string;
    classN: string;
    startDate: string;
    endDate: string;
    details: string;


    constructor(calendar) {
        {
            this.event_id = calendar.event_id || this.getRandomID();
            this.id = calendar.id || 0;
            this.title = calendar.title || '';
            this.category = calendar.category || '';
            this.classN = calendar.classN || 'nothing';
            this.mode = calendar.mode || '';
            this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.details = calendar.details || '';
        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
    }
}
