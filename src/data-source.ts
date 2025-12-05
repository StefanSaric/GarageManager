import { DataSource } from 'typeorm';
import { Garage } from './garage/garage.entity';
import { Invoice } from './invoice/invoice.entity';
import { InvoiceItem } from './invoice-item/invoice-item.entity';
import { User } from './user/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'garage_manager',
  entities: [Garage, Invoice, InvoiceItem, User],
  migrations: ['src/migration/*.js'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
});
