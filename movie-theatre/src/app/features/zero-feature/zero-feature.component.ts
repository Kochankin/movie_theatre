import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';


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
}
