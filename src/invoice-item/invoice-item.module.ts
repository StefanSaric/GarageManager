import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {InvoiceItem} from "./invoice-item.entity";
@Module({
    imports: [TypeOrmModule.forFeature([InvoiceItem])],
})
export class InvoiceItemModule {}
