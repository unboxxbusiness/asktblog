#!/usr/bin/env python3
import os
import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
import re
import time

# Niche keywords for filtering and scoring
NICHE_KEYWORDS = [
    "ai", "automation", "crm", "workflow", "agent", "llm",
    "gpt", "claude", "gemini", "n8n", "langchain", "cursor",
    "freelancing", "career", "productivity", "no-code", "copilot",
    "vibe coding", "claude code", "coding agent", "ai study", "future jobs"
]

# Real YouTube Channels to monitor (Corrected Channel IDs)
YOUTUBE_CHANNELS = [
    {"name": "AI Explained", "id": "UCnUYZLuoy1rq1aVMwx4aTzw"},
    {"name": "Two Minute Papers", "id": "UCbfYPyITQ-7l4upoX8nvctg"},
    {"name": "Fireship", "id": "UCsBjURrPoezykLs9EqgamOA"},
    {"name": "IBM Technology", "id": "UCKWaEZ-_VweaEx1j62do_vQ"},
    {"name": "Matt Wolfe", "id": "UCMbxjk-GYs6EW4t0WBOgD8Q"},
    {"name": "The AI Advantage", "id": "UC-H41_Gg6a3K4qg6p2QY_8A"},
    {"name": "All About AI", "id": "UC0v-tlzsn0QZwJnkiaUSJVQ"},
    {"name": "Google Developers", "id": "UC_x5XG1OV2P6uZZ5FSM9Ttw"},
    {"name": "Google DeepMind", "id": "UCP4bf6IHJJQehibu6ai__cg"},
    {"name": "OpenAI", "id": "UCXZCJLdBC09xxGZ6gcdrc6A"},
    {"name": "Anthropic", "id": "UCP0yTzhyCOykbC8LLDBDheGA"},
    {"name": "Microsoft Developer", "id": "UCsMizzt442L95wW44p4_DzA"},
    {"name": "freeCodeCamp", "id": "UC8butISFwT-Wl7EV0hUK0BQ"},
    {"name": "LangChain", "id": "UC-q2zI7yI8yQ-vK8sH6d1Xg"},
    {"name": "Vercel", "id": "UCLq8gNoee7oXM7MvTdjyQvA"},
    {"name": "n8n", "id": "UCV0NrJzSGEQVxKhX8vGqPxw"},
    {"name": "Zapier", "id": "UCmP42X9Rz8ZtO4ZJ6P3fWkQ"},
    {"name": "Make", "id": "UC_P06z01m9xS1xH2J93y94Q"}
]

# AI Company RSS Feeds
COMPANY_FEEDS = [
    {"name": "OpenAI", "url": "https://openai.com/index/rss.xml"}, # Fallback is parsing OpenAI news via XML
    {"name": "Google AI Blog", "url": "https://blog.google/technology/ai/rss/"},
    {"name": "Anthropic", "url": "https://anthropic.com/news/rss.xml"},
    {"name": "Microsoft Blog", "url": "https://blogs.microsoft.com/feed/"},
    {"name": "Meta AI Blog", "url": "https://ai.meta.com/blog/rss/"},
    {"name": "Perplexity Hub", "url": "https://perplexity.ai/hub/rss.xml"},
    {"name": "Cursor Blog", "url": "https://cursor.sh/blog/rss.xml"},
    {"name": "ElevenLabs Blog", "url": "https://elevenlabs.io/blog/rss.xml"},
    {"name": "Runway Blog", "url": "https://runwayml.com/blog/rss.xml"},
    {"name": "Hugging Face Blog", "url": "https://huggingface.co/blog/feed.xml"}
]

