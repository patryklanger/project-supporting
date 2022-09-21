import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Topic } from 'src/app/topics/model/topic';
import { map, Observable, shareReplay } from 'rxjs';
import { TopicsState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import {
  selectAllTopics,
  selectTopicPagesAmount,
} from '../store/topics.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from './../../model/pagination.model';
import {
  selectTopicsPagination,
  selectTopicPageLimit,
} from './../store/topics.selectors';

@Component({
  selector: 'app-all-topic',
  templateUrl: './all-topic.component.html',
  styleUrls: ['./all-topic.component.scss'],
})
export class AllTopicComponent implements OnInit {
  displayedColumns: string[] = ['topicName', 'description'];

  pagination$: Observable<Pagination>;
  dataSource$: Observable<Topic[]>;
  dataSourceObtained$: Observable<boolean>;
  currentPage: string;

  limit$: Observable<number>;

  pagesAmount$: Observable<number>;

  @ViewChild('forward') forwardArrow: ElementRef;
  @ViewChild('pagesDiv') pagesDiv: ElementRef;

  constructor(
    private store: Store<TopicsState>,
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
      select(selectTopicsPagination),
      shareReplay()
    );

    this.pagesAmount$ = this.store.pipe(
      select(selectTopicPagesAmount),
      shareReplay()
    );

    this.limit$ = this.store.pipe(select(selectTopicPageLimit));
    this.limit$.subscribe((limit) => {
      this.dataSource$ = this.store.pipe(
        select(selectAllTopics),
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
    this.router.navigateByUrl(`topic/all/page/${numberClicked}`);
  }

  ngOnInit(): void {
    this.reload();
  }
  ngAfterViewInit() {
    this.insertPagesLinks(this.pagesDiv, this.forwardArrow);
  }
}
