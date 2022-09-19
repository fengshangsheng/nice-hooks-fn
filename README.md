### useIntersectionObserver()

监听页面滚动,指定的元素是否处于浏览器窗口视图内
> 浏览器api,IntersectionObserver不兼容IE

```javascript
function App() {
  const $ref = useRef();
  const inView = useIntersectionObserver($ref);
  return <div ref={$ref}>元素</div>
}
```

### usePages()

```javascript
function App() {
  const view = usePage({
    pageIdx: 1,
    pageSize: 3,
    allList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  });
  return <div>
    {view.map((item) => <span>{item}</span>)}
  </div>
}
```
