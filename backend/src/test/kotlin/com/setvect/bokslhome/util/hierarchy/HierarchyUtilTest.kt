package com.setvect.bokslhome.util.hierarchy

import org.junit.jupiter.api.Test

class HierarchyUtilTest {
    @Test
    fun hierarchyTest() {
        val items = listOf(
            MyItem(id = 1, parentId = null, name = "Root 1"),
            MyItem(id = 2, parentId = 1, name = "Child 1.1"),
            MyItem(id = 3, parentId = 1, name = "Child 1.2"),
            MyItem(id = 4, parentId = null, name = "Root 2"),
            MyItem(id = 5, parentId = 4, name = "Child 2.1"),
            MyItem(id = 6, parentId = 5, name = "Child 2.1.1"),
        )

        val tree = HierarchyUtil.buildTree(items)

        HierarchyUtil.prettyPrint(tree)
    }

    data class MyItem(
        override val id: Int,
        override val parentId: Int?,
        val name: String
    ) : HierarchyItem
}
