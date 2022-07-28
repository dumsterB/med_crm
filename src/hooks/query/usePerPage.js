import { PER_PAGE } from '@/enums/query.enum';
import { useQuery } from '@/hooks/useQuery.hook';
import { DEFAULT_PER_PAGE } from '@/config/api.config';

export function usePerPage(defaultValue) {
  return useQuery(PER_PAGE, defaultValue ?? DEFAULT_PER_PAGE);
}
