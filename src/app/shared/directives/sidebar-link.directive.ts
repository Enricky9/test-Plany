import {
  Directive, HostBinding, Inject, Input, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarDirective } from "./sidebar.directive";

@Directive({
  selector: "[appSidebarlink]"
})
export class SidebarLinkDirective implements OnInit, OnDestroy, OnChanges {

  @Input()
  public id: string;

  @Input()
  public parent: string;

  @Input()
  public level: number;

  @Input()
  public hasSub: boolean;

  @Input()
  public path: string;

  @Input()
  public isPlanning: boolean = false;

  @Input()
  public isPrincipalMenu: boolean = false;

  @Input()
  public isActived: boolean = false;

  @HostBinding('class.active')
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: boolean) {
    this._active = value;
  }

  @HostBinding('class.open')  
  @Input()
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    this._open = value;
  }

  @HostBinding('class.sidebar-group-active')
  @Input()
  get sidebarGroupActive(): boolean {
    return this._sidebarGroupActive;
  }
  set sidebarGroupActive(value: boolean) {
    this._sidebarGroupActive = value;
  }

  @HostBinding('class.nav-collapsed-open')
  @Input()
  get navCollapsedOpen(): boolean {
    return this._navCollapsedOpen;
  }
  set navCollapsedOpen(value: boolean) {
    this._navCollapsedOpen = value;
  }

  protected _open: boolean;
  protected _active: boolean;
  protected _sidebarGroupActive: boolean;
  protected _navCollapsedOpen: boolean;

  protected sideNav: SidebarDirective;

  public constructor(    
    @Inject(SidebarDirective) sideNav: SidebarDirective,
    private router: Router) {
    this.sideNav = sideNav;
  }
  ngOnChanges(changes: SimpleChanges): void {    
  }

  public ngOnInit(): any {
    this.sideNav.addLink(this);    
  }

  public ngOnDestroy(): any {
    this.sideNav.navlinks = [];
  }

  //when side menu (vertical menu) item gets clicked
  public toggle(): any {
    if (this.isPrincipalMenu)
      this.open = this.sideNav.config.layout.sidebar.collapsed;
    else
      this.open = !this.open;
    if(this.open) {
     // this.sideNav.closeOtherLinks(this);

      if (this.sideNav.name == "principal") {
        //Se o menu for o de Planejamentos, desabilita todos os outros e ativa ele.
        if (this.isPrincipalMenu) {

          //Desabilita todos os menus diferentes do Planejamento
          for (var i = 0; i < this.sideNav.navlinks.length; i++) {
            if (!this.sideNav.navlinks[i].isPrincipalMenu)
              this.sideNav.navlinks[i].active = false;
          }

          //Redireciona o usuário para o último planejamento acessado, caso ele clique no menu de Planejamento.
          if (this.sideNav.lastPlanningAccessed != undefined && this.sideNav.lastPlanningAccessed != this.router.url)
            this.router.navigate([this.sideNav.lastPlanningAccessed]);
        }
        else {
          for (var i = 0; i < this.sideNav.navlinks.length; i++) {
            if (this.sideNav.navlinks[i] != this)
              this.sideNav.navlinks[i].active = false;
          }
        }
        this.active = true;
      }      
    }
    if (!this.open && this.level.toString() === "1" && this.hasSub) {
      this.sidebarGroupActive = false;
    }
  }
}
