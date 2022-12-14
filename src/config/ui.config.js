import { DEFAULT_PER_PAGE } from '@/config/api.config';

export const PAGE_SIZE_STEP = DEFAULT_PER_PAGE;

export const PAGE_SIZES = [
  DEFAULT_PER_PAGE,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP * 2,
  DEFAULT_PER_PAGE + PAGE_SIZE_STEP * 3,
];

export const DRAWER_DEFAULT_DIRECTION = 'rtl';
export const DRAWER_DEFAULT_SIZE = '480px';

export const DEFAULT_PRICE_DELIMITER = ' ';
