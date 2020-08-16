import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { filter, startWith, map, tap } from 'rxjs/operators';


export interface IPageActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  data: {
    title: string;
  };
}

@Component({
  selector: 'app-zero-feature',
  templateUrl: './zero-feature.component.html',
  styleUrls: ['./zero-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZeroFeatureComponent {

  private _title$: Observable<string>;
  public get title$(): Observable<string> {
    return this._title$;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _title: Title,
  ) {
    this._title$ = this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(this.getTitle(this._activatedRoute.snapshot)),
      map(_ => this.getTitle(this._activatedRoute.snapshot)),
      tap((pageName) => { this._title.setTitle(pageName); }),
    );
  }

  private getTitle(route: ActivatedRouteSnapshot): string {
    while (route.firstChild) {
      route = route.firstChild as IPageActivatedRouteSnapshot;
    }
    return route.data.title;
  }

}
