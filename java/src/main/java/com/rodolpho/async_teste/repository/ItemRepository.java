package com.rodolpho.async_teste.repository;

import com.rodolpho.async_teste.models.Item;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends R2dbcRepository<Item, Integer> {
}
