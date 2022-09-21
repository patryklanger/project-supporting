import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, shareReplay } from 'rxjs';
import { Pagination } from 'src/app/model/pagination.model';
import { AdminState } from '../../store/reducers/admin.reducer';
import { AdminDto } from './../../model/adminDto.model';
import {
  selectAdminsPagesAmount,
  selectAdminsPagination,
  selectAdminsPageLimit,
  selectAllAdmins,
} from './../../store/admin.selectors';

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss'],
})
export class AllAdminComponent implements OnInit {
  pagination$: Observable<Pagination>;
  dataSource$: Observable<AdminDto[]>;
  dataSourceObtained$: Observable<boolean>;
  currentPage: string;

  limit$: Observable<number>;

  pagesAmount$: Observable<number>;

  @ViewChild('forward') forwardArrow: ElementRef;
  @ViewChild('pagesDiv') pagesDiv: ElementRef;

  constructor(
    private store: Store<AdminState>,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  reload() {
    this.route.params.subscribe((params) => {
      this.currentPage = params['id'];
    });

    this.pagination$ = this.store.pipe(
      select(selectAdminsPagination),
      shareReplay()
    );

    this.pagesAmount$ = this.store.pipe(
      select(selectAdminsPagesAmount),
      shareReplay()
    );

    this.limit$ = this.store.pipe(select(selectAdminsPageLimit));
    this.limit$.subscribe((limit) => {
      this.dataSource$ = this.store.pipe(
        select(selectAllAdmins),
        map((e) =>
          e.slice(
            (parseInt(this.currentPage) - 1) * limit,
            (parseInt(this.currentPage) - 1) * limit + limit
          )
        ),
        shareReplay()
      );
      this.dataSourceObtained$ = this.dataSource$.pipe(map((data) => !!data));
    });
    this.pagesAmount$.subscribe();
  }
  insertPagesLinks(div: ElementRef, before: ElementRef) {
    this.pagesAmount$.subscribe((e) => {
      for (let i = 1; i <= e; i++) {
        let element = this.renderer.createElement('a');
        element.innerHTML = `${i}`;
        if (parseInt(this.currentPage) != i) element.style.cursor = 'pointer';
        else element.classList.add('active--page--link');
        this.renderer.insertBefore(
          div.nativeElement,
          element,
          before.nativeElement
        );
      }
    });
  }
  pageLinkClicked(event) {
    if (isNaN(parseInt(event.path[0].innerHTML))) return;
    let numberClicked = event.path[0].innerHTML;
    this.router.navigateByUrl(`lecturer/all/page/${numberClicked}`);
  }
  ngAfterViewInit() {
    this.insertPagesLinks(this.pagesDiv, this.forwardArrow);
  }
  ngOnInit(): void {
    this.reload();
  }
}
