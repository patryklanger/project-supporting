import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GroupsActions } from '../../store/action-types';
import { GroupsState } from '../../store/reducers';
import { CurrentSemesterState } from './../../../semesters/store/reducers/current-semester';
import { selectCurrentSemester } from 'src/app/semesters/store/semester.selectors';
import { distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { Semester } from 'src/app/model/semester.model';
import { Pagination } from 'src/app/model/pagination.model';
import { Group } from '../../model/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectAllGroups,
  selectGroupsCount,
  selectGroupsTotalCount,
} from './../../store/groups.selectors';
import { MatSort } from '@angular/material/sort';
import { loadAllGroupsForSemesterInit } from './../../store/groups.actions';

@Component({
  selector: 'app-all-group',
  templateUrl: './all-group.component.html',
  styleUrls: ['./all-group.component.scss'],
})
export class AllGroupComponent implements OnInit {
  semester$: Observable<Semester>;

  dataSource$: Observable<Group[]>;

  totalCount$: Observable<number>;

  currentCount$: Observable<number>;

  dataSourceObtained$: Observable<boolean>;

  loadMore$: Observable<boolean>;

  currentPage = 1;

  displayedColumns: string[] = ['id', 'GroupState', 'topic', 'capacity'];

  constructor(
    private store: Store<GroupsState>,
    private semesterStore: Store<CurrentSemesterState>,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  reload() {
    this.currentCount$ = this.store.select(selectGroupsCount);

    this.totalCount$ = this.store.select(selectGroupsTotalCount);

    this.dataSource$ = this.store.select(selectAllGroups);

    this.dataSourceObtained$ = this.dataSource$.pipe(map((data) => !!data));
  }
  loadMoreGroups() {
    this.store.dispatch(
      loadAllGroupsForSemesterInit({ page: this.currentPage + 1, limit: 20 })
    );
    this.currentPage++;
  }

  ngOnInit(): void {
    this.semester$ = this.semesterStore.select(selectCurrentSemester);
    this.semester$.pipe(
      tap((semester) => {
        if (!semester) this.router.navigate(['/']);
      })
    );

    this.semester$.pipe(
      tap((semester) => {
        console.log(semester);
        if (semester) {
          this.store.dispatch(
            GroupsActions.loadAllGroupsForSemesterInit({ page: 1, limit: 20 })
          );
          this.currentPage = 1;
        }
      })
    );

    this.semester$.subscribe((semester) => {
      if (semester) {
        this.store.dispatch(
          GroupsActions.loadAllGroupsForSemesterInit({ page: 1, limit: 20 })
        );
        this.currentPage = 1;
      }
    });

    this.reload();
  }
}
