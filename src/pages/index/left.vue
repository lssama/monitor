<template>
  <div class="left">
    <div class="l_title">信息资源上链</div>
    <div class="l_t">
      <div class="item" v-for="(item,index) in dataName" :key='index'>
        <span class="l_t_f">{{item}}</span>
        <span class="l_t_n">{{dataNum[index] |checkNum}}</span>
      </div>
    </div>
    <div class="l_m">
      <veLine :chartType='0'></veLine>
    </div>
    <div class="l_b">
      <div class="l_b_l">
        <div class="l_b_l_t">信息资源上链分类分布图</div>
        <veRing :color='ringLeftColor' :dataType='0' :ringType='"left"'></veRing>
      </div>
      <div class="l_b_r">
        <div class="l_b_l_t">信息资源上链机构分布图</div>
        <veRing :color='ringRightColor' :dataType='0' :ringType='"right"'></veRing>
      </div>
    </div>
  </div>
</template>

<script>
import veRing from "../common/ringChart.vue";
import veLine from "../common/lineChart.vue";
import { mapState } from "vuex";
export default {
  name: "left",
  components: { veRing, veLine },
  data() {
    return {
      dataName: [
        "信息资源上链总量 (条)",
        "信息资源审核量 (条)",
        "提交上链机构 (个)"
      ],
      dataNum: [0, 0, 0],
      lineData: [],
      ringLeftColor: ["#008FFF", "#00F0C2", "#00B4FF", "#8100FC"],
      ringRightColor: ["#3B00E0", "#00F0C2", "#00B4FF", "#FCBF63"]
    };
  },
  computed: {
    ...mapState({
      contractInfo: state => state.view.createContract
    })
  },
  created() {
    this.chainLine();
  },
  watch: {
    contractInfo(newValue, oldValue) {
      this.dataNum = [newValue.onchain, newValue.audit, newValue.orgs];
    }
  },
  methods: {
    chainLine() {
      this.$dataApi.chainLine({ query_type: 0 }).then(res => {
        if (res && res.data && res.code == 200) {
          this.lineData = res.data;
        }
      });
    }
  },
  filters: {
    checkNum(v) {
      // return v.toString().replace(/(?=(?!(\b))(\d{3})+$)/g, ",");
      return parseFloat(v).toLocaleString();
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  margin-left: 40px;
  position: relative;
  margin-top: 29px;
  .l_title {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: -6%;
    left: 50%;
    transform: translateX(-50%);
  }
  .l_t {
    width: 1070px;
    height: 240px;
    background: url("../../assets/imgs/Group3.svg") no-repeat center;
    background-size: 100%;
    margin-bottom: 30px;
    .item {
      height: 33%;
      width: 98%;
      margin: 0 auto;
      line-height: 77px;
      border-bottom: 2px solid #4d5c89;
      box-sizing: border-box;
      padding-left: 105px;
      padding-right: 60px;
      display: flex;
      justify-content: space-between;
      &:last-child {
        border: none;
      }
      .l_t_f {
        color: #fff;
        font-size: 20px;
      }
      .l_t_n {
        font-size: 30px;
        color: #00cdff;
        font-weight: 900;
      }
    }
  }
  .l_m {
    width: 1070px;
    height: 356px;
    // background: url("../../assets/imgs/Group5.svg") no-repeat center;
    background-size: 100%;
    margin-bottom: 30px;
  }
  .l_b {
    width: 1070px;
    height: 272px;
    display: flex;
    justify-content: space-between;
    .l_b_l,
    .l_b_r {
      width: 515px;
      height: 272px;
      background: url("../../assets/imgs/Group6.svg") no-repeat center;
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
      padding-top: 30px;
    }
  }
}
</style>
  