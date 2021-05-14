import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodeTreeComponent } from './code-tree.component';

describe('CodeTreeComponent', () => {
  let component: CodeTreeComponent;
  let fixture: ComponentFixture<CodeTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
