import { Component, Input, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements OnInit {
  @Input() personal: any = {};
  @Input() stats: any[] = [];
  @ViewChildren('statEl') statEls!: QueryList<ElementRef>;

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }, 100);
  }
}
