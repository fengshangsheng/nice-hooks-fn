import { useState, useEffect } from 'react';

// 获取页面滚动高度
function getScrollTop() {
    let scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

// 节流
function throttling(fn, ms = 300) {
    function _() {
        let flag = false;
        return () => {
            if (flag) {
                return;
            }
            flag = true;
            setTimeout(() => {
                flag = false;
            }, ms);
            if (typeof fn === 'function') {
                fn();
            }
        };
    }
    return _();
}

// 当前元素是否处于窗口视图内
function useIntersectionObserver(ref) {
    const [isView, triggerView] = useState(false);
    useEffect(() => {
        const bindEv = throttling(() => {
            const scrollTop = getScrollTop();
            const viewH = document.body.clientHeight;
            const eleTop = getParentOffsetTop(ref.current);
            const eleH = ref.current.offsetHeight;
            const bool = ((scrollTop < eleTop && (scrollTop + viewH) > eleTop) // 头区间
                || (scrollTop < (eleTop + eleH) && (scrollTop + viewH) > (eleTop + eleH)) // 尾区间
                || (scrollTop > eleTop && (scrollTop + viewH) < (eleTop + eleH)) // 子集
            );
            triggerView(bool);
        }, 0);
        // 初始化时默认执行一次
        bindEv();
        window.addEventListener('scroll', bindEv);
        return () => {
            window.removeEventListener('scroll', bindEv);
        };
    }, []);
    function getParentOffsetTop(dom, top = 0) {
        if (dom === document.body) {
            return top;
        }
        const borderTop = parseInt(getComputedStyle(dom, 'border-top- width').getPropertyValue('border-top-width'));
        top += dom.offsetTop + borderTop;
        return getParentOffsetTop(dom.offsetParent, top);
    }
    return isView;
}

function usePages(props) {
    const { pageIdx, pageSize, allList } = props;
    const pageCount = Math.ceil(allList.length / pageSize);
    const [list, triggerList] = useState([]);
    useEffect(() => {
        if (pageIdx < 1) {
            return;
        }
        if (pageIdx > pageCount) {
            return;
        }
        const _ = list.slice((pageIdx - 1) * pageSize, pageIdx * pageSize);
        triggerList(_);
    }, [pageIdx, pageSize, allList]);
    return list;
}

var index = {
    useIntersectionObserver,
    usePages
};

export { index as default };
