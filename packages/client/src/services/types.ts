export interface NavItem {
  _id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  icon?: string;
  repository?: string;
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
