import { MutableRefObject, useEffect, useState } from "react";
import getScrollTop from "./utils/scrollTop";
import antiShake from "./utils/antiShake";

// 当前元素是否处于窗口视图内
export default function useIntersectionObserver(ref: MutableRefObject<HTMLElement | undefined>) {
  const [isView, triggerView] = useState(false);

  useEffect(() => {
    const bindEv = antiShake(() => {
      const scrollTop = getScrollTop();
      const viewH = document.body.clientHeight;

      const eleTop = getParentOffsetTop(ref.current as HTMLElement);
      const eleH = (ref.current as HTMLElement).offsetHeight;

      const bool = (
        (scrollTop < eleTop && (scrollTop + viewH) > eleTop) // 头区间
        || (scrollTop < (eleTop + eleH) && (scrollTop + viewH) > (eleTop + eleH)) // 尾区间
        || (scrollTop > eleTop && (scrollTop + viewH) < (eleTop + eleH)) // 子集
      )
      triggerView(bool);
    }, 0);

    // 初始化时默认执行一次
    bindEv();
    window.addEventListener('scroll', bindEv);
    return () => {
      window.removeEventListener('scroll', bindEv);
    };
  }, []);

  function getParentOffsetTop(dom: HTMLElement, top: number = 0): number {
    if (dom === document.body) {
      return top;
    }

    const borderTop = parseInt(getComputedStyle(dom, 'border-top- width').getPropertyValue('border-top-width'));
    top += dom.offsetTop + borderTop;

    return getParentOffsetTop(dom.offsetParent as HTMLElement, top);
  }

  return isView;
}
