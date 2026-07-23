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

env = load_env('.env.local')
db_url = env.get('TURSO_CONNECTION_URL', '').replace('libsql://', 'https://')
token = env.get('TURSO_AUTH_TOKEN', '')

pipeline_url = f"{db_url}/v2/pipeline"
headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

payload = {
    "requests": [
        {
            "type": "execute",
            "stmt": {
                "sql": "SELECT id, title, category, content_type, source_name, status FROM articles WHERE category = 'Course' OR content_type = 'course'"
            }
        }
    ]
}

req = urllib.request.Request(pipeline_url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    rows = res['results'][0]['response']['result']['rows']
    cols = [c['name'] for c in res['results'][0]['response']['result']['cols']]
    print(f"Found {len(rows)} course rows in Turso:")
    for r in rows:
        row_vals = [val.get('value') for val in r]
        print(dict(zip(cols, row_vals)))
