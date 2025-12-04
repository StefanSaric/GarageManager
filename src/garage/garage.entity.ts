import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class Garage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @OneToMany(() => Invoice, (invoice) => invoice.garage)
  invoices: Invoice[];
}
