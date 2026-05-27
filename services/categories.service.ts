import { CategoriesResponse, Category, CategoryType } from "@/types/category";
import api from "./api";

interface CreateCategoryPayload {
    name: string;
    type: CategoryType;
    color: string;
    iconName: string;
}

interface UpdateCategoryPayload {
    name: string;
    color: string;
    iconName: string;
}

export const CategoriesService = {
    getCategoriesByType: async (
        type: "INCOME" | "EXPENSE",
    ): Promise<Category[]> => {
        const response = await api.get<CategoriesResponse>("/categories");
        return response.data.data.filter((category) => category.type === type);
    },

    createCategory: async (
        payload: CreateCategoryPayload,
    ): Promise<Category> => {
        const response = await api.post<{ data: Category }>(
            "/categories",
            payload,
        );
        return response.data.data;
    },

    updateCategory: async (
        id: number,
        payload: UpdateCategoryPayload,
    ): Promise<Category> => {
        const response = await api.put<{ data: Category }>(
            `/categories/${id}`,
            payload,
        );
        return response.data.data;
    },
};
