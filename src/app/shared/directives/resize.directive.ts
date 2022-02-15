import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

@Directive({
    selector: '[resize]',
})
export class ResizeDirective implements OnInit, OnDestroy {
    private resizeSensor: ResizeSensor;

    constructor(private readonly element: ElementRef) { }

    ngOnInit(): void {

        if (ResizeSensor) {
            this.resizeSensor = new ResizeSensor(
              this.element.nativeElement,
              () => {
                window.dispatchEvent(new Event("resize"));
              }
            );
        }
    }

    ngOnDestroy(): void {
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
    }
}