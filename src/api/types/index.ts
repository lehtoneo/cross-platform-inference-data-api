export interface Pagination {
  page: number;
  limit: number;
}

export const isPagination = (obj: any): obj is Pagination => {
  return (
    'page' in obj &&
    'limit' in obj &&
    typeof obj.page === 'number' &&
    typeof obj.limit === 'number'
  );
};
