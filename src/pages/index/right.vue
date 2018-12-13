<template>
  <div class="right">
    <div class="l_title">数据交换</div>
    <div class="data-info clear">
      <ul class="fl left-ul">
        <li v-for="(item, i) in contractName" :key="i">
          <span>{{item}}</span>
          <span v-if="i !== 2">{{contractData[i] | formatNum}}</span>
          <span v-else>{{contractData[2] | formatScale}}%</span>
        </li>
      </ul>
      <ul class="fr right-ul">
        <li v-for="(item,i) in changeName" :key="i">
          <span>{{item}}</span>
          <span>{{changeData[i] | formatNum}}</span>
        </li>
      </ul>
    </div>
    <LineChart :chartType="1"></LineChart>
    <div class="l_b">
      <div class="l_b_l">
        <div class="l_b_l_t">数据交换分类分布图</div>
        <veRing :color='ringLeftColor' :dataType='1' :ringType='"left"'></veRing>
      </div>
      <div class="l_b_r">
        <div class="l_b_l_t">数据交换机构分布图</div>
        <veRing :color='ringRightColor' :dataType='1' :ringType='"right"'></veRing>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LineChart from '../common/lineChart.vue'
import veRing from '../common/ringChart.vue'
import api from '../../api/dataApi.js'
export default {
  name: 'right',
  components: {
    LineChart,
    veRing
  },
  data() {
    return {
      contractData: [],
      contractName: ['发起合约(条)', '执行合约(条)', '执行占比'],
      changeData: [],
      changeName: [
        '数据交换(次)',
        '执行机构(个)',
        '机构平均交换(次)',
        '合约平均交换(次)'
      ],
      ringLeftColor: ['#008FFF', '#00F0C2', '#00B4FF', '#8100FC'],
      ringRightColor: ['#3B00E0', '#00F0C2', '#00B4FF', '#FCBF63']
    }
  },
  methods: {
    getAllData() {
      api.executeContract({ query_type: 0 }).then(res => {
        if (res && res.code === 200) {
          let conInfo = this.contractInfo
          this.contractData = [
            conInfo.create_contract,
            conInfo.exec_contract,
            res.data.cycle * 100
          ]
          let meanOrg = Math.round(conInfo.data_exchange / conInfo.exec_org),
            meanCon = Math.round(
              conInfo.data_exchange / conInfo.create_contract
            )
          this.changeData = [
            conInfo.data_exchange,
            conInfo.exec_org,
            meanOrg,
            meanCon
          ]
        }
      })
    }
  },
  created() {
    this.getAllData()
  },
  filters: {
    formatNum(value) {
      if (value) {
        return parseInt(value).toLocaleString()
      } else {
        return 0
      }
    },
    formatScale (v) {
      if(v) {
        return v.toFixed(2)
      }else {
        return '0.00'
      }
    }
  },
  computed: {
    ...mapState({
      contractInfo: state => state.view.createContract
    })
  },
  watch: {
    contractInfo : {
      handler: function () {
        this.getAllData()
      },
      deep : true
    }
  }
}
</script>

<style lang="less">
.right {
  position: relative;
  margin-top: 30px;
  .l_title {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: -6%;
    left: 50%;
    transform: translate(-50%);
  }
  .data-info {
    width: 1070px;
    height: 235px;
    margin-bottom: 30px;
    ul {
      box-sizing: border-box;
      height: 100%;
      width: 48%;
      padding: 0 15px;
      background: url('../../assets/imgs/Group4.svg') no-repeat center;
      background-size: 100%;
      color: #fff;
      li {
        span:first-child {
          float: left;
          font-size: 20px;
        }
        span:last-child {
          float: right;
          font-size: 30px;
          color: #00cdff;
          font-weight: bold;
        }
      }
      li:after {
        content: '';
        display: block;
        height: 0;
        overflow: hidden;
        clear: both;
      }
      li:last-child {
        border: none;
      }
    }
    .left-ul {
      li {
        height: 32%;
        padding: 0 50px;
        line-height: 75px;
        border-bottom: 1px solid rgb(77, 92, 137);
      }
    }
    .right-ul {
      li {
        height: 23%;
        padding: 0 50px;
        line-height: 55px;
        border-bottom: 1px solid rgb(77, 92, 137);
      }
    }
  }
  .l_b {
    margin-top: 30px;
    width: 1070px;
    height: 272px;
    display: flex;
    justify-content: space-between;
    .l_b_l,
    .l_b_r {
      width: 515px;
      height: 272px;
      background: url('../../assets/imgs/Group6.svg') no-repeat center;
      background-size: 100%;
      margin-right: 30px;
      display: inline-block;
    }
    .l_b_r {
      margin-right: 0;
    }
    .l_b_l_t {
      width: 95%;
      margin: auto;
      font-size: 30px;
      color: #ffffff;
      font-weight: 600;
      box-sizing: border-box;
      padding-left: 40px;
      padding-top: 20px;
    }
  }
}
</style>
  