import { Controller, Get, Param, Delete, Res, Post, Body } from '@nestjs/common';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    findAll(@Res() res: Response): void {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        // res.setHeader('Connection', 'keep-alive');

        this.itemService.findAll().subscribe({
            next: (items) => {
                let index = 0;
                const sendNextItem = () => {
                    if (index < items.length) {
                        res.write(`data: ${JSON.stringify(items[index])}\n\n`);
                        index++;
                        setTimeout(sendNextItem, 0);
                    } else {
                        res.end();
                    }
                };
                sendNextItem();
            },
            error: (err) => res.status(500).send(err),
        });
    }

    @Get('new-url')
    async findAllNewUrl(): Promise<Item[]> {
        return this.itemService.findAllBlock();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Item> {
        return this.itemService.findOne(id);
    }

    @Post()
    create(@Body() item: Item): Observable<Item> {
        return this.itemService.create(item);
    }
}
