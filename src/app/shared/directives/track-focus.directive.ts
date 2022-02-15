import { Directive, HostListener, HostBinding } from '@angular/core';
@Directive({
    selector: '[trackFocus]'
})
export class TrackFocusDirective {
    @HostBinding('class.my-focused-element') isFocused: boolean;
    constructor() { }

    @HostListener('focus', ['$event']) onFocus(e) {
        this.isFocused = true;
    }
    @HostListener('blur', ['$event']) onblur(e) {
        this.isFocused = false;
    }
}