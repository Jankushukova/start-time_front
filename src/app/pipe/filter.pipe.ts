import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, pattern: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    if (pattern === 'owner' ||  pattern === 'user') {
      return items.filter(it => {
        return it[pattern].getFullName().toLocaleLowerCase().includes(searchText);
      });
    }
    return items.filter(it => {
      return it[pattern].toString().toLocaleLowerCase().includes(searchText);
    });
  }

}
