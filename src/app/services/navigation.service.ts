import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private route: Router) { }

  navigateTo(url: any) {
    this.route.navigate([url]);
  }
}
