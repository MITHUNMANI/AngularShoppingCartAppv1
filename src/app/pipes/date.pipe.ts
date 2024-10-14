import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {
  transform(value: any | Date, format: string = 'mediumDate'): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return value;
    }
    const options: Intl.DateTimeFormatOptions = {};
    switch (format) {
      case 'short':
        options.year = 'numeric';
        options.month = 'numeric';
        options.day = 'numeric';
        break;
      case 'medium':
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
        break;
      case 'long':
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        break;
      default:
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}