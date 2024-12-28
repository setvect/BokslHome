package com.setvect.bokslhome.util.hierarchy

/**
 * 부모-자식 관계를 표현하는 계층 모델
 */
data class TreeNode<T>(
    val data: T,                      // 노드에 저장할 데이터
    val children: MutableList<TreeNode<T>> = mutableListOf() // 자식 노드를 담는 리스트
)
