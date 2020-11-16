import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoundComponent } from './pound.component';

describe('PoundComponent', () => {
  let component: PoundComponent;
  let fixture: ComponentFixture<PoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
