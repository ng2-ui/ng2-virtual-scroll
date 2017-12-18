# ng2-virtual-scroll
virtual scroll, each page is only rendered when it's in viewport

## IMPORTANT: NOT-MAINTAINED
Accepting volunteers and ready to transfer ownership.

1. install ng2-virtual-scroll

    npm install ng2-virtual-scroll --save

2. update `systemjs.config.js`

        map['ng2-virtual-scroll'] = 'node_modules/ng2-virtual-scroll/dist';
        packages['ng2-virtual-scroll'] = { main: 'index.js', defaultExtension: 'js' }

3. import Ng2VirtualScrollModule to your AppModule

        import { NgModule } from '@angular/core';
        import { FormsModule } from "@angular/forms";
        import { BrowserModule  } from '@angular/platform-browser';
        import { AppComponent } from './app.component';
        import { Ng2VirtualScrollModule } from 'ng2-virtual-scroll';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, Ng2VirtualScrollModule],
          declarations: [AppComponent],
          bootstrap: [ AppComponent ]
        })
        export class AppModule { }

         
For full example, please check out `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.

## **ng2-ui** welcomes new members and contributors

This module is only improved and maintained by contributors like you.

As a contributor, it's NOT required to be skilled in Javascript nor Angular2. 
You are only to be open-minded and interested in helping others.
As a contributor, you do following;

  * Updating README.md
  * Improving code comments
  * Answering issues and building FAQ
  * Documentation
  * Translation

In result of your active contribution, you will be listed as a core contributor
on https://ng2-ui.github.io, and a member of ng2-ui too.

If you are interested in becoming a contributor and/or a member of ng-ui,
please send an email to `allenhwkim AT gmail.com` with your github id. 


## How It Works

         .......................                     ----                      
         .                     .                       ^   
         .        page 1       .                       |   
         .                     .                       |   
         .......................                       | 
      +---------------------------+                       
      |  .        page 2       .  ^              scrollable area
      |  .                     .  |                     
      |  .......................  | viewport           |
      |  .                     .  |                    | 
      |  .        page 3       .  v                    | 
      +---------------------------+                    | 
         .......................                       | 
         .                     .                       | 
         .        page 4       .                       | 
         .                     .                       | 
         .......................                       | 
         .        bottom       .                       |
         .......................                     __V___
     

 When it is initialized, it registers thie bottom of the scorllable area 
 as scroll-spied section, so that when the viewport reaches to the bottom,
 it loads a new page.
 
 When page is loaded with data, it also register the new page as scroll-spied section,
 so that when it is outside of the viewport, it empty the page not to do DOM 
 rendering for better permoance.
 
 A scroll-spied page gets into the viewport, it does all DOM rendering with data again.
 By doing this way, DOM is only rendered when users see the page.
 
 ## Technical Note
 
 There are three components to make the virtual scroll to work;
 
 1. `ng2-virtual-scroll`
     * properties
       - scrollSpyedElements
        
     * inputs
        - `remote-url`      e.g. http://remote.url.com/path/to/data.json?limit=10&offset=:offset
        - `page-variations` e.g., {page: 1}, or {offset: 10}
        
     1) `ng2-vs-bottom`
     
        * properties
          - endOfData
          - loading
          
     2) `ng2-vs-page`
     
        * properties
           - data
           - offset
           - limit
           - pageNum
           - url
           - height
           
 ### Initial loading
     <ng2-vs-bottom>
     set endOfData as false
     set loading as true

     <ng2-vs-page>
     1. properties; offset, pageNum, limit
     2. data; [item1, item2, item3 ....]
     3. height; 500px
     4. inViewport = true
     
     register <ng2-vs-page> as scroll-spied element with page id
     
### Load a single page when viewport reaches to bottom

     <ng2-vs-page>
     1. properties
     2. data
     3. height
     4. inViewport = true

     register <ng2-vs-page> as scroll-spied element with page id
     
### When a page is out of viewport, make the page empty

     <ng2-vs-page>
     1. properties
     2. data
     3. height
     4. inViewport = false
     
### DOM Re-rendering when a page gets into viewport

     <ng2-vs-page>
     1. properties
     2. data
     3. height
     4. inViewport = true

### End-of-data when a remote server returns no data.

     <ng2-vs-bottom>
     set endOfData as true
     
