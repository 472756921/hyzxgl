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

//薪资管理

//保存薪资启用与部分数据
export const editSalarySystem = function () {
  const URL = '/app/api/salary/editSalarySystem';
  const API = host + URL;
  return API;
};
//查询薪资（实操提成，业绩提成，奖金，）
export const findSalaryByStore = function () {
  const URL = '/app/api/salary/findSalaryByStore';
  const API = host + URL;
  return API;
};
//查询底薪
export const findByStore = function () {
  const URL = '/app/api/salary/findByStore';
  const API = host + URL;
  return API;
};

//保存实操提成
export const editPracticalExercise = function () {
  const URL = '/app/api/salary/editPracticalExercise';
  const API = host + URL;
  return API;
};
//删除实操提成
export const deletePracticalExercise = function () {
  const URL = '/app/api/salary/deletePracticalExercise';
  const API = host + URL;
  return API;
};
//修改实操启用状态
export const editPracticalExerciseStatus = function () {
  const URL = '/app/api/salary/editPracticalExerciseStatus';
  const API = host + URL;
  return API;
};
//保存业绩提成
export const editPerformanceDrawing = function () {
  const URL = '/app/api/salary/editPerformanceDrawing';
  const API = host + URL;
  return API;
};
//删除业绩提成
export const deletePerformanceDrawing = function () {
  const URL = '/app/api/salary/deletePerformanceDrawing';
  const API = host + URL;
  return API;
};
//修改业绩启用状态
export const editPerformanceDrawingStatus = function () {
  const URL = '/app/api/salary/editPerformanceDrawingStatus';
  const API = host + URL;
  return API;
};

//保存迟到早退罚金
export const editLeaveEarlyFines = function () {
  const URL = '/app/api/salary/editLeaveEarlyFines';
  const API = host + URL;
  return API;
};
//删除迟到早退罚金
export const deleteLeaveEarlyFines = function () {
  const URL = '/app/api/salary/deleteLeaveEarlyFines';
  const API = host + URL;
  return API;
};
//保存事假罚金
export const editLeaveAfine = function () {
  const URL = '/app/api/salary/editLeaveAfine';
  const API = host + URL;
  return API;
};
//删除事假罚金
export const deleteLeaveAfine = function () {
  const URL = '/app/api/salary/deleteLeaveAfine';
  const API = host + URL;
  return API;
};
//保存现金业绩罚金
export const editCashPerformancePpenalty = function () {
  const URL = '/app/api/salary/editCashPerformancePpenalty';
  const API = host + URL;
  return API;
};
//删除现金业绩罚金
export const deleteCashPerformancePpenalty = function () {
  const URL = '/app/api/salary/deleteCashPerformancePpenalty';
  const API = host + URL;
  return API;
};
//保存客流罚金
export const editPassengerFines = function () {
  const URL = '/app/api/salary/editPassengerFines';
  const API = host + URL;
  return API;
};
//删除客流罚金
export const deletePassengerFines = function () {
  const URL = '/app/api/salary/deletePassengerFines';
  const API = host + URL;
  return API;
};
//保存消耗罚金
export const editConsumptionPenalty = function () {
  const URL = '/app/api/salary/editConsumptionPenalty';
  const API = host + URL;
  return API;
};
//删除消耗罚金
export const deleteConsumptionPenalty = function () {
  const URL = '/app/api/salary/deleteConsumptionPenalty';
  const API = host + URL;
  return API;
};

//查询奖金
export const findBonusesJsonByStore = function () {
  const URL = '/app/api/salary/findBonusesJsonByStore';
  const API = host + URL;
  return API;
};
//保存累计客流区间奖励
export const editAccumulativePassengerFlow = function () {
  const URL = '/app/api/salary/editAccumulativePassengerFlow';
  const API = host + URL;
  return API;
};
//删除累计客流区间奖励
export const deleteAccumulativePassengerFlow = function () {
  const URL = '/app/api/salary/deleteAccumulativePassengerFlow';
  const API = host + URL;
  return API;
};
//保存现金业绩奖励
export const editCashReward = function () {
  const URL = '/app/api/salary/editCashReward';
  const API = host + URL;
  return API;
};
//删除现金业绩奖励
export const deleteCashReward = function () {
  const URL = '/app/api/salary/deleteCashReward';
  const API = host + URL;
  return API;
};
//保存实操奖励
export const editPracticeReward = function () {
  const URL = '/app/api/salary/editPracticeReward';
  const API = host + URL;
  return API;
};
//删除实操奖励
export const deletePracticeReward = function () {
  const URL = '/app/api/salary/deletePracticeReward';
  const API = host + URL;
  return API;
};
//保存团队奖金
export const editTeamBonus = function () {
  const URL = '/app/api/salary/editTeamBonus';
  const API = host + URL;
  return API;
};
//删除团队奖金
export const deleteTeamBonus = function () {
  const URL = '/app/api/salary/deleteTeamBonus';
  const API = host + URL;
  return API;
};
//保存活动奖金
export const editActivityBonus = function () {
  const URL = '/app/api/salary/editActivityBonus';
  const API = host + URL;
  return API;
};
//删除活动奖金
export const deleteActivityBonus = function () {
  const URL = '/app/api/salary/deleteActivityBonus';
  const API = host + URL;
  return API;
};
//保存客流奖励
export const editPassengerFlowAwardJson = function () {
  const URL = '/app/api/salary/editPassengerFlowAwardJson';
  const API = host + URL;
  return API;
};

