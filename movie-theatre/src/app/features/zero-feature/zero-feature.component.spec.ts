import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroFeatureComponent } from './zero-feature.component';

describe('ZeroFeatureComponent', () => {
  let component: ZeroFeatureComponent;
  let fixture: ComponentFixture<ZeroFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeroFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
