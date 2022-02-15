import {
  Component, OnInit, ViewChild, OnDestroy,
  ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, Input, TemplateRef, EventEmitter, QueryList, ChangeDetectionStrategy
} from "@angular/core";

import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { customAnimations } from "../animations/custom-animations";
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../services/layout.service';
import { NgbActiveModal, NgbDropdown, NgbModal, NgbModule, NgbNavChangeEvent, NgbNavItem } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";


import { LISTITEMS } from '../data/template-search';


declare var initiateCallChat: Function;
declare var destroyChat: Function;

@Component({
  selector: "app-sidebar",
  templateUrl: "./vertical-menu.component.html",
  styleUrls: ["./vertical-menu.component.scss"],
  animations: customAnimations,
})
export class VerticalMenuComponent
  implements OnInit, AfterViewInit, OnDestroy, NgbModule
{
  
  @Input()
  public listTemplate: TemplateRef<any>;

  level: number = 0;
  logoUrl = "assets/img/logo.png";
  logoUrlEnd = "assets/img/logo-dark-fulll.png";

  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout;
  userFullNameText: string = "";
  userShortName: string = "";
  userEmailText: string = "";
  userImage: string = "assets/img/portrait/small/avatar-s-1.png";
  companyPlanningText: string = "";

  [x: string]: any;
  public isCollapsed = true;
  showLoadingDel = {};
  showLoadingRead = {};
  showLoadingAllDel = false;
  showLoadingAllRead = false;
  notificationCount: number = 0;
  notificationSub: Subscription;
  isSmallScreen = false;
  listItems = [];
  control = new FormControl();

  constructor(
    private router: Router,
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,    
    private modalService: NgbModal,    
    public activeModal: NgbActiveModal
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }

  role: string;
  activeId: any;
  destroyOnHide: any;
  orientation: "vertical";
  roles: false | "tablist";

  ngOnInit() {
    this.listItems = LISTITEMS;

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }    
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    var source = this;
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;          
        }
      }
    );    

    this.loadLayout();
    this.cdr.detectChanges();   
  }

  

  

  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(
      (() => {
        this.innerWidth = event.target.innerWidth;
        this.loadLayout();
      }).bind(this),
      500
    );
  }

  loadLayout() {
    this.logoUrl = "assets/img/logo.png";
  }

  toggleSidebar(disregard) {    
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;

    if (disregard && !this.config.layout.sidebar.collapsed)
      conf.layout.sidebar.collapsed = true;

    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 100);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    } else {
      this.perfectScrollbarEnable = true;
    }
  }

  
  ngOnDestroy() {
   
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
    if (this.notificationSub) this.notificationSub.unsubscribe();

    this.signalRService.disconnect();
  }  
}
