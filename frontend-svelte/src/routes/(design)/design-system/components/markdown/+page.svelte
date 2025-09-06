<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  import PropsTable from '$lib/components/docs/PropsTable.svelte';
  let value = $state<string>(`# Hello Markdown

### Mermaid 다이어그램
\`\`\`mermaid
graph TD;
    A[시작] --> B{조건 확인};
    B -->|Yes| C[처리 실행];
    B -->|No| D[종료];
    C --> E[결과 저장];
    E --> D;
\`\`\`

## 코드 블럭 예시

### TypeScript 코드
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(userData: Partial<User>): User {
  return {
    id: Math.random(),
    name: userData.name || 'Unknown',
    email: userData.email || 'no-email@example.com'
  };
}

// 사용 예시
const newUser = createUser({
  name: 'John Doe',
  email: 'john@example.com'
});

console.log('Created user:', newUser);
\`\`\`

### Python 코드
\`\`\`python
import json
from typing import Dict, List, Optional

class UserManager:
    def __init__(self):
        self.users: List[Dict] = []

    def add_user(self, name: str, email: str, age: Optional[int] = None) -> Dict:
        """새로운 사용자를 추가합니다."""
        user = {
            'id': len(self.users) + 1,
            'name': name,
            'email': email,
            'age': age
        }
        self.users.append(user)
        return user

    def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """ID로 사용자를 찾습니다."""
        for user in self.users:
            if user['id'] == user_id:
                return user
        return None

    def to_json(self) -> str:
        """사용자 목록을 JSON으로 변환합니다."""
        return json.dumps(self.users, indent=2)

# 사용 예시
manager = UserManager()
user1 = manager.add_user('Alice', 'alice@example.com', 25)
user2 = manager.add_user('Bob', 'bob@example.com', 30)

print("사용자 목록:")
print(manager.to_json())
\`\`\`

## 기본 마크다운 기능

- **볼드 텍스트**
- *이탤릭 텍스트*
- \`인라인 코드\`

### 목록
1. 첫 번째 항목
2. 두 번째 항목
   - 중첩된 항목
   - 또 다른 중첩 항목


> **참고**: 이미지 붙여넣기(Ctrl+V)와 파일 드래그 앤 드롭이 지원됩니다.
`);
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Markdown Editor</h1>
  <MarkdownEditor height="700px" showPreview={true} {value} />
</section>
