<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  
  let editorValue = `# MarkdownEditor 컴포넌트

실시간 마크다운 편집과 미리보기를 제공하는 컴포넌트입니다.

## 주요 기능

- ✅ **실시간 미리보기**: 왼쪽 에디터, 오른쪽 미리보기
- ✅ **테마 연동**: 라이트/다크 모드 자동 전환  
- ✅ **클립보드 이미지**: 이미지 붙여넣기 지원
- ✅ **코드 하이라이팅**: 다양한 언어별 구문 강조
- ✅ **Mermaid 다이어그램**: 플로우차트, 시퀀스 다이어그램 등
- ✅ **전체화면 모드**: ESC 키로 해제 가능

## 코드 하이라이팅 예제

### JavaScript/TypeScript
\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 배열 메서드 체이닝
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .reduce((sum, x) => sum + x, 0);

console.log('Result:', result);
\`\`\`

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  findUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

const userService = new UserService();
\`\`\`

### Python
\`\`\`python
class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a: float, b: float) -> float:
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def get_history(self):
        return self.history

# 리스트 컴프리헨션
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers if x % 2 == 0]

# 데코레이터 예제
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"실행 시간: {time.time() - start:.2f}초")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "완료"
\`\`\`

### Java
\`\`\`java
public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Not found
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 3, 5, 7, 9, 11, 13, 15};
        int result = search(numbers, 7);
        System.out.println("인덱스: " + result);
    }
}
\`\`\`

### Go
\`\`\`go
package main

import (
    "fmt"
    "sync"
    "time"
)

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    counter := &Counter{}
    var wg sync.WaitGroup
    
    // 10개 고루틴으로 동시 증가
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := 0; j < 100; j++ {
                counter.Increment()
                time.Sleep(time.Millisecond)
            }
        }()
    }
    
    wg.Wait()
    fmt.Printf("최종 값: %d\\n", counter.Value())
}
\`\`\`

### Rust
\`\`\`rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Book {
    title: String,
    author: String,
    pages: u32,
}

impl Book {
    fn new(title: &str, author: &str, pages: u32) -> Self {
        Book {
            title: title.to_string(),
            author: author.to_string(),
            pages,
        }
    }
}

fn main() {
    let mut library: HashMap<String, Book> = HashMap::new();
    
    let book1 = Book::new("The Rust Programming Language", "Steve Klabnik", 552);
    let book2 = Book::new("Programming Rust", "Jim Blandy", 624);
    
    library.insert(book1.title.clone(), book1);
    library.insert(book2.title.clone(), book2);
    
    // 패턴 매칭
    match library.get("The Rust Programming Language") {
        Some(book) => println!("발견: {:?}", book),
        None => println!("책을 찾을 수 없습니다"),
    }
}
\`\`\`

### SQL
\`\`\`sql
-- 사용자와 주문 정보를 조인하여 조회
SELECT 
    u.user_id,
    u.username,
    u.email,
    COUNT(o.order_id) as total_orders,
    SUM(o.amount) as total_amount,
    AVG(o.amount) as avg_amount
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.user_id, u.username, u.email
HAVING COUNT(o.order_id) > 0
ORDER BY total_amount DESC
LIMIT 10;

-- 인덱스 생성
CREATE INDEX idx_orders_user_date 
ON orders (user_id, created_at);

-- 트랜잭션 예제
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
    INSERT INTO transactions (from_account, to_account, amount) 
    VALUES (1, 2, 100);
COMMIT;
\`\`\`

### Bash/Shell
\`\`\`bash
#!/bin/bash

# 함수 정의
deploy_app() {
    local env=$1
    local version=$2
    
    echo "배포 시작: $env 환경, 버전 $version"
    
    # 백업 생성
    if [ -d "/opt/app" ]; then
        sudo cp -r /opt/app "/opt/app.backup.$(date +%Y%m%d_%H%M%S)"
        echo "백업 완료"
    fi
    
    # 새 버전 다운로드
    wget "https://releases.myapp.com/v$version/app.tar.gz" -O "/tmp/app.tar.gz"
    
    # 압축 해제 및 배포
    cd /tmp
    tar -xzf app.tar.gz
    sudo mv app /opt/
    sudo chown -R app:app /opt/app
    sudo chmod +x /opt/app/bin/*
    
    # 서비스 재시작
    sudo systemctl restart myapp
    
    # 헬스체크
    for i in {1..30}; do
        if curl -s http://localhost:8080/health > /dev/null; then
            echo "배포 성공!"
            return 0
        fi
        sleep 2
    done
    
    echo "배포 실패 - 헬스체크 실패"
    return 1
}

# 사용법 검사
if [ $# -lt 2 ]; then
    echo "사용법: $0 <환경> <버전>"
    echo "예: $0 production 1.2.3"
    exit 1
fi

deploy_app "$1" "$2"
\`\`\`

### JSON/YAML
\`\`\`json
{
  "name": "bokslhome",
  "version": "1.0.0",
  "description": "BokslHome 프론트엔드 애플리케이션",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "test": "vitest",
    "lint": "prettier --check . && eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@codemirror/lang-markdown": "^6.2.4",
    "svelte": "^5.0.0",
    "prismjs": "^1.29.0"
  }
}
\`\`\`

\`\`\`yaml
# Docker Compose 설정
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=http://backend:8080
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=jdbc:h2:file:./data/bokslhome
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  default:
    driver: bridge
\`\`\`

## Mermaid 다이어그램 예제

\`\`\`mermaid
flowchart TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 A]
    B -->|No| D[처리 B]
    C --> E[종료]
    D --> E
\`\`\`

**테스트해보세요:**
- 다양한 언어 코드 블록의 구문 강조 확인
- 이미지를 클립보드에서 붙여넣기 (Ctrl+V)
- 전체화면 버튼 클릭
- 미리보기 토글 버튼 사용`;
</script>

