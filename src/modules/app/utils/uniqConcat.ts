export default (arr: string[], el: string) => [...new Set(arr.concat(el))];
