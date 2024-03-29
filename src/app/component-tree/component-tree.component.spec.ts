import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentTreeComponent } from './component-tree.component';

describe('ComponentTreeComponent', () => {
  let component: ComponentTreeComponent;
  let fixture: ComponentFixture<ComponentTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
