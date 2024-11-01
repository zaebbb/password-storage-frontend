export const tabs = (text: string): string => {
  const regex = /\((.*?)\)#tab/g;
  const replaceFunction = (match: string, value: string) => `<strong class="card-tab">${value}</strong>`;

  let result = text.replace(regex, replaceFunction);
  result = result.split(' ').map(word => word === '<strong>'? `<strong class="card-tab">${word}</strong>` : word).join(' ');

  return result;
}
