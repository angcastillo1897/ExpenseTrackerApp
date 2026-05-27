import { CategoriesService } from "@/services/categories.service";
import { CategoryType } from "@/types/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategoriesByType = (type: "INCOME" | "EXPENSE") => {
    return useQuery({
        queryKey: ["categories", type],
        queryFn: () => CategoriesService.getCategoriesByType(type),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            name: string;
            type: CategoryType;
            color: string;
            iconName: string;
        }) => CategoriesService.createCategory(payload),
        onSuccess: (newCategory) => {
            // Invalidate both tabs to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            id: number;
            name: string;
            color: string;
            iconName: string;
        }) =>
            CategoriesService.updateCategory(payload.id, {
                name: payload.name,
                color: payload.color,
                iconName: payload.iconName,
            }),
        onSuccess: () => {
            // Invalidate all category queries to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
