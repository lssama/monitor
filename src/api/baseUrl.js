// const baseURL='http://172.16.0.97:8080'
// const baseURL = 'http://106.75.22.174:8280/v1'
const baseURL = 'http://106.75.122.173:31380/v1'
// const baseURL='http://api.switch-monitor.zsbatech.com/v1'
const URL = {
    //登录
    chainLine: `${baseURL}/data/chain-line`, //数据上链/交换趋势图
    count: `${baseURL}/data/count`, //数据交换总量统计(上链/审核/机构)
    createContract: `${baseURL}/data/create-contract`, //获取发起合约统计
    executeContract: `${baseURL}/data/execute-contract`, //执行合约统计
    joinCategorys: `${baseURL}/data/join-categorys`, //获取上链目录分类总数统计
    joinOrgs: `${baseURL}/data/join-orgs`, //获取参与机构统计数
    topCategory: `${baseURL}/data/top-category`, //获取资源上链目录分类分布图
    topOrg: `${baseURL}/data/top-org`, //获取资源上链机构分布图

}
export default URL