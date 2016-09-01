import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';

import { Ng2VirtualScrollComponent } from './ng2-virtual-scroll.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [Ng2VirtualScrollComponent],
  exports: [ Ng2VirtualScrollComponent]
})
export class Ng2VirtualScrollModule {}