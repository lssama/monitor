<template>
  <div class="ring_chart">
    <ve-ring :legend="legend" :series="series" :tooltip='tooltip' width="100%" height="100%"></ve-ring>
  </div>
</template>

<script>
export default {
  props: {
    color: Array,
    dataType: Number,
    ringType: String
  },
  data() {
    return {
      legend: {
        orient: 'vertical',
        x: '48%',
        y: '10%',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        icon: 'rect',
        textStyle: {
          color: '#fff',
          fontSize: 10,
          fontFamily:'PFSC'
        },
        data: []
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c}条&nbsp;&nbsp;{d}%',
        confine: true,
        position: 'right'
      },
      series: {
        type: 'pie',
        avoidLabelOverlap: false,
        center: ['20%', '50%'],
        radius: ['50%', '70%'],
        hoverOffset: 2,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter: '{d}%',
            textStyle: {
              fontSize: 12,
              fontWeight: 800,
              color: '#fff'
            }
          }
        },
        color: [],
        data: []
      },
      screenWidth: document.body.clientWidth,
      timer: null,
      listData: []
    }
  },
  watch: {
    screenWidth(v) {
      let _this = this
      let size = v * 0.0052
      clearTimeout(this.timer)
      setTimeout(function() {
        _this.legend.textStyle.fontSize = size
        _this.legend.itemWidth = size
        _this.legend.itemHeight = size
        _this.series.label.emphasis.textStyle.fontSize = v * 0.00625
      }, 400)
    }
  },
  created() {
    this.series.color = this.color
    if (this.ringType == 'left') {
      this.topCategory()
    } else {
      this.topOrg()
    }
  },
  mounted() {
    const _this = this
    window.addEventListener('resize', function() {
      _this.screenWidth = document.body.clientWidth
    })
    this.screenChange()
  },
  methods: {
    screenChange() {
      let w = document.body.clientWidth;
      if (w <= 1920) {
        if (this.ringType == "left") this.legend.x = "50%";
        else this.legend.x = "40%";
        this.legend.itemGap = 7;
      }
      if (w < 3840 && w > 1920) {
        this.legend.textStyle.fontSize = 16
        this.legend.itemWidth = 16
        this.legend.itemHeight = 16
        this.series.label.emphasis.textStyle.fontSize = 16
      } else if (w >= 3840) {
        this.legend.textStyle.fontSize = 20
        this.legend.itemWidth = 20
        this.legend.itemHeight = 20
        this.legend.itemGap = 15
        this.series.label.emphasis.textStyle.fontSize = 20
      }
    },
    topOrg() {
      this.$dataApi.topOrg().then(res => {
        if (res && res.data && res.code == 200) {
          res.data.forEach((item, index) => {
            if (this.dataType) {
              //传1为数据交换
              this.series.data.push({
                value: item.data_exchange,
                name: item.name,
                cycle: item.cycle_exchange
              })
            } else {
              //否则为资源上链
              this.series.data.push({
                value: item.on_chain,
                name: item.name,
                cycle: item.cycle
              })
            }

            this.legend.data.push(item.name)
          })
        }
      })
    },
    topCategory() {
      this.$dataApi.topCategory().then(res => {
        if (res && res.data && res.code == 200) {
          res.data.forEach((item, index) => {
            if (this.dataType) {
              //传1为数据交换
              this.series.data.push({
                value: item.data_exchange,
                name: item.name,
                cycle: item.cycle_exchange
              })
            } else {
              //否则为资源上链
              this.series.data.push({
                value: item.on_chain,
                name: item.name,
                cycle: item.cycle
              })
            }

            this.legend.data.push(item.name)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ring_chart {
  width: 95%;
  height: 200px;
  margin: auto;
}
</style>
