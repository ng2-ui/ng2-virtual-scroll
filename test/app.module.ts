import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from "@angular/forms";

import { AppComponent }   from './app.component';
import { Ng2VirtualScrollModule }  from 'ng2-virtual-scroll';

@NgModule({
  imports: [BrowserModule, FormsModule, Ng2VirtualScrollModule],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
