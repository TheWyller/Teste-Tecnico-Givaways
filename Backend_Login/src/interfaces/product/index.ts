export interface IProductRequest {
  name: string;
  category: string;
  quantity: string;
  status?: boolean;
}

export interface IProductCreated extends IProductRequest {
  id?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IProductUpdate {
  name?: string;
  category?: string;
  quantity?: string;
  status?: boolean;
}
