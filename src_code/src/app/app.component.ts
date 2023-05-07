import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularClient';
  showLayout: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(this.router.url.includes('/login') || this.router.url === ''){
        this.showLayout = false
      };
    });
  }
}
