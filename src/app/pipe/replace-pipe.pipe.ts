import { PipeTransform, Injectable, Pipe }     from '@angular/core';
@Pipe({
  name: 'IDR'
})
@Injectable()
export class ReplacePipe implements PipeTransform {
  constructor(){}
  transform(item: any): any {
    if(item == null) return "";
    item = item.replace(/,/g, '.');

    // item = item.replace(/.00/g, ',00');

    item = item.substring(0, item.length - 3) + ',' + item.substring(item.length - 3 + 1);
    return item;
  }
}


