import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: "[appDynamicTemplate]",
})
export class DynamicTemplateDirective implements OnInit {
  @Input() public title: string;
  constructor(public template: TemplateRef<any>, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cdr.detectChanges();
  }
}