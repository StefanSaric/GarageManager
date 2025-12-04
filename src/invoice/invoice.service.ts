import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { NotFoundException } from '@nestjs/common';

export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: ['items', 'garage'],
    });
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['items', 'garage'],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }

    return invoice;
  }

  create(data: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(data);
    return this.invoiceRepository.save(invoice);
  }

  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    await this.invoiceRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: string) {
    return this.invoiceRepository.delete(id);
  }
}
