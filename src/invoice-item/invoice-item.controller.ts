import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItem } from './invoice-item.entity';

@Controller('invoice-items')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Get()
  async findAll(): Promise<InvoiceItem[]> {
    return this.invoiceItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InvoiceItem> {
    return this.invoiceItemService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<InvoiceItem>): Promise<InvoiceItem> {
    return this.invoiceItemService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<InvoiceItem>,
  ): Promise<InvoiceItem> {
    return this.invoiceItemService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.invoiceItemService.remove(id);
  }
}