# General RSS Feeds
GENERAL_FEEDS = [
    {"name": "MIT Technology Review AI", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed/"},
    {"name": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/feed/"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/"},
    {"name": "The Verge AI", "url": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"},
    {"name": "Ars Technica AI", "url": "https://feeds.arstechnica.com/arstechnica/features"},
    {"name": "Coursera Blog", "url": "https://blog.coursera.org/feed/"},
    {"name": "Microsoft Learn Blog", "url": "https://techcommunity.microsoft.com/gxcuf89792/rss/board?board.id=MicrosoftLearnBlog"}
]

# Reddit subreddits to monitor
REDDIT_SUBS = ["OpenAI", "ChatGPT", "artificial", "ClaudeAI", "LocalLLaMA", "singularity", "MachineLearning", "Entrepreneur", "Freelance"]

def make_request(url):
    """Makes a web request using standard library urllib with a standard User-Agent header."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9,image/webp,*/*;q=0.8'
            }
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.read()
    except Exception as e:
        print(f"[!] Request failed for {url}: {e}")
        return None

def parse_iso_duration(duration_str):
    """Parses an ISO 8601 duration string (e.g. PT15M33S) into seconds."""
    pattern = re.compile(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?')
    match = pattern.match(duration_str)
    if not match:
        return 0
    hours = int(match.group(1)) if match.group(1) else 0
    minutes = int(match.group(2)) if match.group(2) else 0
    seconds = int(match.group(3)) if match.group(3) else 0
    return hours * 3600 + minutes * 60 + seconds

def calculate_viral_score(view_count, engagement_rate, published_at_str, channel_name, title):
    """Calculates viral score 0-100 based on views, engagement, recency, source, and keywords."""
    score = 0
    
    # 1. Views Points (Max 30)
    if view_count >= 1000000:
        score += 30
    elif view_count >= 500000:
        score += 25
    elif view_count >= 100000:
        score += 20
    elif view_count >= 50000:
        score += 15
    elif view_count >= 10000:
        score += 10
        
    # 2. Engagement Points (Max 25) - ratio of likes to views (normally ~1% to 5%)
    # Let's map engagement_rate (which is % already: e.g. 3.5 means 3.5%)
    score += min(engagement_rate * 5, 25)
    
    # 3. Recency Points (Max 20)
    try:
        pub_date = datetime.fromisoformat(published_at_str.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        days_old = (now - pub_date).days
        if days_old <= 1:
            score += 20
        elif days_old <= 3:
            score += 16
        elif days_old <= 7:
            score += 12
        elif days_old <= 30:
            score += 6
    except Exception:
        score += 10 # Default average if timestamp is unparseable
        
    # 4. Source Authority (Max 15)
    high_auth_channels = ["OpenAI", "Google DeepMind", "Anthropic", "AI Explained", "Fireship"]
    if channel_name in high_auth_channels:
        score += 15
    elif any(auth in channel_name for auth in ["Google", "Microsoft", "Vercel"]):
        score += 10
    else:
        score += 7
        
    # 5. Keyword Matches (Max 10)
    lower_title = title.lower()
    matches = sum(1 for kw in NICHE_KEYWORDS if kw in lower_title)
    score += min(matches * 3, 10)
    
    return round(score, 1)

def get_google_trends(geo="IN"):
    """Fetches daily trending searches from Google Trends RSS."""
    print(f"[*] Fetching Google Trends for Geo: {geo}...")
    url = f"https://trends.google.com/trends/trendingsearches/daily/rss?geo={geo}"
    data = make_request(url)
    if not data:
        return []
    
    try:
        root = ET.fromstring(data)
        trends = []
        for item in root.findall('.//item'):
            title = item.find('title')
            approx_traffic = item.find('{ht}approx_traffic')
            if title is not None:
                traffic = approx_traffic.text.strip() if approx_traffic is not None else "N/A"
                trends.append({
                    "keyword": title.text.strip(),
                    "approx_traffic": traffic
                })
        return trends[:10]
    except Exception as e:
        print(f"[!] Error parsing Google Trends: {e}")
        return []

def get_reddit_trending():
    """Fetches trending posts from AI subreddits via free RSS feeds."""
    print("[*] Monitoring AI Subreddits via Reddit RSS...")
    posts = []
    now = datetime.now(timezone.utc)
    
    for sub in REDDIT_SUBS:
        url = f"https://www.reddit.com/r/{sub}/.rss"
        xml_data = make_request(url)
        if not xml_data:
            continue
        try:
            # Simple XML parse for Reddit RSS
            # Reddit RSS uses Atom namespace: {http://www.w3.org/2005/Atom}
            ns = {'atom': 'http://www.w3.org/2005/Atom'}
            root = ET.fromstring(xml_data)
            for entry in root.findall('atom:entry', ns):
                title = entry.find('atom:title', ns)
                link = entry.find('atom:link', ns)
                updated = entry.find('atom:updated', ns)
                
                if title is not None and link is not None:
                    href = link.attrib.get('href', '')
                    title_text = title.text.strip()
                    
                    # Filter: Match keywords
                    if not any(kw in title_text.lower() for kw in NICHE_KEYWORDS):
                        continue
                        
                    # Calculate dummy viral score based on subreddit authority
                    posts.append({
                        "subreddit": f"r/{sub}",
                        "title": title_text,
                        "url": href,
                        "published_at": updated.text if updated is not None else now.isoformat(),
                        "viral_score": 60 if sub in ["OpenAI", "ChatGPT", "ClaudeAI"] else 45
                    })
        except Exception as e:
            print(f"[!] Reddit parse error for r/{sub}: {e}")
            
    # Sort by score descending and return top 10
    return sorted(posts, key=lambda x: x["viral_score"], reverse=True)[:10]

def get_rss_news(feeds_list, limit_days=7):
    """Fetches articles from a list of RSS feeds and filters by age (days) and keyword match."""
    articles = []
    now = datetime.now(timezone.utc)
    
    for feed in feeds_list:
        print(f"[*] Reading RSS Feed: {feed['name']}...")
        xml_data = make_request(feed['url'])
        time.sleep(1.0) # Rate-limit backoff
        if not xml_data:
            continue
        try:
            root = ET.fromstring(xml_data)
            for item in root.findall('.//item'):
                title = item.find('title')
                link = item.find('link')
                pub_date = item.find('pubDate')
                description = item.find('description')
                
                if title is not None and link is not None:
                    title_text = title.text.strip()
                    desc_text = description.text.strip() if description is not None else ""
                    
                    # Strip HTML if description is HTML
                    desc_text = re.sub('<[^<]+?>', '', desc_text)[:200]
                    
                    # Keyword check
                    if not any(kw in title_text.lower() or kw in desc_text.lower() for kw in NICHE_KEYWORDS):
                        continue
                    
                    # Date check
                    pub_parsed = None
                    if pub_date is not None:
                        # Try standard formats
                        for fmt in ("%a, %d %b %Y %H:%M:%S %Z", "%a, %d %b %Y %H:%M:%S %z", "%Y-%m-%dT%H:%M:%S%z"):
                            try:
                                pub_parsed = datetime.strptime(pub_date.text.strip(), fmt)
                                break
                            except ValueError:
                                continue
                    
                    if pub_parsed:
                        # Ensure timezone aware
                        if pub_parsed.tzinfo is None:
                            pub_parsed = pub_parsed.replace(tzinfo=timezone.utc)
                        days_old = (now - pub_parsed).days
                        if days_old > limit_days:
                            continue
                    else:
                        pub_parsed = now
                        
                    # Calculate estimated viral score (news feeds start with 50 base score)
                    score = 50
                    if feed['name'] in ["OpenAI", "Anthropic", "Google AI Blog"]:
                        score += 25
                    if any(kw in title_text.lower() for kw in ["breaking", "release", "launch", "announced"]):
                        score += 15
                    
                    articles.append({
                        "source": feed['name'],
                        "title": title_text,
                        "url": link.text.strip() if link.text else link.attrib.get('href', '').strip(),
                        "published_at": pub_parsed.isoformat(),
                        "summary": desc_text,
                        "viral_score": min(score, 100)
                    })
        except Exception as e:
            print(f"[!] RSS parse error for {feed['name']}: {e}")
            
    return articles

def fetch_youtube_video_stats(api_key, video_ids):
    """Fetches statistics (views, likes, duration) for a list of video IDs in batches."""
    if not api_key or not video_ids:
        return {}
    
    stats_map = {}
    # Batch query in groups of 50
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        ids_str = ",".join(batch)
        url = f"https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id={ids_str}&key={api_key}"
        data_bytes = make_request(url)
        if not data_bytes:
            continue
        try:
            data = json.loads(data_bytes.decode('utf-8'))
            for item in data.get("items", []):
                vid_id = item.get("id")
                stats = item.get("statistics", {})
                content = item.get("contentDetails", {})
                snippet = item.get("snippet", {})
                
                views = int(stats.get("viewCount", 0))
                likes = int(stats.get("likeCount", 0))
                duration = content.get("duration", "PT0S")
                duration_sec = parse_iso_duration(duration)
                
                stats_map[vid_id] = {
                    "views": views,
                    "likes": likes,
                    "duration_sec": duration_sec,
                    "description": snippet.get("description", "")
                }
        except Exception as e:
            print(f"[!] Error fetching stats for batch: {e}")
            
    return stats_map

def get_youtube_trending_and_growing(api_key):
    """
    Executes the dual-YouTube strategy:
    1. Parse latest videos from Channel RSS feeds (Trending last 7 days).
    2. API query top growing/all-time popular videos from top channels (Growing).
    """
    trending_videos = []
    growing_videos = []
    all_video_ids = set()
    
    # ── PHASE 1: RSS FEEDS (Trending last 7 days) ──
    print("[*] Processing YouTube Channel RSS feeds for Trending videos (last 7 days)...")
    rss_videos_draft = []
    now = datetime.now(timezone.utc)
    
    for channel in YOUTUBE_CHANNELS:
        url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel['id']}"
        xml_data = make_request(url)
        time.sleep(1.5) # Prevent YouTube CDN rate limiting/404 blocks
        if not xml_data:
            continue
        try:
            ns = {'yt': 'http://www.youtube.com/xml/schemas/2015', 'atom': 'http://www.w3.org/2005/Atom'}
            root = ET.fromstring(xml_data)
            for entry in root.findall('atom:entry', ns):
                video_id_el = entry.find('yt:videoId', ns)
                title = entry.find('atom:title', ns)
                published = entry.find('atom:published', ns)
                
                if video_id_el is not None and title is not None and published is not None:
                    vid_id = video_id_el.text.strip()
                    pub_parsed = datetime.fromisoformat(published.text.replace("Z", "+00:00"))
                    days_old = (now - pub_parsed).days
                    
                    # Strict 7-day rule for trending RSS
                    if days_old <= 7:
                        rss_videos_draft.append({
                            "id": vid_id,
                            "title": title.text.strip(),
                            "channel": channel["name"],
                            "published_at": pub_parsed.isoformat()
                        })
                        all_video_ids.add(vid_id)
        except Exception as e:
            print(f"[!] RSS parse error for channel {channel['name']}: {e}")
            
    # ── PHASE 2: POPULAR SEARCHES (Growing all-time) ──
    growing_draft = []
    if api_key:
        print("[*] Executing API query for Growing/Popular videos (top channels)...")
        # To avoid burning quota, we only run popular search on the top 5 most viral channels
        target_growing_channels = [
            {"name": "AI Explained", "id": "UCnUYZLuoy1rq1aVMwx4aTzw"},
            {"name": "Matt Wolfe", "id": "UCMbxjk-GYs6EW4t0WBOgD8Q"},
            {"name": "Fireship", "id": "UCsBjURrPoezykLs9EqgamOA"},
            {"name": "n8n", "id": "UCV0NrJzSGEQVxKhX8vGqPxw"},
            {"name": "freeCodeCamp", "id": "UC8butISFwT-Wl7EV0hUK0BQ"}
        ]
        
        for channel in target_growing_channels:
            print(f"[*] Querying popular uploads for channel: {channel['name']}...")
            # Query order=viewCount to find all-time hits
            url = (
                f"https://www.googleapis.com/youtube/v3/search"
                f"?part=id,snippet&channelId={channel['id']}&maxResults=5"
                f"&order=viewCount&type=video&key={api_key}"
            )
            data_bytes = make_request(url)
            time.sleep(1.5) # Prevent YouTube Search API throttling
            if not data_bytes:
                continue
            try:
                data = json.loads(data_bytes.decode('utf-8'))
                for item in data.get("items", []):
                    vid_id = item.get("id", {}).get("videoId")
                    snippet = item.get("snippet", {})
                    pub_at = snippet.get("publishedAt")
                    
                    if vid_id and pub_at:
                        pub_parsed = datetime.fromisoformat(pub_at.replace("Z", "+00:00"))
                        days_old = (now - pub_parsed).days
                        
                        # Growing rule: must be under 180 days (6 months)
                        if days_old <= 180:
                            # Verify keyword relevance in search title
                            title_text = snippet.get("title", "")
                            if any(kw in title_text.lower() for kw in NICHE_KEYWORDS):
                                growing_draft.append({
                                    "id": vid_id,
                                    "title": title_text,
                                    "channel": channel["name"],
                                    "published_at": pub_parsed.isoformat()
                                })
                                all_video_ids.add(vid_id)
            except Exception as e:
                print(f"[!] search.list failed for {channel['name']}: {e}")
                
    # ── PHASE 3: STATISTICS ENRICHMENT & BATCHING ──
    print(f"[*] Batch fetching stats for {len(all_video_ids)} unique video IDs...")
    stats_map = fetch_youtube_video_stats(api_key, list(all_video_ids))
    
    # ── PHASE 4: FILTER AND CLASSIFY ──
    # Process trending RSS videos
    for item in rss_videos_draft:
        vid_id = item["id"]
        stats = stats_map.get(vid_id)
        if not stats:
            continue
            
        views = stats["views"]
        likes = stats["likes"]
        duration = stats["duration_sec"]
        
        # Apply strict filters: Views >= 10,000, Duration >= 3 minutes (no Shorts)
        if views >= 10000 and duration >= 180:
            rate = round((likes / views) * 100, 2) if views > 0 else 0
            # Require minimum 0.5% engagement rate
            if rate >= 0.5:
                score = calculate_viral_score(views, rate, item["published_at"], item["channel"], item["title"])
                if score >= 40:
                    trending_videos.append({
                        "type": "trending",
                        "title": item["title"],
                        "channel": item["channel"],
                        "url": f"https://www.youtube.com/watch?v={vid_id}",
                        "published_at": item["published_at"],
                        "view_count": views,
                        "like_count": likes,
                        "engagement_rate": rate,
                        "viral_score": score,
                        "description": stats["description"][:200]
                    })
                    
    # Process growing API videos
    for item in growing_draft:
        vid_id = item["id"]
        stats = stats_map.get(vid_id)
        if not stats:
            continue
            
        views = stats["views"]
        likes = stats["likes"]
        duration = stats["duration_sec"]
        
        # Higher bar for all-time popular growing videos: Views >= 50,000, no Shorts
        if views >= 50000 and duration >= 180:
            rate = round((likes / views) * 100, 2) if views > 0 else 0
            score = calculate_viral_score(views, rate, item["published_at"], item["channel"], item["title"])
            if score >= 40:
                growing_videos.append({
                    "type": "growing",
                    "title": item["title"],
                    "channel": item["channel"],
                    "url": f"https://www.youtube.com/watch?v={vid_id}",
                    "published_at": item["published_at"],
                    "view_count": views,
                    "like_count": likes,
                    "engagement_rate": rate,
                    "viral_score": score,
                    "description": stats["description"][:200]
                })

    # Sort both pools by viral score descending
    trending_videos = sorted(trending_videos, key=lambda x: x["viral_score"], reverse=True)
    growing_videos = sorted(growing_videos, key=lambda x: x["viral_score"], reverse=True)
    
    return trending_videos, growing_videos

def main():
    youtube_api_key = os.getenv("YOUTUBE_API_KEY")
    if not youtube_api_key:
        env_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
        if os.path.exists(env_path):
            with open(env_path, 'r') as f:
                for line in f:
                    if line.startswith("YOUTUBE_API_KEY="):
                        youtube_api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break

    # 1. Gather all 5 pools
    google_trends_in = get_google_trends("IN")
    google_trends_us = get_google_trends("US")
    reddit_trends = get_reddit_trending()
    
    # RSS company & general sources (7-day window)
    company_stories = get_rss_news(COMPANY_FEEDS, limit_days=7)
    general_stories = get_rss_news(GENERAL_FEEDS, limit_days=7)
    all_news_stories = company_stories + general_stories
    # Sort news by score
    all_news_stories = sorted(all_news_stories, key=lambda x: x["viral_score"], reverse=True)

    # YouTube trending and growing
    yt_trending, yt_growing = get_youtube_trending_and_growing(youtube_api_key)

    # 2. Output Payload
    research_data = {
        "run_metadata": {
            "run_date": datetime.now().strftime("%Y-%m-%d"),
            "run_timestamp": int(datetime.now().timestamp() * 1000),
            "trending_window_days": 7,
            "article_generation_limit": "UNLIMITED",
            "total_news_stories": len(all_news_stories),
            "total_youtube_trending": len(yt_trending),
            "total_youtube_growing": len(yt_growing),
            "total_reddit_highlights": len(reddit_trends)
        },
        "google_trends": {
            "India": google_trends_in,
            "US": google_trends_us
        },
        "top_stories": all_news_stories,
        "youtube_trending": yt_trending,
        "youtube_growing": yt_growing,
        "reddit_highlights": reddit_trends
    }

    # Ensure research folder exists
    research_dir = os.path.join(os.path.dirname(__file__), "..", ".agents", "research")
    os.makedirs(research_dir, exist_ok=True)
    
    output_path = os.path.join(research_dir, "trends_research.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(research_data, f, indent=2, ensure_ascii=False)
        
    print(f"\n[+] Successfully executed content research pipeline!")
    print(f"    - Saved trends research report to: {output_path}")
    print(f"    - Found {len(all_news_stories)} viral news stories")
    print(f"    - Found {len(yt_trending)} trending videos (7 days)")
    print(f"    - Found {len(yt_growing)} growing niche videos")
    print(f"    - Found {len(reddit_trends)} viral reddit posts")

if __name__ == "__main__":
    main()
