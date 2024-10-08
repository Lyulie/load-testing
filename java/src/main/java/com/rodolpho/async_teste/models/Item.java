package com.rodolpho.async_teste.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("items")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Item {
    @Id
    private Integer id;
    private String name;

    @Deprecated
    public Item() { }

    @Override
    public String toString() {
        return String.format("{ \"id\": %d, \"name\": %s }", id, name);
    }

    private Item(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
    }

    public static class Builder {
        private Integer id;
        private String name;

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Item build() {
            return new Item(this);
        }
    }
}