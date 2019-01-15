export default (arr: string[], el: string | Array<string>): string[] => [
  ...new Set(arr.concat(el).flat()),
];
