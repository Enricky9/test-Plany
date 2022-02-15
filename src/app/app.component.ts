import {
  Component,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

export let browserRefresh = false;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private router: Router,    
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event != null && event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      } else if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
      }      
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
