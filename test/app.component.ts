import { Component } from '@angular/core'
import { Ng2VirtualScroll } from 'ng2-virtual-scroll';

@Component({
  selector: 'my-app',
  template: `Hello {{world}}`,
  directives: [Ng2VirtualScroll]
})
export class AppComponent {
}
