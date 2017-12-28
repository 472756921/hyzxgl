/**
 * Created by Benson on 2017/12/27.
 */
const host = 'http://116.62.201.135:8080';


//门店列表
export const findStoreList = function () {
  const URL = '/app/api/store/findStoreList';
  const API = host + URL;
  return API;
};
export const newStore = function () {
  const URL = '/app/api/store/save';
  const API = host + URL;
  return API;
};
export const editStore = function () {
  const URL = '/app/api/store/edit';
  const API = host + URL;
  return API;
};
//项目管理
export const projectsave = function () {
  const URL = '/app/api/project/save';
  const API = host + URL;
  return API;
};
export const projectedit = function () {
  const URL = '/app/api/project/edit';
  const API = host + URL;
  return API;
};
export const findProjectList = function () {
  const URL = '/app/api/project/findProjectList';
  const API = host + URL;
  return API;
};
//员工管理
export const findPostList = function () {
  const URL = '/app/api/post/findPostList';
  const API = host + URL;
  return API;
};
export const findPostsave = function () {
  const URL = '/app/api/post/save';
  const API = host + URL;
  return API;
};
export const findPostedit = function () {
  const URL = '/app/api/post/edit';
  const API = host + URL;
  return API;
};
//客户管理
export const findStoreById = function () {
  const URL = '/app/api/post/findStoreById';
  const API = host + URL;
  return API;
};
