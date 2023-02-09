/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type CreateUserDto = {
  name: string;
  email: string;
  avatar: string;
  userType: string;
  companyId: string;
  userId: string;
  id?: string;
  password: string;
};

export type UserEntity = {
  email: string;
  avatar: string;
  userType: string;
  companyId: string;
  id: string;
  name: string;
  userId: string;
};

export type UpdateUserDto = {
  name?: string;
  email?: string;
  avatar?: string;
  userType?: string;
  companyId?: string;
  userId?: string;
  id?: string;
};

export type CreateMaterialDto = {
  companyId: string;
  unit: string;
  priceUnit: string;
  image: string;
  workByhour: number;
  materialName: string;
  supplier: string;
  price: number;
  userId: string;
};

export type MaterialEntity = {
  companyId: string;
  unit: string;
  priceUnit: string;
  image: string;
  workByhour: number;
  id: string;
  materialName: string;
  supplier: string;
  /**
   * @format date-time
   */
  createdAt: string;
  price: number;
  userId: string;
};

export type UpdateMaterialDto = {
  companyId?: string;
  unit?: string;
  priceUnit?: string;
  image?: string;
  workByhour?: number;
  materialName?: string;
  supplier?: string;
  price?: number;
  userId?: string;
};

export type CreateCompanyDto = {
  name: string;
  country: string;
  logo: string;
};

export type UpdateCompanyDto = {
  name?: string;
  country?: string;
  logo?: string;
};

export type CreateProjectDto = {
  id: string;
  projectName: string;
  /**
   * @format date-time
   */
  createdAt: string;
  userId: string;
  workByhour: number;
  companyId: string;
};

export type ProjectEntity = {
  id: string;
  projectName: string;
  /**
   * @format date-time
   */
  createdAt: string;
  userId: string;
  workByhour: number;
  companyId: string;
};

export type UpdateProjectDto = {
  id?: string;
  projectName?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  userId?: string;
  workByhour?: number;
  companyId?: string;
};

export type CreateProjectMaterialDto = {
  id: string;
  materialId: string;
  projectId: string;
  /**
   * @format date-time
   */
  createdAt: string;
  profit: number;
  status: boolean;
};

export type ProjectMaterialEntity = {
  id: string;
  materialId: string;
  status: boolean;
  projectId: string;
  /**
   * @format date-time
   */
  createdAt: string;
  profit: number;
};

export type UpdateProjectMaterialDto = {
  id?: string;
  materialId?: string;
  projectId?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  profit?: number;
  status?: boolean;
};

export type CreateInvitedUserDto = {
  companyId: string;
  userId: string;
  projectId: string;
  token: string;
};

export type UpdateInvitedUserDto = {
  companyId?: string;
  userId?: string;
  projectId?: string;
  token?: string;
};

export type CreateTableCustomFieldDto = {
  id: string;
  projectId: string;
  columnName: string;
  columnType: string;
  customFieldValue: Record<string, any>;
};

export type TableCustomFieldEntities = {
  id: string;
  projectId: string;
  columnName: string;
  columnType: string;
  customFieldValue: Record<string, any>;
};

export type UpdateTableCustomFieldDto = {
  id?: string;
  projectId?: string;
  columnName?: string;
  columnType?: string;
  customFieldValue?: Record<string, any>;
};
