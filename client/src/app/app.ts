import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = signal('Dating app');
  protected members = signal<User[]>([])

  async ngOnInit() {
    // using observable stream
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the http request') 
    // })
    // don't need to unsubscribe as get is once only request with complete

    // alternative to use promise as only one response is expected
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

   async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}
