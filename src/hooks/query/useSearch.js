import { SEARCH } from '@/enums/query.enum';
import { useQuery } from '@/hooks/useQuery.hook';

export function useSearch() {
  return useQuery({ field: SEARCH });
}
