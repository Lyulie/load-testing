import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ) {}

    findAll(): Observable<Item[]> {
        return from(this.itemsRepository.find());
    }

    findAllBlock(): Promise<Item[]> {
        return this.itemsRepository.find();
    }

    create(item: Item): Observable<Item> {
        return from(this.itemsRepository.save(item));
    }

    findOne(id: number): Observable<Item> {
        return from(this.itemsRepository.findOneBy({ id }));
    }
}
