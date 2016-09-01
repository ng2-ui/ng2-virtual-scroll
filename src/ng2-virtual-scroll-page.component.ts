import {Component, ViewContainerRef, ElementRef} from '@angular/core'
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'ng2-vs-page',
  template: `
     Ng2VirtualScrollPageComponent ......
  `
})
export class Ng2VirtualScrollPageComponent {
  remoteUrl: string;
  data: any[];
  id: string;

  loadData(remoteUrl: string): Observable {
    console.log('loading data', remoteUrl);
    return Observable.of([
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
      {a:1, b:2, c:3, d:4, e:5, f:6},
    ]);
  }

  reloadData() {
    console.log('reloading data', this.id);
  }
  emptyDOM() {
    console.log('emptying DOM', this.id);
  }
}
