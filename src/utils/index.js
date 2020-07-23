import { parse } from 'qs';

export const getLocationParams = () => {
  return parse(window.location.search.split('?')[1])
}