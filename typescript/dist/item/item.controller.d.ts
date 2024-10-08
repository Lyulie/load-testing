import { Item } from './item.entity';
import { ItemService } from './item.service';
import { Response } from 'express';
import { Observable } from 'rxjs';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    findAll(res: Response): void;
    findAllNewUrl(): Promise<Item[]>;
    findOne(id: number): Observable<Item>;
    create(item: Item): Observable<Item>;
}
