import { CategoriesService } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";

// export const useCategories = () => {
//     return useQuery({
//         queryKey: ["categories"],
//         queryFn: () => CategoriesService.getCategories(),
//         staleTime: 5 * 60 * 1000, // 5 minutes
//     });
// };

export const useCategoriesByType = (type: "INCOME" | "EXPENSE") => {
    return useQuery({
        queryKey: ["categories", type],
        queryFn: () => CategoriesService.getCategoriesByType(type),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
