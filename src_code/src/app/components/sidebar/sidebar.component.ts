import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() currentPage! : string;

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  menuItem = [ { path: '/dashboard', name: 'Dashboard', icon: '../../assets/images/dashboard.png'},
              { path: '/about', name: 'About', icon: '../../assets/images/about.png'},
              { path: '/support', name: 'Support', icon: '../../assets/images/support.png'}  ];

}
