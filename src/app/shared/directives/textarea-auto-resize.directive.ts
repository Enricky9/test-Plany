import { Directive, HostListener, ElementRef, OnInit, NgModule, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: "[appTextareaAutoresize]",
})
export class TextareaAutoresizeDirective implements OnInit, OnChanges {
  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  @HostListener(":input")
  onInput() {
    this.resize();
  }

  ngOnInit() {    
    setTimeout(() => this.resize(), 0);
  }

  resize() {
    var size = this.elementRef.nativeElement.scrollHeight;
    this.elementRef.nativeElement.style.overflow = "hidden";
    this.elementRef.nativeElement.style.height = "0";
    this.elementRef.nativeElement.style.height = size + "px";
    //this.cdr.detectChanges();
  }
}

@NgModule({
    declarations: [TextareaAutoresizeDirective],
    exports: [TextareaAutoresizeDirective]
})

export class TextareaAutoresizeModule { }