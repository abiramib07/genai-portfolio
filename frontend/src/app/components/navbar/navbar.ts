import { Component, Input, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  @Input() personal: any = {};
  scrolled = signal(false);
  menuOpen = signal(false);

  links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  scrollTo(href: string) {
    this.menuOpen.set(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}
