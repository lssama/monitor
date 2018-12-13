<template>
  <div>
      <div class="textBox">
        <span class="t1">数据交换总量累计</span>
        <span class="t2">{{time1}}</span>
        <span class="t2">{{time2}}</span>
      </div>
  <div class="numCount">
    <ul class="numBox" :data='stateCount'>
      <li>
        <em class="countBox">
          <img :class="'numImg'+countList[0]" src="../../assets/imgs/Group7.svg" alt="" />
        </em>
      </li>
      <li class="spaceItem"></li>
      <li>
        <em class="countBox">
          <img :class="'numImg'+countList[1]" src="../../assets/imgs/Group7.svg" alt=""/>
        </em>
        </li>
      <li>
        <em class="countBox">
          <img :class="'numImg'+countList[2]" src="../../assets/imgs/Group7.svg" alt=""/>
        </em></li>
      <li><em class="countBox"><img :class="'numImg'+countList[3]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li class="spaceItem"></li>
      <li><em class="countBox"><img :class="'numImg'+countList[4]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li><em class="countBox"><img :class="'numImg'+countList[5]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li><em class="countBox"><img :class="'numImg'+countList[6]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li class="spaceItem"></li>
      <li class="item2"><em class="countBox"><img :class="'numImg'+countList[7]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li class="item2"><em class="countBox"><img :class="'numImg'+countList[8]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
      <li class="item2"><em class="countBox"><img :class="'numImg'+countList[9]" src="../../assets/imgs/Group7.svg" alt=""></em></li>
    </ul>
  </div>
</div>
</template>

<script>
  import { mapState,mapMutations,mapActions } from 'vuex'
  export default {
    name: 'numCount',
    components: {
    },
    data () {
      return { 
        count:0,
        countLen:0,
        countList:[0,0,0,0,0,0,0,0,0,0],
        clearTime:'',
        time1:'',
        time2:'',
      }
    },
    created(){
      this.getCount();
      this.nowTime();
    },
    mounted(){
    },
    methods: {
      ...mapActions(["getCount"]),
      getTime(date){
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        this.time1=y + '-' + m + '-' + d;
        this.time2=h+':'+minute+':'+second;
      },
      nowTime(){
        let date=new Date();
        this.getTime(date);
        setInterval(()=>{
          date=Date.parse(date)+1000;
          date=new Date(date);
          this.getTime(date);
        },1000)
      },
    },
    components:{
    },
    computed: {
      stateCount(state){
        let temp=`${this.$store.state.view.numCount}`;
        for(let m=0;m<=10-temp.length;m++){
          temp=0+temp;
        }
        this.countLen=temp.length;
        for(let i=0;i<this.countLen;i++){
          this.$set(this.countList,(9-i),parseInt(temp.substr(this.countLen-i-1,1)));
        }
        return this.countList;
      }
    },
  }
</script>
 
<style lang="less">
  @import '../../assets/css/main.less';
  .numCount{
    margin:20px 0 53px 0;
    height:170px;
    padding:0 80px;
  }
  .numBox{
    display: flex;
    justify-content: space-between;
    height:170px;
    margin-bottom:53px;
    li{
      flex:1;
      max-width: 110px;
      max-height:170px;
      background:url('../../assets/imgs/Group2.svg') 50% 50% no-repeat;
      background-size:cover;
    }
    .item2{
      background:url('../../assets/imgs/Group1.svg') 50% 50% no-repeat;
      background-size:cover;
    }
    .spaceItem{
      width:15px;
      height: 27px;
      max-width: 15px;
      max-height: 27px;
      background:url('../../assets/imgs/Rectangle10Copy4.svg') 50% 50% no-repeat;
      background-size:15px 27px;
      margin-top:143px;
    }
  }
  .textBox{
    text-align: center;
    font-size:40px;
    line-height: 56px;
    font-weight: bold;
    padding-top:40px;
  }
  .t1{
    color:#fff;
  }
  .t2{
    color:@textBlue;
    margin-left:40px;
    display: inline-block;
    width:250px;
    text-align:left;
  }
  .countBox{
    width:60px;
    height:120px;
    margin:25px auto 0;
    overflow:hidden;
    display: block;
    img{
      width:100%;
      height:1202px;
      transition:all linear 0.5s 0s;
      display:block;
      position: relative;
      margin-top:20px;
    }
    .numImg0{
      top:5px;
    }
    .numImg1{
      top:-120px;
    }
    .numImg2{
      top:-246px;
    }
    .numImg3{
      top:-370px;
    }
    .numImg4{
      top:-495px;
    }
    .numImg5{
      top:-619px;
    }
    .numImg6{
      top:-745px;
    }
    .numImg7{
      top:-869px;
    }
    .numImg8{
      top:-996px;
    }
    .numImg9{
      top:-1123px;
    } 
  }
  
</style>
  