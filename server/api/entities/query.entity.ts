import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IModelAddress, IModelQuery } from '../services/interface'
import { BaseEntity } from './base.entity';

@Entity()
export class QueryEntity extends BaseEntity implements IModelQuery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    client_ip: string;

    @Column()
    domain: string;

    @Column('simple-array', { name: 'addresses' })
    addresses: IModelAddress[];
}