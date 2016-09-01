import {
  Input, EventEmitter, ViewChild, ViewContainerRef, Component, ComponentMetadata,
  ComponentFactoryResolver, Compiler, ElementRef
} from '@angular/core';
import { elementVisible } from 'ng2-utils/index';
import { Ng2VirtualScrollPageComponent } from "./ng2-virtual-scroll-page.component";
import {ViewCompiler} from "@angular/compiler/src/view_compiler/view_compiler";

@Component({
  selector: 'ng2-virtual-scroll, [ng2-virtual-scroll]',
  template: `
    <div id="ng2-vs-bottom" #bottom>bottom</div>
  `
})
export class Ng2VirtualScrollComponent {

  @Input('remote-url') remoteUrl: string;       // e.g. http://my.remote.url.com/path/to/data?page=:page`
  @Input('page-variation') pageVariation: any;  // e.g., {page: 1}
  @Input('page-template') pageTemplate: string;

  @ViewChild('bottom', { read: ViewContainerRef }) bottom;

  el: HTMLElement;                         // this directive element
  containerElToScrollSpy: any;             // this element or window element
  scrollSpiedElements: HTMLElement[] = []; // bottom element and page elements
  pageComponents: any = {};                // component instances assigned to page elements
  lastPageParams: any;                     // the last page params
  currentlyVisiblePageEl: HTMLElement;     // currently visible element

  constructor(
    public  viewContainerRef: ViewContainerRef,
    private compiler: Compiler
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    //initialize lastPageParams
    this.lastPageParams = Object.assign({}, this.pageVariation);
    for(var key in this.lastPageParams) {
      this.lastPageParams[key] = 0;
    }

    //add scroll listener
    let thisElStyle = window.getComputedStyle(this.el);
    this.containerElToScrollSpy = thisElStyle.getPropertyValue('overflow') === 'auto' ? this.el : window;
    this.containerElToScrollSpy.addEventListener('scroll', this.scrollListener);

    //add bottom to scroll-spied
    this.scrollSpiedElements.push(this.bottom.element.nativeElement);
    this.scrollListener(null);
  }

  scrollListener = event => {
    let elVisible: HTMLElement = null;
    for (let i = 0; i < this.scrollSpiedElements.length; i++) {
      let scrollSpiedElement = <HTMLElement>this.scrollSpiedElements[i];
      let visible = elementVisible(scrollSpiedElement, this.containerElToScrollSpy);
      if (visible.top || visible.bottom) {
        elVisible = scrollSpiedElement;
        break;
      }
    }
    if (elVisible && elVisible.id === "ng2-vs-bottom") {
      this.addNg2VSPageComponent(this.pageTemplate);
    } else if (elVisible && elVisible.tagName == "NG2-VS-PAGE") {
      if (elVisible !== this.currentlyVisiblePageEl) {
        if (this.currentlyVisiblePageEl) {
          let hiddenElId = this.currentlyVisiblePageEl.id;
          let hiddenElComponent = this.pageComponents[hiddenElId];
          hiddenElComponent.emptyDOM();
        }

        this.currentlyVisiblePageEl = elVisible;
        let visibleElComponent = this.pageComponents[this.currentlyVisiblePageEl.id];
        visibleElComponent.reloadData();
      }
    }
  };

  addNg2VSPageComponent(template: string): void {
    @Component({selector: 'ng2-vs-page', template: template })
    class Ng2VSPageComponent extends Ng2VirtualScrollPageComponent {}

    // add a new page before the bottom
    let factory = this.compiler.compileComponentSync(Ng2VSPageComponent);
    let componentRef = this.bottom.createComponent(factory);
    let component = componentRef.instance;
    //move bottom element to the bottom of the container, so that we can always append to the bottom
    let bottomEl = this.bottom.element.nativeElement;
    bottomEl.parentNode.appendChild(bottomEl);

    // generate id
    let pageEl = componentRef.location.nativeElement;
    let firstKey = Object.keys(this.lastPageParams)[0];
    let pageElId = firstKey + this.lastPageParams[firstKey];

    // fill the page component with data
    let remoteUrl = this.getNextPageRemoteUrl();
    component.id = pageElId;
    component.loadData(remoteUrl).subscribe(resp => {
      component.data = resp;
    });

    //add this page to be scroll-spied
    pageEl.setAttribute('id', pageElId);
    this.pageComponents[pageElId] = component;
    this.scrollSpiedElements.push(pageEl);
  }

  // remoteUrl:         https://remote.url.com/path/to/data?page=:page&offset=:offset
  // pageVariation:     {page:1, offset: 10}
  // lastPageParams:    {page:6, offset: 60}
  private getNextPageRemoteUrl() {
    let nextPageParams = this.lastPageParams;
    let remoteUrl = this.remoteUrl;
    for(var key in nextPageParams) {
      nextPageParams[key] +=  this.pageVariation[key];
      remoteUrl = remoteUrl.replace(':'+key, nextPageParams[key]);
    }
    this.lastPageParams = nextPageParams;
    return remoteUrl;
  }

}
