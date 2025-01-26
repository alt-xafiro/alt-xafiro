export const getDataAttribute = (element: HTMLElement, attribute: string) => {
  if (element === null) return '';

  return element?.getAttribute(`data-${attribute}`) ?? '';
};
