# ng2-virtual-scroll
virtual scroll, each page is only rendered when it's in viewport

## How It Works

### Initial loading
 
     register <ng2-vs-bottom> as scroll-spied element
     
     <ng2-vs-bottom>
     set endOfData as false
     set loadign as true

     <ng2-vs-page>
     1. properties; offset, pageNum, limit)
     2. data; [item1, item2, item3 ....]
     3. height; 500px
     4. inViewport = true
     
     register <ng2-vs-page> as scroll-spied element with page id
     
### More loading when scrolling reaches to bottom

     <ng2-vs-page>
     1. properties
     2. data
     3. height
     4. inViewport = true

     register <ng2-vs-page> as scroll-spied element with page id
     
### Less DOM rendering when a page gets out of viewport

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
     
