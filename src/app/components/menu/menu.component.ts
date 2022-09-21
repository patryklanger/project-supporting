import {
  Component,
  Directive,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from 'src/app/model/user.model';
import { select, Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducers';
import { login, logout } from 'src/app/store/app.actions';
import { Observable, tap, map, filter } from 'rxjs';
import {
  isLoggedIn,
  isLoggedOut,
  getUsername,
  hasUserRole,
  hasAdminRole,
  hasLecturerRole,
  hasStudentRole,
} from 'src/app/store/app.selectors';
import { SemesterState } from 'src/app/semesters/store/reducers';
import { Semester } from 'src/app/model/semester.model';
import {
  currentSemesterSet,
  tryFetchSemesters,
} from './../../semesters/store/semester.actions';
import { selectAllSemesters } from 'src/app/semesters/store/semester.selectors';
import { CurrentSemesterState } from './../../semesters/store/reducers/current-semester';

@Directive({
  selector: '.collapse',
})
export class CollapseElement {}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('semesterOption', { read: ElementRef }) semesterOption: ElementRef;
  @ViewChild('menuButton', { read: ElementRef }) menuButton: ElementRef;
  @ViewChild('menuContainer', { read: ElementRef })
  mainMenu: ElementRef;
  @ViewChildren(CollapseElement, { read: ElementRef })
  collapsable: QueryList<ElementRef> | null;

  selectedOption: string = '';

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  hasUserRole$: Observable<boolean>;

  hasAdminRole$: Observable<boolean>;

  hasLecturerRole$: Observable<boolean>;

  hasStudentRole$: Observable<boolean>;

  username$: Observable<string>;

  semesters$: Observable<Semester[]>;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private store: Store<AuthState>,
    private semesterStore: Store<SemesterState>,
    private currentSemesterStore: Store<CurrentSemesterState>
  ) {
    this.collapsable = null;
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationStart)) return;
      this.collapsable?.forEach((e) => {
        e.nativeElement.classList.remove('show');
      });
    });
  }

  toggleMenu() {
    this.menuButton.nativeElement.classList.toggle('active');
    this.mainMenu.nativeElement.classList.toggle('active');
  }

  isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
    this.hasUserRole$ = this.store.pipe(select(hasUserRole));
    this.username$ = this.store.pipe(select(getUsername));
    this.hasAdminRole$ = this.store.pipe(select(hasAdminRole));
    this.hasLecturerRole$ = this.store.pipe(select(hasLecturerRole));
    this.hasStudentRole$ = this.store.pipe(select(hasStudentRole));

    this.semesters$ = this.semesterStore.pipe(select(selectAllSemesters));

    this.isLoggedIn$.subscribe((next) => {
      if (next == true) this.semesterStore.dispatch(tryFetchSemesters());
    });
  }

  semesterSelected(event: Semester) {
    this.currentSemesterStore.dispatch(currentSemesterSet({ current: event }));
  }

  login() {
    this.store.dispatch(login());
  }

  getUserInfo() {
    let user: User = {
      id: this.token.sub,
      username: this.token.preferred_username
        ? this.token.preferred_username
        : '',
      roles: this.token.realm_access.roles ? this.token.realm_access.roles : [],
    };
  }

  logout() {
    this.store.dispatch(logout());
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  ngAfterViewInit() {
    if (this.token) {
      this.getUserInfo();
    }
  }
}
