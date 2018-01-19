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
//查找症状
export const findproblemList = function () {
  const URL = '/app/api/problem/findProblemList';
  const API = host + URL;
  return API;
};
export const saveproblem = function () {
  const URL = '/app/api/problem/save';
  const API = host + URL;
  return API;
};
export const editproblem = function () {
  const URL = '/app/api/problem/edit';
  const API = host + URL;
  return API;
};
export const deleteproblem = function () {
  const URL = '/app/api/problem/delete';
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
  const URL = '/app/api/store/findStoreById';
  const API = host + URL;
  return API;
};
export const editStoreCustomer = function () {
  const URL = '/app/api/store/editStoreCustomer';
  const API = host + URL;
  return API;
};

//报表
//获取顾问月报
export const findConsultantMonthlyReport = function () {
  const URL = '/app/api/report/findConsultantMonthlyReport';
  const API = host + URL;
  return API;
};
//保存顾问月报
export const saveOrUpateConsultantMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateConsultantMonthlyReport';
  const API = host + URL;
  return API;
};
//获取美容师月报
export const findBeauticianMonthlyReport = function () {
  const URL = '/app/api/report/findBeauticianMonthlyReport';
  const API = host + URL;
  return API;
};
//保存美容师月报
export const saveOrUpateBeauticianMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateBeauticianMonthlyReport';
  const API = host + URL;
  return API;
};

//获取美发技师报表
export const findHairTechnicianMonthlyReport = function () {
  const URL = '/app/api/report/findHairTechnicianMonthlyReport';
  const API = host + URL;
  return API;
};
//保存美发技师报表
export const saveOrUpateHairTechnicianMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateHairTechnicianMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店长月报
export const findManagerOfTheMonthlyReport = function () {
  const URL = '/app/api/report/findManagerOfTheMonthlyReport';
  const API = host + URL;
  return API;
};

//保存店长月报
export const saveOrUpateManagerOfTheMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateManagerOfTheMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店月报
export const findShopMonthlyReport = function () {
  const URL = '/app/api/report/findShopMonthlyReport';
  const API = host + URL;
  return API;
};
//保存店月报
export const saveOrUpateShopMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateShopMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店日报
export const findDailyStoreDesign = function () {
  const URL = '/app/api/report/findDailyStoreDesign';
  const API = host + URL;
  return API;
};
//保存店日报
export const saveOrUpateDailyStoreDesign = function () {
  const URL = '/app/api/report/saveOrUpateDailyStoreDesign';
  const API = host + URL;
  return API;
};
//获取详细店日报
export const findShopDailyDetails = function () {
  const URL = '/app/api/report/findShopDailyDetails';
  const API = host + URL;
  return API;
};
//保存详细店日报
export const saveOrUpateShopDailyDetails = function () {
  const URL = '/app/api/report/saveOrUpateShopDailyDetails';
  const API = host + URL;
  return API;
};

