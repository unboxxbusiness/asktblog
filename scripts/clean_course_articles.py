import os, sys, json, urllib.request

def load_env(env_path):
    env = {}
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env[k] = v.strip('"\'')
    return env

def delete_all_course_articles():
    env = load_env(os.path.join(os.getcwd(), '.env.local'))
    db_url = env.get('TURSO_CONNECTION_URL', '').replace('libsql://', 'https://')
    token = env.get('TURSO_AUTH_TOKEN', '')

    if not db_url or not token:
        print("[!] Missing Turso credentials in env.")
        return

    pipeline_url = f"{db_url}/v2/pipeline"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    delete_payload = {
        "requests": [
            {
                "type": "execute",
                "stmt": {
                    "sql": "DELETE FROM articles WHERE content_type = 'course' OR category = 'Course'"
                }
            },
            {"type": "close"}
        ]
    }

    try:
        req = urllib.request.Request(pipeline_url, data=json.dumps(delete_payload).encode('utf-8'), headers=headers, method='POST')
        with urllib.request.urlopen(req) as resp:
            print("[+] Successfully deleted all old course articles from Turso DB!")
    except Exception as e:
        print(f"[!] Error deleting course articles: {e}")

if __name__ == '__main__':
    delete_all_course_articles()
