export default function useUrlParam(key: string) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return undefined;
}
