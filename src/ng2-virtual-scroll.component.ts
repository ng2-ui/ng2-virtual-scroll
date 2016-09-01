import {
  Directive, Input, EventEmitter, ViewChild, ViewContainerRef, Component, ComponentMetadata,
  ComponentFactoryResolver, Compiler
} from '@angular/core';
import { elementVisible } from 'ng2-utils/index';
import { Ng2VirtualScrollPageComponent } from "./ng2-virtual-scroll-page.component";
import { Ng2VirtualScrollBottomComponent } from "./ng2-virtual-scroll-bottom.component";
import {ViewCompiler} from "@angular/compiler/src/view_compiler/view_compiler";

@Directive({
  selector: '[ng2-virtual-scroll]'
})
export class Ng2VirtualScrollDirective {

  @Input('remote-url') remoteUrl: string;
  @Input('page-variation') pageVariation: any;
  @Input('page-template') pageTemplate: string;

  el: HTMLElement;
  scrollSpyedElements: HTMLElement[] = [];

  pageComponents: any = {};

  constructor(
    public  viewContainerRef: ViewContainerRef,
    private compiler: Compiler
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('scroll', this.scrollListener);

    this.addNg2VSBottomComponent();
    this.scrollListener(null);
  }

  scrollListener = event => {
    let elVisible: HTMLElement = null;
    for (let i = 0; i < this.scrollSpyedElements.length; i++) {
      let scrollSpyedElement = <HTMLElement>this.scrollSpyedElements[i];
      let visible = elementVisible(scrollSpyedElement, this.el);
      if (visible.top || visible.bottom) {
        elVisible = scrollSpyedElement;
        break;
      }
    }
    if (elVisible && elVisible.tagName == "NG2-VS-BOTTOM") {
        this.addAPage();
    } else if (elVisible && elVisible.tagName == "NG2-VS-PAGE") {
      let pageComponent: Ng2VirtualScrollPageComponent = this.pageComponents[elVisible.id];
      pageComponent.loadData(this.remoteUrl, this.pageVariation);
    }
  };

  addAPage(): void {
    console.log('#addAPage');
    this.addNg2VSPageComponent(this.pageTemplate);
  }

  addNg2VSBottomComponent(): void {
    let factory = this.compiler.compileComponentSync(Ng2VirtualScrollBottomComponent);
    let componentRef = this.viewContainerRef.createComponent(factory);
    let component = componentRef.instance;
  }

  addNg2VSPageComponent(template: string): void {
    @Component({selector: 'ng2-vs-page', template: template })
    class Ng2VSPageComponent extends Ng2VirtualScrollPageComponent {}

    let factory = this.compiler.compileComponentSync(Ng2VSPageComponent);

    let componentRef = this.viewContainerRef.createComponent(factory);
    let component = componentRef.instance;

    component.remoteUrl = this.remoteUrl;
    //TODO: replace remote url with pageVariation

    this.pageComponents['page1'] = componentRef;
  }

}
