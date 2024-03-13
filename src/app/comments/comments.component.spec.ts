import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test for component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test for adding a new comment
  it('should add a new comment', () => {
    const initialCommentCount = component.comments.length;
    component.currentComment = 'Test comment';
    component.addComment();
    expect(component.comments.length).toBe(initialCommentCount + 1);
    expect(component.comments[initialCommentCount]).toBe('Test comment');
  });

  // Test for user filtering based on input
  it('should filter users based on input', () => {
    component.currentComment = '@K';
    component.onCommentChange();
    expect(component.filteredUsers.length).toBeGreaterThan(0);
    expect(component.filteredUsers[0].name).toContain('K');
  });

  // Test for user selection from filtered list
  it('should select a user from filtered list', () => {
    component.currentComment = '@K';
    component.onCommentChange();
    component.selectUser(component.filteredUsers[0]);
    expect(component.currentComment).toContain('@Kevin');
  });
});
