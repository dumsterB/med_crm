import { PAGE } from '@/enums/query.enum';
import { useQuery } from '@/hooks/useQuery.hook';

export function usePage() {
  return useQuery(PAGE);
}
