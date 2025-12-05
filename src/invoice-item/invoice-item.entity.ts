import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Entity('invoice_items')
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  unitPrice: number;

  @Column('decimal')
  totalPrice: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;
}
