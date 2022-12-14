export interface Material {
  companyId: string;
  createdAt: string;

  id: string;

  image: string;
  materialName: string;
  price: number;
  priceUnit: string;
  supplier: string;
  unit: string;
  userId: number | string | undefined;
  workByhour: number;
}

export type ColumnType = {
  createdAt: string;
  id: string;
  image: string;
  materialName: string;
  price: number;
  priceUnit: string;
  supplier: string;
  unit: string;
  workByhour: number;
};
