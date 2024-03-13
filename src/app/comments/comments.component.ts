import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class CommentsComponent {
  faComment = faComment;
  users: User[] = [
    { userID: 1, name: 'Kevin', email: 'kevin@limble.com' },
    { userID: 2, name: 'Jeff', email: 'jeff@limble.com' },
    { userID: 3, name: 'Bryan', email: 'bryan@limble.com' },
    { userID: 4, name: 'Gabbey', email: 'gabbey@limble.com' },
    { userID: 5, name: 'Bob', email: 'bob@limble.com' },
    { userID: 6, name: 'Daniel', email: 'daniel@limble.com' },
    { userID: 7, name: 'Sarah', email: 'sarah@limble.com' },
    { userID: 8, name: 'Hailey', email: 'hailey@limble.com' }
  ];

  comments: string[] = [];
  currentComment: string = '';
  filteredUsers: User[] = [];

  onCommentChange(): void {
    const words = this.currentComment.split(' ');
    const lastWord = words.pop();
    const mentionedUserNames = words
      .filter(word => word.startsWith('@'))
      .map(word => word.substring(1)); // Remove the "@" symbol
  
    const mentionedUserIDs = this.users
      .filter(user => mentionedUserNames.includes(user.name))
      .map(user => user.userID);
  
    if (lastWord && lastWord.startsWith('@')) {
      console.log('lastWord', lastWord.substring(1));
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().startsWith(lastWord.substring(1).toLowerCase()) &&
        !mentionedUserIDs.includes(user.userID)
      );
      console.log('filteredUsers', this.filteredUsers);
    } else {
      this.filteredUsers = [];
    }
  }  

  addComment(): void {
    if (this.currentComment.trim()) {
      this.comments.push(this.currentComment.trim());
      this.notifyTaggedUsersInComment();
      this.currentComment = '';
      this.filteredUsers = [];
    }
  }  

  selectUser(user: User): void {
    const words = this.currentComment.split(' ');
    words.pop();
    words.push(`@${user.name}`);
    this.currentComment = words.join(' ') + ' ';
    this.filteredUsers = [];
  }

  // Some improvements could be made here, but this is just a simple example
  // We should be keeping track of users on something more unique than name
  // Like someone's display name can be Kevin but their username is kevin123
  notifyTaggedUsersInComment(): void {
    const mentionedUserNames = this.currentComment
      .split(' ')
      .filter(word => word.startsWith('@'))
      .map(word => word.substring(1));
    
    const taggedUsers = this.users.filter(user => mentionedUserNames.includes(user.name));
    
    console.log('Notifying tagged users:', taggedUsers);
  }  
}
