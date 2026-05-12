import { CategoriesResponse, Category } from "@/types/category";
import api from "./api";

export const CategoriesService = {
    getCategoriesByType: async (
        type: "INCOME" | "EXPENSE",
    ): Promise<Category[]> => {
        const response = await api.get<CategoriesResponse>("/categories");
        return response.data.data.filter((category) => category.type === type);
    },
};
