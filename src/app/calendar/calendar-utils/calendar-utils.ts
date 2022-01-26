import { Injectable } from '@angular/core';
import { CalendarUtils } from 'angular-calendar';
import { endOfMonth, startOfMonth, subWeeks } from 'date-fns';
import { GetMonthViewArgs, MonthView } from 'calendar-utils';

@Injectable()
export class CustomCalendarUtils extends CalendarUtils {
  getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = startOfMonth(args.viewDate);
    args.viewEnd = endOfMonth(args.viewDate);

    const used = args.viewStart?.getDay() + args.viewEnd?.getDate();
    if (Math.ceil(used / 7) > 5) {
      args.viewEnd = subWeeks(args.viewEnd, 1);
    }
    return super.getMonthView(args);
  }
}