//保存月现金总量
export const editMonthlyCashVolume = function () {
  const URL = '/app/api/salary/editMonthlyCashVolume';
  const API = host + URL;
  return API;
};
//删除月现金总量
export const deleteMonthlyCashVolume = function () {
  const URL = '/app/api/salary/deleteMonthlyCashVolume';
  const API = host + URL;
  return API;
};
//保存月客流总量
export const editTotalMonthlyPassengerFlow = function () {
  const URL = '/app/api/salary/editTotalMonthlyPassengerFlow';
  const API = host + URL;
  return API;
};
//删除月客流总量
export const deleteTotalMonthlyPassengerFlow = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyPassengerFlow';
  const API = host + URL;
  return API;
};
//保存月实操总量
export const editTotalMonthlyExercise = function () {
  const URL = '/app/api/salary/editTotalMonthlyExercise';
  const API = host + URL;
  return API;
};
//删除月实操总量
export const deleteTotalMonthlyExercise = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyExercise';
  const API = host + URL;
  return API;
};
//保存月项目总数
export const editTotalMonthlyProject = function () {
  const URL = '/app/api/salary/editTotalMonthlyProject';
  const API = host + URL;
  return API;
};
//删除月项目总数
export const deleteTotalMonthlyProject = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyProject';
  const API = host + URL;
  return API;
};
//保存员工底薪
export const editStaffLevelBaseSalary = function () {
  const URL = '/app/api/salary/editStaffLevelBaseSalary';
  const API = host + URL;
  return API;
};
//删除员工底薪
export const deleteStaffLevelBaseSalary = function () {
  const URL = '/app/api/salary/deleteStaffLevelBaseSalary';
  const API = host + URL;
  return API;
};

//卡项管理

//获取会员卡
export const findMembership = function () {
  const URL = '/app/api/membership/findMembership';
  const API = host + URL;
  return API;
};
//保存会员卡
export const saveMembership = function () {
  const URL = '/app/api/membership/save';
  const API = host + URL;
  return API;
};
//编辑会员卡
export const editMembership = function () {
  const URL = '/app/api/membership/edit';
  const API = host + URL;
  return API;
};
//删除会员卡
export const deleteMembership = function () {
  const URL = '/app/api/membership/delete';
  const API = host + URL;
  return API;
};
//获取拓客卡
export const findExtension = function () {
  const URL = '/app/api/extension/findExtension';
  const API = host + URL;
  return API;
};
//保存拓客卡
export const saveExtension = function () {
  const URL = '/app/api/extension/save';
  const API = host + URL;
  return API;
};
//编辑拓客卡
export const editExtension = function () {
  const URL = '/app/api/extension/edit';
  const API = host + URL;
  return API;
};
//删除拓客卡
export const deleteExtension = function () {
  const URL = '/app/api/extension/delete';
  const API = host + URL;
  return API;
};
//获取疗程组合卡
export const findTreatment = function () {
  const URL = '/app/api/treatment/findTreatment';
  const API = host + URL;
  return API;
};
//保存疗程组合卡
export const saveTreatment = function () {
  const URL = '/app/api/treatment/save';
  const API = host + URL;
  return API;
};
//编辑疗程组合卡
export const editTreatment = function () {
  const URL = '/app/api/treatment/edit';
  const API = host + URL;
  return API;
};
//删除疗程组合卡
export const deleteTreatment = function () {
  const URL = '/app/api/treatment/delete';
  const API = host + URL;
  return API;
};
//获取产品卡
export const findproductCard = function () {
  const URL = '/app/api/productCard/findproductCard';
  const API = host + URL;
  return API;
};
//保存产品卡
export const saveproductCard = function () {
  const URL = '/app/api/productCard/save';
  const API = host + URL;
  return API;
};
//编辑产品卡
export const editproductCard = function () {
  const URL = '/app/api/productCard/edit';
  const API = host + URL;
  return API;
};
//删除产品卡
export const deleteproductCard = function () {
  const URL = '/app/api/productCard/delete';
  const API = host + URL;
  return API;
};
//获取活动卡
export const findactivity = function () {
  const URL = '/app/api/activity/findactivity';
  const API = host + URL;
  return API;
};
//保存活动卡
export const saveactivity = function () {
  const URL = '/app/api/activity/save';
  const API = host + URL;
  return API;
};
//编辑活动卡
export const editactivity = function () {
  const URL = '/app/api/activity/edit';
  const API = host + URL;
  return API;
};
//删除活动卡
export const deleteactivity = function () {
  const URL = '/app/api/activity/delete';
  const API = host + URL;
  return API;
};
//获取全部项目
export const findAllProject = function () {
  const URL = '/app/api/project/findAllProject';
  const API = host + URL;
  return API;
};
