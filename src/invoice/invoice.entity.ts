import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Garage } from '../garage/garage.entity';
import { InvoiceItem } from '../invoice-item/invoice-item.entity';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    invoiceNumber: string;

    @Column({ type: 'date' })
    issueDate: Date;

    @Column('decimal')
    totalAmount: number;

    @Column()
    status: string;  // npr. 'open', 'paid', 'cancelled'

    @ManyToOne(() => Garage, garage => garage.invoices)
    garage: Garage;

    @OneToMany(() => InvoiceItem, item => item.invoice)
    items: InvoiceItem[];
}
