import { NUM_COUNT,NUM_COUNT_TEMP } from './mutation-types';
import api from '../api/dataApi'
import axios from 'axios';
const viewIndex = {
  state: {
    numCount: 0,
    orgs:{},
    categorys:{},
    createContract:{},
  },
  getters:{
    numCount:state=>{
      return state.numCount;
    },
    orgs:state=>{
      return state.orgs;
    },
    categorys:state=>{
      return state.categorys;
    },
    createContract:state=>{
      return state.createContract;
    }
  },
  mutations: {
    [NUM_COUNT] (state, res) {
      state.numCount = res[0].data.data_exchange;
      state.createContract = res[0].data;
      state.orgs = res[1].data;
      state.categorys = res[2].data;
    },
    [NUM_COUNT_TEMP] (state, res) {
      state.numCount = res;
    },
  },
  actions: {
    getCount({commit,state},param){
      axios.all([api.count(),api.joinOrgs(),api.joinCategorys()])
      .then(res=>{
        commit(NUM_COUNT,res);
      })
      // setInterval(()=>{
        //   res.data.data_exchange=res.data.data_exchange+parseInt(Math.random()*10);
        //   commit(NUM_COUNT,res);
        // },6000)
      // setInterval(()=>{
      //   commit(NUM_COUNT_TEMP,0);
      // },5900)
      setInterval(()=>{
        let temp='';
        clearTimeout(temp);
        axios.all([api.count(),api.joinOrgs(),api.joinCategorys()])
        .then(res=>{
          commit(NUM_COUNT_TEMP,0);
          temp=setTimeout(()=>{
            commit(NUM_COUNT,res);
          },300)
        })
      },6000)
    },
    
  },
};

export default viewIndex;
