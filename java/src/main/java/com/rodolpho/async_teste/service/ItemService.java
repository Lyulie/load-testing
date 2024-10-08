package com.rodolpho.async_teste.service;

import com.rodolpho.async_teste.controllers.dto.ItemDto;
import com.rodolpho.async_teste.models.Item;
import com.rodolpho.async_teste.repository.ItemRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ItemService {
    private ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Mono<Item> findItemById(Integer id) {
        return repository.findById(id);
    }

    public Flux<Item> findAll() {
        return repository.findAll();
    }

    public Mono<Item> createItem(ItemDto dto) {
        return repository.save(new Item.Builder()
                .name(dto.name())
                .build());
    }

}
