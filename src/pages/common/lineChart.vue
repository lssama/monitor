<template>
  <div class="lineBox">
    <div class="line-title">{{chartType | chartTitle}}</div>
    <div class="legend-box">
      <i></i>
      <span>本周</span>
      <i class="last-icon"></i>
      <span>上周</span>
    </div>
    <ve-line :series="series" :xAxis="xAxis" :tooltip="tooltip" :yAxis="yAxis" width="95%" :height="height"></ve-line>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../api/dataApi.js'
export default {
  name: 'lineChart',
  components: {},
  props: {
    chartType: Number
  },
  data() {
    return {
      height: '105%',
      tooltip: {
        textStyle: {
          fontSize: 16
        }
      },
      lineData: [],
      xAxis: [
        {
          type: 'category',
          offset: 5,
          boundaryGap: false,
          data: ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'],
          axisLabel: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '10',
            interval: 0,
            rotate: 55
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .5)'
            }
          }
        }
      ],
      yAxis: {
        type: 'value',
        position: 'left',
        offset: 5,
        minInterval: 1,
        boundaryGap: [0, 0.1],
        axisLabel: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
          formatter: function(value, index) {
            return value
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, .2)'
          }
        }
      },
      series: [
        {
          type: 'line',
          data: [],
          color: '#00B4FF',
          smooth: false
        },
        {
          type: 'line',
          // symbol: "circle",
          data: [],
          color: '#02DFD2',
          smooth: false
        }
      ]
    }
  },
  methods: {
    getLineData() {
      let param = {
        query_type: this.chartType
      }
      api.chainLine(param).then(res => {
        if (res && res.code === 200) {
          this.lineData = res.data
          this.lineData[0].forEach(x => {
            this.series[0].data.push({
              name: x.ymd,
              value: x.value
            })
          })
          this.lineData[1].forEach(x => {
            this.series[1].data.push({
              name: x.ymd,
              value: x.value
            })
          })
          let w = document.body.clientWidth
          this.tooltip = {
            textStyle: {
              fontFamily: 'PFSC',
              fontSize: w > 11500 ? w * 0.0026 : 16
            },
            trigger: 'axis',
            formatter: function(params) {
              return `日期: ${params[1].name}&nbsp;&nbsp;数量: ${
                params[1].value
              }<br/>日期: ${params[0].name}&nbsp;&nbsp;数量: ${params[0].value}`
            }
          }
        }
      })
    },
    setCanvasH() {
      let w = document.body.clientWidth
      let f_size = w > 11500 ? w * 0.0025 : w * 0.0052
      this.xAxis[0].axisLabel.fontSize = f_size
      this.yAxis.axisLabel.fontSize = f_size
      if (w <= 1920) {
        this.height = '113%'
      } else if (w <= 3100) {
        this.height = '110%'
      } else if (w <= 11500) {
        this.height = '97%'
      } else {
        this.height = '90%'
      }
    }
  },
  mounted() {
    this.getLineData()
    this.setCanvasH()
    window.addEventListener(
      'resize',
      () => {
        this.setCanvasH()
      },
      false
    )
  },
  filters: {
    chartTitle(value) {
      switch (value) {
        case 0:
          return '信息资源上链实时趋势图'
          break
        case 1:
          return '数据交换实时趋势图'
          break
        default:
          return '正在加载信息'
      }
    }
  },
  computed: mapState({})
}
</script>

<style lang="less">
.lineBox {
  position: relative;
  font-size: 20px;
  .line-title {
    position: absolute;
    left: 40px;
    top: 30px;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
  }
  .legend-box {
    position: absolute;
    top: 30px;
    right: 140px;
    // color: rgb(77, 92, 137);
    color: #fff;
    i {
      display: inline-block;
      position: relative;
      height: 26px;
      width: 26px;
      margin-right: 10px;
      top: 5px;
    }
    i:first-child {
      background-color: #02dfd2;
    }
    i.last-icon {
      background-color: #00b4ff;
      margin-left: 60px;
    }
  }
  width: 1070px;
  height: 360px;
  background: url('../../assets/imgs/Group5.svg') no-repeat center;
  background-size: cover;
  .ve-line {
    top: -15px;
    left: 40px;
  }
  @media screen and (min-width: 3100px) {
    .ve-line {
      top: 40px;
    }
  }
  @media screen and (min-width: 11500px) {
    .ve-line {
      top: 60px;
    }
  }
}
</style>
  