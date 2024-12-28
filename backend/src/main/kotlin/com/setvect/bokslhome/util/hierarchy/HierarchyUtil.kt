package com.setvect.bokslhome.util.hierarchy

class HierarchyUtil {
    companion object {
        fun <T : HierarchyItem> buildTree(items: List<T>): List<TreeNode<T>> {
            // 부모 ID를 기준으로 항목 그룹화
            val groupedByParentId = items.groupBy { it.parentId }

            // 루트 노드 (parentId가 null인 항목)
            val rootItems = groupedByParentId[null].orEmpty()

            // 순환 참조를 감지하기 위한 트래킹 (현재 탐색 중인 ID 경로를 추적)
            val visited = mutableSetOf<Int>()

            // 재귀적으로 자식 노드 연결
            fun attachChildren(parent: T): TreeNode<T> {
                // 순환 참조 감지
                if (!visited.add(parent.id)) {
                    throw IllegalStateException("순환 참조가 감지되었습니다: ID = ${parent.id}")
                }

                val children = groupedByParentId[parent.id].orEmpty().map { attachChildren(it) }

                // 탐색이 완료되면 현재 노드 ID를 제거
                visited.remove(parent.id)

                return TreeNode(data = parent, children = children.toMutableList())
            }

            // 모든 루트 노드에 대해 트리 생성
            return rootItems.map { attachChildren(it) }
        }

        fun <T : HierarchyItem> prettyPrint(treeNodes: List<TreeNode<T>>, depth: Int = 0) {
            for (node in treeNodes) {
                // 깊이에 따른 들여쓰기 추가
                println("${"  ".repeat(depth)}- ${node.data}")
                // 자식 노드도 출력
                prettyPrint(node.children, depth + 1)
            }
        }
    }
}
