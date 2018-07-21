import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filter'})
export class Filter implements PipeTransform {

    transform(items: any, filter: any): any {
        if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          
            return items.filter(item =>
                filterKeys.reduce((memo, keyName) =>
                    (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
          
      }
    }
/*
    transform(items: any, filter: any, isAnd: boolean): any {
        if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          if (isAnd) {
            return items.filter(item =>
                filterKeys.reduce((memo, keyName) =>
                    (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
          } else {
            return items.filter(item => {
              return filterKeys.some((keyName) => {
                console.log(keyName);
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
              });
            });
          }
        } else {
          return items;
        }
      }*/
  /*transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
    return items.filter(item => {
            let notMatchingField = Object.keys(filter).find(key => item[key] !== filter[key]);
            return !notMatchingField; // true if matches all fields
        });
    }*/
}