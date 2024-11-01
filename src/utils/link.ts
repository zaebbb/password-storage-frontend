export const links = (text: string): string => {
  const regex = /\((.*?)\)#link/g;

  const replaceFunction = (match: string, link: string) => `<a href="${link}" target="_blank">${link}</a>`;

  let result = text.replace(regex, replaceFunction);

  result = result.split(' ').map(word => word === '<a href="'? `<span>${word}</span>` : word).join(' ');

  return result;
}
