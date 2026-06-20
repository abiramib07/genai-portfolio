import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API = 'http://localhost:8000/api';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API}/all`).pipe(catchError(() => of(this.fallback())));
  }

  sendMessage(payload: any): Observable<any> {
    return this.http.post(`${API}/contact`, payload);
  }

  private fallback() {
    return {
      personal: {
        name: 'Abirami B',
        title: 'Generative AI Developer',
        subtitle: 'LLM & Agentic AI Specialist',
        email: 'abiramib20.ai@gmail.com',
        phone: '7708872650',
        linkedin: 'https://linkedin.com/in/abirami-b-15a042213',
        summary: 'Generative AI Developer with 2+ years of hands-on experience architecting and deploying production-grade agentic AI systems, RAG-powered chatbots, multi-agent orchestration workflows, and AI analytics platforms. Deep expertise in LangGraph, LangChain, LLM orchestration, vector databases, and scalable Python backends using FastAPI.'
      },
      stats: [
        { value: '2+', label: 'Years Experience', icon: 'timeline' },
        { value: '85%', label: 'RAG Answer Relevance', icon: 'analytics' },
        { value: '88%', label: 'Forecasting Accuracy', icon: 'trending_up' },
        { value: '60%', label: 'User Adoption Boost', icon: 'groups' }
      ],
      skills: {
        'Agentic AI & Orchestration': ['LangGraph','LangChain','LangSmith','Multi-Agent Systems','ReAct Pattern','LLM Orchestration','MCP Protocol','Tool Use'],
        'LLMs & Generative AI': ['RAG Architecture','Prompt Engineering','LLM Fine-tuning (LoRA/QLoRA)','Transformers','Claude','OpenAI GPT-4','Google Gemini'],
        'Vector Stores & Retrieval': ['FAISS','Pinecone','ChromaDB','Semantic Search','Embedding Generation','Hybrid Retrieval'],
        'AI Frameworks & ML': ['Hugging Face Transformers','PyTorch','TensorFlow','Scikit-learn','Facebook Prophet'],
        'Backend & APIs': ['Python','FastAPI','Flask','RESTful APIs','Microservices','Async Processing'],
        'Databases': ['PostgreSQL','MongoDB','Azure Cosmos DB','Redis'],
        'DevOps & Cloud': ['Microsoft Azure','Docker','Kubernetes','Git','CI/CD (Jenkins)','Kafka','Grafana']
      },
      experience: [
        {
          role: 'Generative AI Developer', company: 'KGISL', period: 'Oct 2025 – Present', current: true,
          projects: [
            { title: 'AI-Driven Software Dev & QA Automation Platform', highlights: ['Orchestrated 97+ Claude Code skills to automate software development, testing, debugging & deployment','Built self-healing AI agents with failure diagnosis, automated remediation & resumable execution','Designed autonomous multi-agent workflows for Jira-driven dev, code review & release validation'], stack: ['Claude Code','TypeScript','Node.js','PostgreSQL','Docker','Kubernetes','Kafka','Grafana'] },
            { title: 'AI-Powered Conversational Platform for API Discovery', highlights: ['Architected AI conversational interface using Gemini LLM for REST API interaction via natural language','Built production RAG system using Pinecone for semantic API endpoint discovery','Integrated real-time NIFTY 50 stock intelligence with voice-driven interactions'], stack: ['Python','FastAPI','Gemini','Pinecone','RAG','yfinance','FFmpeg'] },
            { title: 'AI-Powered Financial Analytics & Portfolio Intelligence', highlights: ['Developed modular backend with portfolio management, market analysis & AI-generated risk alerts','Implemented dual-mode SWOT news filter — fast keyword & LLM-powered semantic analysis'], stack: ['Python','FastAPI','Google Gemini','PostgreSQL','yfinance','NLP'] }
          ]
        },
        {
          role: 'Generative AI Developer', company: 'Yectra Technologies', period: 'Apr 2024 – Sep 2025', current: false,
          projects: [
            { title: 'AI Analytics Platform — RAG Chatbot', highlights: ['Achieved 85% answer relevance across 200+ test queries using hybrid FAISS retrieval','Designed multi-turn conversation with LangChain supporting context across 5+ turns'], stack: ['Python','FastAPI','LangChain','FAISS','OpenAI GPT-4','sentence-transformers'] },
            { title: 'NL-to-MongoDB Query Engine', highlights: ['Reduced data team support tickets by 40+ per week','Achieved 75% query accuracy through advanced prompt engineering & 500+ validation tests'], stack: ['LangChain','OpenAI API','MongoDB','Python','JSON Schema Validation'] },
            { title: 'Dynamic Visualization System (Multi-Agent)', highlights: ['Built LangGraph multi-agent system for automatic chart generation from natural language','Improved user adoption by 60%, reduced chart dev time from 2 hours to 10 minutes'], stack: ['LangGraph','OpenAI API','Plotly','Python'] },
            { title: 'Domain-Specific Chatbot — ROOS', highlights: ['Fine-tuned LLM using LoRA/QLoRA, cutting GPU training from 6h to 3h','Deployed chatbot handling 200+ daily queries with sub-2s response time'], stack: ['Hugging Face','LoRA/QLoRA','CUDA','FastAPI'] }
          ]
        }
      ],
      achievements: [
        { metric: '85%', description: 'RAG answer relevance across 200+ production queries', icon: 'gps_fixed' },
        { metric: '88%', description: 'Forecasting accuracy with Facebook Prophet', icon: 'trending_up' },
        { metric: '60%', description: 'User adoption improvement via LangGraph multi-agent', icon: 'rocket_launch' },
        { metric: '40+', description: 'Support tickets/week eliminated with NL-to-MongoDB', icon: 'check_circle' }
      ],
      education: { degree: 'B.Tech in Information Technology', institution: 'Dr. N.G.P Institute of Technology', period: '2020 – 2024', cgpa: '8.74' }
    };
  }
}
