import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    description: string;

    @Column('int')
    quantity: number;

    @Column('decimal')
    unitPrice: number;

    @Column('decimal')
    totalPrice: number;

    @ManyToOne(() => Invoice, invoice => invoice.items)
    invoice: Invoice;
}
