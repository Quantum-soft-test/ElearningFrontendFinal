import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let stars = '';
    for (let i = 0; i < value; i++) {
      stars += '★';  
    }
    for (let i = value; i < 5; i++) {
      stars += '☆'; 
    }
    return stars;
  }
}
