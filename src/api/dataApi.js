import requestApi from './api'
import dataURL from './baseUrl'
const dataApi = {
  chainLine(opt){
    return requestApi.post(`${dataURL.chainLine}`,opt);
  },
  count(opt){
    return requestApi.post(`${dataURL.count}`,opt);
  },
  createContract(opt){
    return requestApi.post(`${dataURL.createContract}`,opt);
  },
  executeContract(opt){
    return requestApi.post(`${dataURL.executeContract}`,opt);
  },
  joinCategorys(opt){
    return requestApi.post(`${dataURL.joinCategorys}`,opt);
  },
  joinOrgs(opt){
    return requestApi.post(`${dataURL.joinOrgs}`,opt);
  },
  topCategory(opt){
    return requestApi.post(`${dataURL.topCategory}`,opt);
  },
  topOrg(opt){
    return requestApi.post(`${dataURL.topOrg}`,opt);
  },
}
export default dataApi;
