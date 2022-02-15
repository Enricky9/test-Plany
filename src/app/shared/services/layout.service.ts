import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  private helpCenter = new Subject<boolean>();

  private iniciatives = new Subject<boolean>();

  private toggleSidebar = new Subject<boolean>(); // small screen
  private overlaySidebarToggle = new Subject<boolean>();
  private toggleNotiSidebar = new Subject<boolean>();

  // Observable
  toggleSidebar$ = this.toggleSidebar.asObservable();
  overlaySidebarToggle$ = this.overlaySidebarToggle.asObservable();
  toggleNotiSidebar$ = this.toggleNotiSidebar.asObservable();
  toggleHelpCenter$ = this.helpCenter.asObservable();
  
  toggleSidebarSmallScreen(toggle: boolean) {
    this.toggleSidebar.next(toggle);
  }

  overlaySidebartoggle(toggle: boolean) {
    this.overlaySidebarToggle.next(toggle);
  }

  toggleNotificationSidebar(toggle: boolean) {
    this.toggleNotiSidebar.next(toggle);
  }

  toggleHelpCenter(toggle: boolean) {
    this.helpCenter.next(toggle);
  }


}
