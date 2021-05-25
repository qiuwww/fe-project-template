import request from '@/utils/request';

export async function queryList(url, params) {
  const body = { ...params };
  if (body.pageSize) delete body.pageSize;
  if (body.currentPage) delete body.currentPage;
  return request(`${url}?pageSize=${params.pageSize}&currentPage=${params.currentPage}`, {
    method: 'POST',
    body,
  });
}

export async function queryMenuList(params) {//获取菜单
  return request('/role/menu/list');
}

export async function queryAllCasesList(params) {
  //全部案件 列表获取
  return queryList('/audit/page', params);
}

export async function queryAuditList(params) {
  //审核分单列表获取
  return queryList('/audit/distribute/page', params);
}

export async function queryLoanList(params) {
  //放款列表获取
  return queryList('/audit/loan/page', params);
}

export async function queryAuditCondition(params) {
  //条件列表
  return request('/audit/screen/condition', {
    method: 'GET',
  });
}

export async function queryAuditDistribute(params) {
  //审核分单
  return request('/audit/distribute', {
    method: 'POST',
    body: { ...params },
  });
}

export async function queryAuditAuditor(type) {
  //获取审核员
  return request(`/audit/auditor?type=${type}`, {
    method: 'GET',
  });
}

export async function queryLoanOperate(params) {
  //放款
  return request('/audit/loan/operate', {
    method: 'POST',
    body: { ...params },
  });
}

// user 账户列表的接口

export async function userAdminList(params = {}) {
  return request('/admin/list', {
    ...params,
  });
}

// user 删除用户 /admin/delete
export async function userAdminDelete(params = {}) {
  return request('/admin/delete', {
    ...params,
  });
}
// 禁用与启用
export async function userAdminDisable(params = {}) {
  return request('/admin/freeze', {
    ...params,
  });
}

// 用户角色选择列表 /role/list
export async function userRoleList(params = {}) {
  return request('/role/list', {
    ...params,
  });
}

// 用户角色选择列表 /admin/add
export async function userAdd(params = {}) {
  return request('/admin/add', {
    ...params,
  });
}
// 用户角色选择列表 /admin/update
export async function userUpdate(params = {}) {
  return request('/admin/update', {
    ...params,
  });
}

