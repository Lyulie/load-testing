import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Observable } from 'rxjs';
export declare class ItemService {
    private itemsRepository;
    constructor(itemsRepository: Repository<Item>);
    findAll(): Observable<Item[]>;
    findAllBlock(): Promise<Item[]>;
    create(item: Item): Observable<Item>;
    findOne(id: number): Observable<Item>;
}
