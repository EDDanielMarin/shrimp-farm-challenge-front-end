import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoundListComponent } from './pound-list.component';

describe('PoundListComponent', () => {
  let component: PoundListComponent;
  let fixture: ComponentFixture<PoundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
