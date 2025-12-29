# agents.md - Expense Tracker App

## Project Overview

**App Name:** Expense Tracker App  
**Framework:** React Native with Expo  
**Primary Goal:** Build a clean, maintainable expense tracking application following senior-level best practices

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and build toolchain
- **NativeWind CSS** - Tailwind CSS for React Native styling
- **TanStack React Query** - Server state management, caching, and data fetching
- **Custom Components** - Reusable UI component library

## Project Structure

```
expensetrackerapp/
├── app/                      # Expo Router app directory
├── components/               # Reusable custom components
│   ├── ui/                  # Base UI components (buttons, inputs, cards)
│   └── features/            # Feature-specific components
├── hooks/                    # Custom React hooks
├── services/                 # API services and external integrations
├── utils/                    # Helper functions and utilities
├── constants/               # App constants and configuration
├── types/                   # TypeScript type definitions
└── lib/                     # Third-party library configurations
```

## Architecture Principles

### 1. Component Design

- **Single Responsibility**: Each component should have one clear purpose
- **Composition over Inheritance**: Build complex UIs from simple, reusable components
- **Props Interface**: Always define clear TypeScript interfaces for component props
- **Custom Components**: Leverage the existing custom component library for consistency

### 2. State Management Strategy

- **Local State**: Use `useState` for component-specific UI state
- **Server State**: Use TanStack React Query for all server data (expenses, categories, budgets)
- **Query Keys**: Organize with hierarchical structure: `['expenses', 'list']`, `['expenses', 'detail', id]`
- **Optimistic Updates**: Implement for better UX on mutations

### 3. Styling Conventions

- **NativeWind CSS**: Primary styling method using Tailwind utility classes
- **Consistent Spacing**: Use Tailwind spacing scale (p-4, m-2, gap-3, etc.)
- **Theme Support**: Design for light/dark mode from the start
- **Responsive Design**: Use responsive utilities when needed

### 4. Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Follow Airbnb style guide with React Native extensions
- **File Naming**:
    - Components: PascalCase (ExpenseCard.tsx)
    - Hooks: camelCase with 'use' prefix (useExpenses.ts)
    - Utils: camelCase (formatCurrency.ts)
- **Import Order**: External → Internal → Relative imports

## Development Patterns

### Component Pattern

```typescript
interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
}

export function ExpenseCard({ expense, onPress }: ExpenseCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg"
    >
      {/* Component content */}
    </Pressable>
  );
}
```

### React Query Hook Pattern

```typescript
export function useExpenses(filters?: ExpenseFilters) {
    return useQuery({
        queryKey: ["expenses", "list", filters],
        queryFn: () => expenseService.getExpenses(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useCreateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: expenseService.createExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
    });
}
```

### Custom Hook Pattern

```typescript
export function useFormattedCurrency(amount: number) {
    const locale = useUserLocale();

    return useMemo(() => formatCurrency(amount, locale), [amount, locale]);
}
```

## File Organization Rules

### Components (`/components`)

- Group by feature or UI type
- Include component, styles (if needed), and tests in same folder
- Export from index.ts for clean imports

### Hooks (`/hooks`)

- One hook per file
- Prefix with 'use'
- Co-locate related hooks (e.g., all expense-related hooks together)

### Services (`/services`)

- API client configuration
- Service modules per domain (expenseService, categoryService)
- Error handling and response transformation

### Types (`/types`)

- Shared TypeScript interfaces and types
- Domain models (Expense, Category, Budget)
- API request/response types

## Best Practices Checklist

### Performance

- [ ] Memoize expensive calculations with `useMemo`
- [ ] Optimize re-renders with `React.memo` when appropriate
- [ ] Use `useCallback` for callback props passed to child components
- [ ] Implement virtualization for long lists (FlashList)
- [ ] Configure proper React Query cache times

### User Experience

- [ ] Loading states for all async operations
- [ ] Error boundaries for graceful error handling
- [ ] Optimistic updates for instant feedback
- [ ] Pull-to-refresh on list screens
- [ ] Proper keyboard handling and dismissal

### Data Fetching

- [ ] Centralize API configuration
- [ ] Handle loading, error, and success states
- [ ] Implement retry logic for failed requests
- [ ] Use background refetching appropriately
- [ ] Cache invalidation strategies

### Code Quality

- [ ] No console.logs in production code
- [ ] Proper error logging and monitoring
- [ ] Meaningful variable and function names
- [ ] Comments for complex logic only
- [ ] Regular dependency updates

## Performance Optimization

### React Query Configuration

```typescript
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
```

### List Optimization

- Use `FlatList` for better performance
- Implement proper `keyExtractor`
- Use `getItemLayout` when items have fixed heights
- Limit initial render with `initialNumToRender`

## Common Pitfalls to Avoid

1. **Don't use inline styles** - Use NativeWind classes
2. **Don't fetch in useEffect** - Use React Query
3. **Don't create objects/functions in render** - Use useMemo/useCallback
4. **Don't ignore TypeScript errors** - Fix them properly
5. **Don't over-abstract** - Keep it simple until complexity demands it
6. **Don't skip error handling** - Always handle errors gracefully
7. **Don't ignore accessibility** - Use proper labels and roles

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Native Best Practices](https://reactnative.dev/docs/performance)

## Notes for AI Assistants

When working on this project:

1. Always use TypeScript with proper typing
2. Prefer functional components with hooks
3. Use NativeWind classes for all styling
4. Implement data fetching with React Query hooks
5. Follow the established folder structure
6. Write clean, self-documenting code
7. Consider performance implications
8. Maintain consistency with existing patterns
9. Ask for clarification when requirements are ambiguous
10. Suggest improvements aligned with senior-level standards
11. Dont create md files to doc for every change
