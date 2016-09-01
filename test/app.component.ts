import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  template: `
    <div ng2-virtual-scroll
      remote-url="more.json?page=:page&offset=:offset"
      [page-template]="pageTemplate"
      [page-variation]="{page: 1, offset: 10}">
    </div>
  `,
  styles: [`
    div[ng2-virtual-scroll] {
      border: 1px solid #ccc;
    }
  `]
})
export class AppComponent {
  pageTemplate=`
    <ul>
      <li *ngFor="let row of data">
        <p>{{row.a}}
        <p>{{row.b}}
        <p>{{row.c}}
        <p>{{row.d}}
        <p>{{row.e}}
        <p>{{row.f}}
      </li>
    </ul>
  `;
}
