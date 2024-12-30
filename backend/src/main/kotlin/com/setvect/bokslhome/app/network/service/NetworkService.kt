package com.setvect.bokslhome.app.network.service

import com.setvect.bokslhome.app.network.entity.NetworkEntity
import com.setvect.bokslhome.app.network.model.NetworkRequest
import com.setvect.bokslhome.app.network.model.NetworkResponse
import com.setvect.bokslhome.app.network.repository.NetworkRepository
import java.time.LocalDateTime
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PagedModel
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class NetworkService(
    private val networkRepository: NetworkRepository
) {
    private val log = LoggerFactory.getLogger(NetworkService::class.java)

    @Transactional
    fun create(request: NetworkRequest): NetworkResponse {
        val networkEntity = NetworkEntity(
            title = request.title,
            content = request.content,
            regDate = LocalDateTime.now(),
            editDate = LocalDateTime.now(),
            deleteF = false
        )
        val savedEntity = networkRepository.save(networkEntity)
        return NetworkResponse.from(savedEntity)
    }

    @Transactional
    fun update(networkSeq: Int, request: NetworkRequest): NetworkResponse {
        val existingNetwork = getNetworkById(networkSeq)
        val updatedNetwork = existingNetwork.copy(
            title = request.title,
            content = request.content,
            editDate = LocalDateTime.now()
        )
        val savedEntity = networkRepository.save(updatedNetwork)
        return NetworkResponse.from(savedEntity)
    }

    @Transactional
    fun delete(networkSeq: Int) {
        networkRepository.deleteUpdate(networkSeq)
    }

    fun get(networkSeq: Int): NetworkResponse {
        val networkEntity = getNetworkById(networkSeq)
        return NetworkResponse.from(networkEntity)
    }

    fun page(pageable: Pageable, title: String?): PagedModel<NetworkResponse> {
        val networkPage = networkRepository.findBySearch(pageable, title)
        val responsePage = networkPage.map { NetworkResponse.from(it) }
        return PagedModel(responsePage)
    }

    private fun getNetworkById(networkSeq: Int): NetworkEntity {
        return networkRepository.findById(networkSeq).get()
    }
}
