import { PER_PAGE } from '@/enums/query.enum';
import { useQuery } from '@/hooks/useQuery.hook';

export function usePerPage() {
  return useQuery(PER_PAGE);
}