<div class="container">
  <h1>MarkdownEditor</h1>
  
  <!-- Props 테이블 -->
  <section class="props-section">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-header">
        <div>Prop</div>
        <div>Type</div>
        <div>Default</div>
        <div>Description</div>
      </div>
      <div class="props-row">
        <div><code>value</code></div>
        <div><code>string</code></div>
        <div><code>'# Hello Markdown!...'</code></div>
        <div>에디터의 초기 내용 (양방향 바인딩)</div>
      </div>
      <div class="props-row">
        <div><code>readOnly</code></div>
        <div><code>boolean</code></div>
        <div><code>false</code></div>
        <div>읽기 전용 모드</div>
      </div>
      <div class="props-row">
        <div><code>height</code></div>
        <div><code>string</code></div>
        <div><code>'400px'</code></div>
        <div>에디터 높이</div>
      </div>
      <div class="props-row">
        <div><code>showPreview</code></div>
        <div><code>boolean</code></div>
        <div><code>true</code></div>
        <div>미리보기 초기 표시 여부</div>
      </div>
      <div class="props-row">
        <div><code>onChange</code></div>
        <div><code>(value: string) => void</code></div>
        <div><code>undefined</code></div>
        <div>내용 변경 시 호출되는 콜백</div>
      </div>
      <div class="props-row">
        <div><code>onImageUpload</code></div>
        <div><code>(file: File) => Promise&lt;string&gt;</code></div>
        <div><code>undefined</code></div>
        <div>커스텀 이미지 업로드 함수</div>
      </div>
    </div>
  </section>

  <!-- 에디터 -->
  <section class="editor-section">
    <MarkdownEditor 
      bind:value={editorValue}
      height="600px"
    />
  </section>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 32px;
    color: var(--foreground);
  }

  .props-section {
    margin-bottom: 32px;
  }

  .props-section h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--foreground);
  }

  .props-table {
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .props-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    background: var(--muted);
    font-weight: 600;
    padding: 12px;
    border-bottom: 1px solid var(--border);
  }

  .props-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    padding: 12px;
    border-bottom: 1px solid var(--border);
  }

  .props-row:last-child {
    border-bottom: none;
  }

  .props-row code {
    background: var(--muted);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }

  .editor-section {
    margin-top: 32px;
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .props-header,
    .props-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .props-header div,
    .props-row div {
      padding: 4px 0;
    }
  }
</style>