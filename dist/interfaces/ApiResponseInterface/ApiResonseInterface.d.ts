export interface ResponseResult {
    id: string;
    jobOpeningName: string;
    location: {
        city: string;
    };
    isRemote: null | string;
}
export interface ApiResponse<T> {
    meta: {
        totalCount: number;
    };
    result: T[];
    status: string;
}
//# sourceMappingURL=ApiResonseInterface.d.ts.map