import { Directive, HostListener, Inject, Input } from '@angular/core';

import { SidebarLinkDirective } from "./sidebar-link.directive";

@Directive({
  selector: "[appSidebarAnchorToggle]",
})
export class SidebarAnchorToggleDirective {
  protected navlink: SidebarLinkDirective;
  @Input()
  public onClickCallback: any;

  constructor(@Inject(SidebarLinkDirective) navlink: SidebarLinkDirective) {
    this.navlink = navlink;
  }

  @HostListener("click", ["$event"])
  async onClick() {
    var source = this;
    if (this.onClickCallback && !this.navlink.open) {
      await this.onClickCallback();
      source.navlink.toggle();
    } else source.navlink.toggle();
  }
}
