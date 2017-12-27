/**
 * Created by Benson on 2017/12/27.
 */
const host = 'http://116.62.201.135:8080';

export const findStoreList = function () {
  const URL = '/app/api/store/findStoreList';
  const API = host + URL;
  return API;
};
