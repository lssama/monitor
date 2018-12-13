<template>
  <div class="chartsBox">
    <div class="imgBox">
      <div class="text">
        <ul class="textUl">
          <li>
            <div class='countNumBox'>
                <label>发起合约（个）</label>
                <em>{{createContract.create_contract}}</em>
            </div>
          </li>
          <li>
              <div class='countNumBox'>
                  <label>平均每个机构服务业务（个）</label>
                  <em>{{Math.ceil(createContract.data_exchange/createContract.exec_org)}}</em>
              </div>
          </li>
        </ul>
      </div>
      <div id="myChart"></div>
      <div class="text">
        <ul class="textUl textUl1">
          <li>
            <div class="countNumBox">
                <label>参与机构（个）</label>
                <em>{{orgs.count}}</em>
            </div>
            <div class="countNumBox">
                <label>占全部（%）</label>
                <em>{{orgs.cycle | percentChange}}</em>
            </div>
          </li>
          <li>
            <div class="countNumBox">
                <label>资源上链的分类</label>
                <em>{{categorys.count}}</em>
            </div>
            <div class="countNumBox">
                <label>覆盖分类（%）</label>
                <em>{{categorys.cycle | percentChange}}</em>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState,mapGetters } from 'vuex'
  import echarts from 'echarts'
  import axios from 'axios'
  export default {
    name: 'effect',
    components: {
    },
    data () {
      return { 
        allData:{citys:[],moveLines:[]},
        zoom:1,
        option:'',
        orgData:{
          "code": 200, 
          "msg": "ok", 
          "data": [
              {name: "昆明市",value:[73,35]}, 
              {name: "曲靖市",value:[43,80]}, 
              {name: "玉溪市",value:[100,80]}, 
              {name: "昭通市",value:[80,120]}, 
              {name: "保山市",value:[40,130]}, 
              {name: "丽江市",value:[20,160]}, 
              {name: "普洱市",value:[60,180]}, 
              {name: "临沧市",value:[100,200]}, 
              {name: "德宏傣族景颇族自治州",value:[100,240]}, 
              {name: "怒江傈僳族自治州",value:[160,200]}, 
              {name: "大理白族自治州",value:[140,170]}, 
              {name: "大理市",value:[170,130]}, 
              {name: "楚雄市",value:[210,130]}, 
              {name: "红河哈尼族彝族自治州",value:[220,190]}, 
              {name: "文山壮族苗族自治州",value:[200,30]}, 
              {name: "西双版纳傣族自治州",value:[130,130]}, 
          ]
      }
      }
    },
    mounted(){
      var uploadedDataURL = "../../../static/test.json";
        axios.get(uploadedDataURL)
        .then(res=>{
          echarts.registerMap('wuhan', res);
          this.getPoint();
          this.getLine();
          this.option = {
              geo: {
                  map: '北京市',
                  label: {
                      emphasis: {
                          show: false
                      }
                  },
                  roam: true,//是否开启鼠标缩放和平移
                  itemStyle: {
                      normal: {
                          areaColor: '#f00',
                          borderColor: '#404a59'
                      },
                      emphasis: {
                          areaColor: '#2a333d'
                      }
                  }
              },
              series: [{
                  data: this.allData.citys,
                  name: '地点',
                  type: 'effectScatter',
                  coordinateSystem: 'geo',//cartesian2d:xAxisIndex, yAxisIndex,polar:polarIndex,geo: geoIndex
                  zlevel: 2,
                  rippleEffect: {
                      brushType: 'stroke',//stroke,fill
                      period:7,//动画的周期，秒数
                      scale:26
                  },
                  label: {
                      normal:{
                        show:false,
                        position:'top',
                        formatter:'{b}'
                      },
                      emphasis: {
                          show: false,
                          position: 'right',
                          formatter: '{b}'
                      }
                  },
                  symbolSize: 2,
                  symbol:'circle',
                  itemStyle:{
                    color:'#4BE6FF',
                    borderColor:'#4BE6FF',
                    borderWidth:6,
                    borderType:'solid',
                    shadowBlur:10,
                    shadowColor:'#4BE6FF',
                    shadowOffsetX:0,
                    shadowOffsetY:0,
                  },
                  showEffectOn: 'render',//emphasis高亮时显示特效，render绘制完成后显示特效
              }, {
                  name: '线路',
                  type: 'lines',
                  coordinateSystem: 'geo',
                  zlevel: 2,
                  large: true,
                  effect: {
                      show: true,
                      constantSpeed: 30,
                      symbol: 'pin',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                      symbolSize: 6,
                      trailLength: 0,
                      color:'#4BE6FF',
                  },
                  lineStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                                  offset: 0, color: '#fff'
                              }, {
                                  offset: 1, color: '#fff'
                              }], false),
                          width: 1,
                          opacity: 0.6,
                          curveness: 0.2
                      }
                  },
                  data: this.allData.moveLines
              }]
          };
          var myChart = echarts.init(document.getElementById('myChart'));
          myChart.setOption(this.option); 
          window.onresize = ()=>{
            this.getPoint();
            this.getLine();
            var changeOpt=myChart.getOption();
            changeOpt.series[0].data=this.allData.citys;
            changeOpt.series[1].data=this.allData.moveLines;
            myChart.setOption(changeOpt); 
          }
        })
    },
    created(){
    },
    methods: {
      getPoint(){
        this.zoom=document.getElementById('myChart').offsetWidth/266;
        this.allData.citys=this.orgData.data.map((item,index)=>{
          return {
            name:item.name,
            value:[item.value[0]*this.zoom,item.value[1]*this.zoom]
          }
        })
      },
      getLine(){
        let tag=this.allData.citys;
        this.allData.moveLines=[
          {coords:[tag[0].value,tag[4].value]},
          {coords:[tag[4].value,tag[0].value]},
          {coords:[tag[1].value,tag[3].value]},
          {coords:[tag[3].value,tag[1].value]},
          {coords:[tag[2].value,tag[8].value]},
          {coords:[tag[8].value,tag[2].value]},
          {coords:[tag[3].value,tag[6].value]},
          {coords:[tag[6].value,tag[3].value]},
          {coords:[tag[4].value,tag[12].value]},
          {coords:[tag[5].value,tag[15].value]},
          {coords:[tag[6].value,tag[4].value]},
          {coords:[tag[7].value,tag[9].value]},
          {coords:[tag[8].value,tag[5].value]},
          {coords:[tag[9].value,tag[10].value]},
          {coords:[tag[10].value,tag[1].value]},
          {coords:[tag[11].value,tag[14].value]},
          {coords:[tag[12].value,tag[9].value]},
          {coords:[tag[13].value,tag[4].value]},
          {coords:[tag[14].value,tag[7].value]},
          {coords:[tag[15].value,tag[6].value]},
        ];
      },
      getRandom(limit){
        let a=parseInt(Math.random()*(limit+1),10);
        return a;
      },
    },
    computed:{
    ...mapState({
        numCount: state => state.view.numCount,
        orgs: state => state.view.orgs,
        categorys: state =>  state.view.categorys,
        createContract: state => state.view.createContract,
      }),
    }
  }
</script>
 
<style lang="less">
  @import '../../assets/css/main.less';
  .chartsBox{
    position: relative;
    top:-10px;
    overflow:hidden;
    width: 1540px;
    height:564px;
    background: url('../../assets/imgs/ditu.svg') 50%  50% no-repeat;
    background-size:contain;
  }
  .imgBox{
    width:100%;
    height: 100%;
    display: flex;
  }
  #myChart{
    width:533px;
    height:545px;
    margin:0 auto;
  }
  .text{
    flex:1;
    position: relative;
  }
  .countNumBox{
    flex:1;
    text-align: left;
    label{
      font-size:20px;
      color:#fff;
      font-size:20px;
      line-height:1.5;
    }
    em{
      font-weight: bold;
      font-size:50px;
      color:#00CDFF;
      line-height:1.5;
      display: block;
      font-style: normal;
    }
  }
  .textUl{
    margin-left:100px;
    li{
      display: flex;
      margin-top:80px;
    }
  }
  .textUl1{
    margin-left:50px;
  }
</style>
  