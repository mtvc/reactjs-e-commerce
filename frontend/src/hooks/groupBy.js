function groupBy(array, key) {
  return array?.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj);
    return result;
  }, {});
}
export default groupBy;
