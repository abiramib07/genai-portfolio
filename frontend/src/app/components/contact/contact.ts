import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  @Input() personal: any = {};

  form = { name: '', email: '', subject: '', message: '' };
  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  year = new Date().getFullYear();

  constructor(private portfolioSvc: PortfolioService) {}

  send() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.status.set('sending');
    this.portfolioSvc.sendMessage(this.form).subscribe({
      next: () => { this.status.set('success'); this.form = { name:'', email:'', subject:'', message:'' }; },
      error: () => this.status.set('error')
    });
  }
}
