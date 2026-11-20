export enum View {
  PROFILE = 'PROFILE',
  POS = 'POS',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  SHOP = 'SHOP',
}

export type DBRecord = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type Product = {
  code: string;
  name: string;
  price: number;
  inventory: number;
} & DBRecord;

export type SaleItem = {
  product_id: string;
  quantity: BigInt;
  discount: BigInt;
} & DBRecord;

export type Sale = {} & DBRecord;

export type SalePayment = { amount: BigInt } & Omit<DBRecord, 'updatedAt'>;
