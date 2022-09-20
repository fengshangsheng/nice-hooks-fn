declare type TProps<T> = {
    pageIdx: number;
    pageSize: number;
    allList: T[];
};
export default function usePages<T>(props: TProps<T>): T[];
export {};
