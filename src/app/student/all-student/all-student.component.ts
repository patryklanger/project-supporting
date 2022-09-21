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
import { Student } from '../model/student.model';
import { StudentsState } from './../store/reducers/index';
import {
  selectStudentsPagination,
  selectStudentsPageLimit,
  selectStudentsPagesAmount,
  selectAllStudents,
} from './../store/students.selectors';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.scss'],
})
export class AllStudentComponent implements OnInit {
  pagination$: Observable<Pagination>;
  dataSource$: Observable<Student[]>;
  dataSourceObtained$: Observable<boolean>;
  currentPage: string;

  limit$: Observable<number>;

  pagesAmount$: Observable<number>;

  @ViewChild('forward') forwardArrow: ElementRef;
  @ViewChild('pagesDiv') pagesDiv: ElementRef;

  constructor(
    private store: Store<StudentsState>,
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
      select(selectStudentsPagination),
      shareReplay()
    );

    this.pagesAmount$ = this.store.pipe(
      select(selectStudentsPagesAmount),
      shareReplay()
    );

    this.limit$ = this.store.pipe(select(selectStudentsPageLimit));
    this.limit$.subscribe((limit) => {
      this.dataSource$ = this.store.pipe(
        select(selectAllStudents),
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
    this.router.navigateByUrl(`student/all/page/${numberClicked}`);
  }
  ngAfterViewInit() {
    this.insertPagesLinks(this.pagesDiv, this.forwardArrow);
  }

  ngOnInit(): void {
    this.reload();
  }
}
