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

export type ColumnTypeMaterial = {
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

export type ColumnTypeUser = {
  id: string;
  email: string;
  avatar: string;
  userType: string;
  //   userType: "CompanyUser" | "Client" | "CompanyAdmin";
  companyId: string;
  name: string;
};
export type ColumnTypeProject = {
  id?: string;
  projectName: string;
  userId: string;
  workByhour: number;
  companyId?: string;
};

export interface ProjecTMaterialTest {
  getValue<T>(): unknown;
  status: boolean;
  id: string;
  materialId: string;
  projectId: string;
  createdAt: string;
  profit: number;
  material: Material;
  project: Project;
}

export interface Material {
  materialName: string;
  price: number;
  workByhour: number;
  unit: string;
}
export interface Project {
  projectName: string;
}
