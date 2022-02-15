import { Directive, HostListener, ChangeDetectorRef, OnInit, OnDestroy, HostBinding, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { SidebarLinkDirective } from './sidebar-link.directive';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { match } from 'assert';
import { filter } from 'rxjs/operators';

@Directive({ selector: '[appSidebar]' })
export class SidebarDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input()
  public name: string;

  @HostBinding("class.expanded")
  @Input()
  get navExpanded(): boolean {
    return this._navExpanded;
  }
  set navExpanded(value: boolean) {
    this._navExpanded = value;
  }

  navlinks: Array<SidebarLinkDirective> = [];
  layoutSub: Subscription;
  lastPlanningAccessedSub: Subscription;
  lastPlanningAccessed: any;
  config: any = {};
  mouseEnter = false;
  sidebarExpanded = true;
  _navExpanded: boolean;
  innerWidth: any;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private configService: ConfigService, private layoutService: LayoutService) {    
    this.config = this.configService.templateConf;
    this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
  }
  ngOnChanges(changes: SimpleChanges): void {    
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    });    

    this.getLastPlanningAccessed();
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.lastPlanningAccessedSub)
      this.lastPlanningAccessedSub.unsubscribe();
  }

  //load layout when changes in the config
  loadLayout() {

    this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
    if (this.config.layout.sidebar.collapsed && !this.mouseEnter) {
      this.setSidebarGroupActiveCollapsed();
      // this.navExpanded = false;
    }
    else {
      this.setSidebarGroupActive();
      //this.navExpanded = true;
    }
  }

  //add menu links to the link list
  public addLink(link: SidebarLinkDirective): void {
    this.navlinks.push(link);
  }

  //close all other menu items other than active one
  public closeOtherLinks(openLink: SidebarLinkDirective): void {
    this.navlinks.forEach((link: SidebarLinkDirective) => {
      if (link != openLink && (openLink.level.toString() === "1" || link.level === openLink.level)) {
        link.open = false;
        link.sidebarGroupActive = false;
      }
      else if (link === openLink && (openLink.level.toString() === "1") && link.hasSub === true) {
        link.sidebarGroupActive = true;
      }
      else if (link === openLink && (openLink.level.toString() === "1") && link.hasSub === false) {
        link.sidebarGroupActive = false;
        link.open = false;
      }
      else if (link === openLink && openLink.level.toString() != "1" && link.hasSub === false) {
        link.open = false;
        link.sidebarGroupActive = false;
        return;
      }
    });
  }

  ngAfterViewInit() {
    if (this.router.url.startsWith('/p')) {
      var navLink = this.navlinks.filter(u => u.isPlanning);
      if (navLink != null && navLink.length > 0)
        navLink[0].active = true;
    }

  }

  // call when sidebar toggle is collapsed but still in expand mode on mouse hover
  public setSidebarGroupActive(): void {
    if (this.navlinks.length > 0) {
      this.navlinks.forEach((link: SidebarLinkDirective) => {
        link.sidebarGroupActive = false;
        link.navCollapsedOpen = false;
      });
      var matched = this.navlinks.find(link => link.path === this.router.url);
      if (matched) {              
        //Verifica se o item está no nível principal (sem estar dentro de pasta)
        var companyPlan = this.navlinks.find(link => link.id === matched.parent && link.hasSub === true && link.isPlanning);
        if(companyPlan)
        {
          companyPlan.sidebarGroupActive = true;
          companyPlan.navCollapsedOpen = false;
          companyPlan.open = true;
        }        
        else
        {
          //Se não está no nível principal, encontra a pasta e define ela como aberta
          var parent = this.navlinks.find(link => link.id === matched.parent && link.hasSub === true);
          if (parent) {
            parent.sidebarGroupActive = true;
            parent.navCollapsedOpen = false;
            parent.open = true;   
            
            companyPlan = this.navlinks.find(link => link.id === parent.parent && link.hasSub === true && link.isPlanning);
            if(companyPlan)
            {
              companyPlan.sidebarGroupActive = true;
              companyPlan.navCollapsedOpen = false;
              companyPlan.open = true;
            }  
          }  
        }
      }
    }
  }

  // call when sidebar toggle is collapsed and is in collapse mode on mouse out
  public setSidebarGroupActiveCollapsed(): void {
    var link = this.navlinks.find(link => link.path === this.router.url);
    //if (link != undefined)
    //  this.closeOtherLinks(link);
    if (this.navlinks.length > 0) {
      this.navlinks.forEach((link: SidebarLinkDirective) => {
        link.sidebarGroupActive = false;
        link.navCollapsedOpen = false;
      });
      let matched = this.navlinks.find(link => link.path === this.router.url);
      if (matched) {
        let parent = this.navlinks.find(link => link.parent === matched.parent && link.hasSub === true);
        if (parent) {
          parent.sidebarGroupActive = true;
          parent.navCollapsedOpen = true;
          parent.open = false;
        }
      }
    }
  }

  getLastPlanningAccessed() {
    if (this.lastPlanningAccessed == undefined && this.router.url.startsWith('/p'))
      this.lastPlanningAccessed = this.router.url;

    this.lastPlanningAccessedSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {

        if ((routeChange as NavigationEnd).url.startsWith('/p'))
          this.lastPlanningAccessed = (routeChange as NavigationEnd).url;
      });
  }
}
