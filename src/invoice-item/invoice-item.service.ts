import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';

export class InvoiceItemService {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async findAll(): Promise<InvoiceItem[]> {
    return this.invoiceItemRepository.find();
  }

  async findOne(id: string): Promise<InvoiceItem> {
    const item = await this.invoiceItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`InvoiceItem with id ${id} not found`);
    }
    return item;
  }

  async create(data: Partial<InvoiceItem>): Promise<InvoiceItem> {
    const newItem = this.invoiceItemRepository.create(data);
    return this.invoiceItemRepository.save(newItem);
  }

  async update(id: string, data: Partial<InvoiceItem>): Promise<InvoiceItem> {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.invoiceItemRepository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.invoiceItemRepository.remove(item);
  }
}
