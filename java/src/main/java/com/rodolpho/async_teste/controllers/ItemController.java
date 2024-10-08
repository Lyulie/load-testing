package com.rodolpho.async_teste.controllers;

import com.rodolpho.async_teste.controllers.dto.ItemDto;
import com.rodolpho.async_teste.models.Item;
import com.rodolpho.async_teste.service.ItemService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequestMapping("/items")
public class ItemController {

    private ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    Flux<Item> findAll() {
        return service.findAll();
    }

    @GetMapping(path = "v1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<Item> findAllStream() {
        return Flux.interval(Duration.ofSeconds(1))
                .flatMap(item -> findAll());
    }

    @GetMapping("/{itemId}")
    Mono<Item> getItemById(@PathVariable("itemId") Integer id) {
        return service.findItemById(id);
    }

    @PostMapping
    Mono<Item> createItem(@RequestBody ItemDto dto) {
        return service.createItem(dto);
    }
}
