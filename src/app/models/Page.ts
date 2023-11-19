export interface Page<T> {
    results: T[];
    currentPage: number;
    pageCount: number;
    pageSize: number;
    recordCount: number;
    totalResult: number;
}