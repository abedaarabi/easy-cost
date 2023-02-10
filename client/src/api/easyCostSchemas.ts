/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type CreateUserDto = {
  name: string;
  email: string;
  userType: string;
  companyId: string;
  userId: string;
  id: string;
};

export type UserEntity = {
  email: string;
  userType: string;
  companyId: string;
  id: string;
  name: string;
  userId: string;
};

export type UpdateUserDto = {
  name?: string;
  email?: string;
  userType?: string;
  companyId?: string;
  userId?: string;
  id?: string;
};

export type CreateProjectMaterialDto = {
  materialId: string;
  projectId: string;
  /**
   * @format date-time
   */
  createdAt: string;
  quantity: number;
};

export type Decimal = {};

export type ProjectMaterialEntity = {
  id: string;
  materialId: string;
  projectId: string;
  /**
   * @format date-time
   */
  createdAt: string;
  quantity: Decimal;
};

export type UpdateProjectMaterialDto = {
  status: any;
  materialId?: string;
  projectId?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  quantity?: number;
};

export type CreateMaterialDto = {
  id: string;
  materialName: string;
  unit: string;
  /**
   * @format date-time
   */
  createdAt: string;
  userId: string;
  co2e: number;
  companyId: string;
  hourPerQuantity: number;
  price: number;
};

export type MaterialEntity = {
  price: number;
  hourPerQuantity: number;
  id: string;
  materialName: string;
  unit: string;
  /**
   * @format date-time
   */
  createdAt: string;
  pricePerHour: Decimal;
  userId: string;
  co2e: number;
  companyId: string;
};

export type UpdateMaterialDto = {
  id?: string;
  materialName?: string;
  unit?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  userId?: string;
  co2e?: number;
  companyId?: string;
  hourPerQuantity?: number;
  price?: number;
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
  location: string;
  companyId: string;
  isActive: boolean;
};

export type ProjectEntity = {
  id: string;
  projectName: string;
  /**
   * @format date-time
   */
  createdAt: string;
  userId: string;
  location: string;
  companyId: string;
  isActive: boolean;
};

export type UpdateProjectDto = {
  id?: string;
  projectName?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  userId?: string;
  location?: string;
  companyId?: string;
  isActive?: boolean;
};

export type CreateInvitedUserDto = {
  companyId: string;
  userId: string;
  projectId: string;
  token: string;
  email: string;
  role: string;
};

export type UpdateInvitedUserDto = {
  companyId?: string;
  userId?: string;
  projectId?: string;
  token?: string;
  email?: string;
  role?: string;
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
