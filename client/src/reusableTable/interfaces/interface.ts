export interface Material {
  companyId: string;
  createdAt: string;
  hourPerQuantity: number;
  id: string;

  materialName: string;
  price: number;

  co2e: number;
  unit: string;
  userId: number | string | undefined;
}

export type ColumnType = {
  createdAt: string;
  id: string;
  co2e: number;

  materialName: string;
  price: number;

  unit: string;
  hourPerQuantity: number;
};
