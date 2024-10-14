import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpageAdminComponent } from './postpage-admin.component';

describe('PostpageAdminComponent', () => {
  let component: PostpageAdminComponent;
  let fixture: ComponentFixture<PostpageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostpageAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostpageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
