import { useEffect, useState } from "react";

type TProps<T> = {
  pageIdx: number
  pageSize: number
  allList: T[]
}
export default function usePages<T>(props: TProps<T>): T[] {
  const { pageIdx, pageSize, allList } = props;
  const pageCount = Math.ceil(allList.length / pageSize);
  const [list, triggerList] = useState<T[]>([]);

  useEffect(() => {
    if (pageIdx < 1) {
      return
    }
    if (pageIdx > pageCount) {
      return
    }

    const _ = list.slice(
      (pageIdx - 1) * pageSize,
      pageIdx * pageSize
    );
    triggerList(_);
  }, [pageIdx, pageSize, allList]);

  return list;
}
