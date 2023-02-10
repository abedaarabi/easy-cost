export interface Material {
  companyId: string;
  createdAt: string;

  id: string;

  image: string;
  materialName: string;
  price: number;
  supplier: string;
  unit: string;
  userId: number | string | undefined;
}

export type ColumnTypeMaterial = {
  createdAt: string;
  id: string;
  image: string;
  materialName: string;
  price: number;
  supplier: string;
  unit: string;
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

  id: string;
  materialId: string;
  projectId: string;
  createdAt: string;
  unit: string;
  quantity: number;
  material: Material;
  project: Project;
  price: number;
  hourPerQuantity: number;
}

export interface Material {
  materialName: string;
  price: number;
  hourPerQuantity: number;
  unit: string;
}
export interface Project {
  projectName: string;
}
