import { PAGE } from '@/enums/query.enum';
import { useQuery } from '@/hooks/useQuery.hook';

export function usePage(defaultValue) {
  return useQuery({
    field: PAGE,
    defaultValue: defaultValue ?? 1,
    valueIsNumber: true,
  });
}
