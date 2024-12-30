package com.setvect.bokslhome.app.knowledge.model

data class KnowledgeRequest(
    val classifyC: String,
    val problem: String,
    val solution: String? = null,
)
