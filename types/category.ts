export type CategoryType = "INCOME" | "EXPENSE";

export interface Category {
    id: number;
    name: string;
    type: CategoryType;
    color: string;
    iconName: string;
    isGlobal: boolean;
    createdAt: string;
}

export interface CategoriesResponse {
    data: Category[];
}
