import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const ROLES = ['Generative AI Developer', 'LLM & Agentic AI Specialist', 'RAG Systems Architect', 'Multi-Agent Orchestration Engineer'];

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() personal: any = {};
  @Input() stats: any[] = [];
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  displayedRole = signal('');
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  private timer: any;
  private animFrame: any;

  ngOnInit() { this.typeRole(); }

  ngAfterViewInit() { this.initCanvas(); }

  ngOnDestroy() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.animFrame);
  }

  private typeRole() {
    const role = ROLES[this.roleIndex];
    if (this.isDeleting) {
      this.displayedRole.set(role.substring(0, this.charIndex--));
      if (this.charIndex < 0) { this.isDeleting = false; this.roleIndex = (this.roleIndex + 1) % ROLES.length; }
      this.timer = setTimeout(() => this.typeRole(), 60);
    } else {
      this.displayedRole.set(role.substring(0, ++this.charIndex));
      if (this.charIndex === role.length) { this.isDeleting = true; this.timer = setTimeout(() => this.typeRole(), 2000); return; }
      this.timer = setTimeout(() => this.typeRole(), 80);
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,0.7)';
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - d / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  scrollTo(id: string) { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); }
}
