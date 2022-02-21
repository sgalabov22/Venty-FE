import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  pure: true
})
export class CapitalizeFirstPipe implements PipeTransform {
  public transform(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
