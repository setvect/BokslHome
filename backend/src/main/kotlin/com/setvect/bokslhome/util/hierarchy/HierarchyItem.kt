package com.setvect.bokslhome.util.hierarchy

/**
 * 부모-자식 관계를 표현하기 위한 인터페이스 정의
 */
interface HierarchyItem {
    val id: Int                // 현재 아이템의 고유 ID
    val parentId: Int?         // 부모 ID (루트 노드는 null)
}
