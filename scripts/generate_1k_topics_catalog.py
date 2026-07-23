import os, sys, json

def generate_1k_topics():
    tracks = {
        "🎓 Student Productivity & Academic AI": [
            "Active Recall Flashcards with ChatGPT & Anki",
            "Literature Review Synthesis with Perplexity & Elicit",
            "Exam Study Schedule & Syllabus Chunking with Claude",
            "Thesis Formatting & Citation Auditing with AI",
            "Coding Homework Debugging with Cursor & GitHub Copilot",
            "Lecture Audio to Quiz Generator with Whisper",
            "Math & Physics Reasoning with OpenAI o3",
            "Student Resume & Cold Email Automation",
            "Scholarship Essay Drafting & Proofreading",
            "Group Project Task Allocation with AI Notion",
            "Foreign Language Tutor with Custom GPTs",
            "Hackathon MVP Prototyping with V0 & Cursor",
            "Local PDF Chatbot with Private NotebookLM",
            "Placement Interview Simulator with AI Mock Practicals",
            "Student Expense Tracking with AI Sheets",
            "Scientific Diagram Generation with Mermaid.js",
            "Speed Reading & Text Digest Workflows",
            "Portfolio Website Generation with Next.js & AI",
            "Academic Plagiarism & Ethics Auditing",
            "Time-Blocking Systems for Double Majors"
        ],
        "💼 Professional & Workplace Productivity": [
            "Inbox Zero Email Classification Engine in Zapier",
            "Executive Report Generation from Sales Data",
            "Meeting Minutes Action Item Extraction with Notion",
            "Client Onboarding Workflow in Make.com",
            "Slack & Teams FAQ Bot for Internal Teams",
            "Competitor Intelligence Scraper via n8n",
            "Resume Screening & Candidate Ranking via Prompt Systems",
            "Customer Support Ticket Reply Drafting with Claude",
            "Brain Dump to Jira Task Generator",
            "Invoice & Receipt Auditing with Vision AI",
            "Sales Prospect Profile Scraper for 1:1 Emails",
            "Social Media Content Repurposing Engine",
            "Contract Risk Clause Reader with AI",
            "Performance Review Self-Evaluation Assistant",
            "Enterprise Knowledge Base RAG with Pinecone",
            "Product Requirements Document (PRD) Generator",
            "Weekly Status Digest Aggregator for Managers",
            "Customer Feedback Sentiment Analyzer",
            "Pitch Deck Slide Presentation Generator with AI",
            "Standard Operating Procedure (SOP) Video Converter"
        ],
        "⚡ Daily AI Users & Personal Systems": [
            "10 Meta-Prompts for Everyday Life & Work",
            "Personal Second Brain in Notion & Obsidian",
            "Custom GPT Creator Blueprint for Niche Tasks",
            "Browser Extension AI Shortcuts for Daily Web Use",
            "Personal Budget Categorization with AI Sheets",
            "Weekly Meal Prep & Recipe Generator",
            "Automated Desktop Downloads Folder Organizer",
            "Daily Habit & Accountability Coach in Telegram",
            "Travel Itinerary Planning with Perplexity",
            "YouTube Video 3-Minute Digest Generator",
            "Personal Knowledge Vault & Highlight Tagging",
            "Daily Eisenhower Matrix Task Prioritizer",
            "Voice Memo to Structured Journal Converter",
            "Home Subscription Audit Assistant",
            "Daily Custom AI & Tech News Digest",
            "Personal Branding LinkedIn Content Strategy",
            "Calendar Conflict Resolver with AI",
            "AI Gift & Event Curator for Any Budget",
            "Custom Fitness & Nutrition Plan Generator",
            "Digital Cloud Drive Declutter Script"
        ],
        "🚀 AI Technical Skills & Developer Frameworks": [
            "Prompt Engineering CoT & Few-Shot Frameworks",
            "Local Private LLMs with Ollama & DeepSeek-R1",
            "LangGraph State Machines & Node Routing",
            "Vector Embeddings & Hybrid Search with Qdrant",
            "Model Context Protocol (MCP) Integration",
            "Structured Output Schema Validation with Pydantic",
            "Fine-Tuning Open Source Llama 3 & Qwen Models",
            "AI Agent Short-Term & Vector Memory Architecture",
            "Self-Healing Code Agents with Cursor IDE",
            "LLM Quality Evaluation with Ragas & TruLens",
            "Multi-Modal Vision, Speech & Text in Python",
            "Local Vector Search with ChromaDB & FAISS",
            "AI Guardrails & Prompt Injection Prevention",
            "LLM Cost Ceiling & Token Compression",
            "Voice AI Agents with LiveKit & ElevenLabs",
            "AI Pull Request Code Review Bot",
            "Autonomous Web Scraping with Crawl4AI",
            "Custom Copilots in VS Code with Continue.dev",
            "Docker AI Microservices with FastAPI",
            "Synthetic QA Test Data Generation"
        ],
        "⚙️ No-Code Automation & Workflow Systems": [
            "Email Marketing Automation with n8n & AI",
            "Zapier vs Make.com vs n8n 2026 Blueprint",
            "Make.com CRM Lead Scoring & HubSpot Sync",
            "Automated Cold Outreach Machine with LinkedIn Scraping",
            "WhatsApp & Telegram AI Sales Support Bot",
            "Google Sheets Webhook & AI Database Sync",
            "Social Media Multi-Platform Auto-Publisher",
            "E-Commerce Abandoned Cart Recovery in n8n",
            "Stripe & QuickBooks Invoice Processing via Webhooks",
            "Airtable Self-Updating Project Hub",
            "Automated Web Content Scraper & Email Digest",
            "Customer Re-engagement Campaign Automation",
            "PDF Invoice Data Extraction with Mindee",
            "Universal No-Code Webhooks Setup Guide",
            "Podcast Video to Short Reel Repurposing",
            "Google Drive Cloud Backup & Auto-Tagging",
            "Real-Time Analytics Dashboard Sync in Looker",
            "Discord & Slack Server Uptime Monitor Bot",
            "No-Code SaaS MVP Blueprint",
            "Enterprise Process Automation Audit Framework"
        ]
    }

    sub_domains = [
        "Masterclass", "Blueprint", "Architecture", "Hands-On Guide", "2026 Playbook",
        "Step-by-Step", "Crash Course", "Enterprise System", "Zero-to-Hero", "Production Guide"
    ]

    all_topics = []
    topic_id = 1

    # First topic is the live published course
    all_topics.append({
        "id": topic_id,
        "series_title": "How to Automate Email Marketing with n8n & AI Agents",
        "track": "No-Code Automation & Workflow Systems",
        "time_savings": "Saves 10 Hours/Week",
        "status": "published",
        "category": "Course",
        "keywords": ["n8n", "email marketing", "AI agents", "Resend", "SendGrid"]
    })
    topic_id += 1

    # Programmatically generate 1,000 distinct topics by combining domains & variations
    for track_name, base_topics in tracks.items():
        for base in base_topics:
            for sub in sub_domains:
                if topic_id > 1000:
                    break
                
                title = f"{base}: {sub} (Save 5-10 Hours/Week)"
                all_topics.append({
                    "id": topic_id,
                    "series_title": title,
                    "track": track_name,
                    "time_savings": "Saves 5-10 Hours/Week",
                    "status": "draft",
                    "category": "Course",
                    "keywords": [k.lower() for k in base.split()[:4]]
                })
                topic_id += 1

    output_data = {
        "total_topics": len(all_topics),
        "last_updated": "2026-07-23",
        "description": "Master catalog of 1,000 course series topics for TheAskt. Used by agent skills to generate next course series on command.",
        "topics": all_topics
    }

    catalog_path = os.path.join(os.getcwd(), 'course_topics_catalog.json')
    with open(catalog_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"[+] Successfully generated {len(all_topics)} Course Series Topics and saved to {catalog_path}!")

if __name__ == '__main__':
    generate_1k_topics()
