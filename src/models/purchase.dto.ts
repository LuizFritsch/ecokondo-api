export class PurchaseItemDto {
  name: string;
  value_ek: number;
}

export class PurchaseDto {
  id: number;
  date: Date;
  merchant: string;
  items: PurchaseItemDto[];
  total_ek: number;
}
