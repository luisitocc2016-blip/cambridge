import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {
  transform(value: any[]): any[] {
    console.log(value);
    
    if (!Array.isArray(value)) return value;
    return value.filter((item, index, arr) => arr.indexOf(item) === index);
  }
}