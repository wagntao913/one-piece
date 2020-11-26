<template>
  <canvas
    id="canvas"
    :width="width"
    :height="height"
    @click="refreshCanvas()"
  ></canvas>
</template>

<script>
import { getSmsCode } from "@/api";
import { onMounted, reactive, toRefs } from "vue";
export default {
  props: {
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 30
    }
  },
  setup() {
    const state = reactive({
      verification: ""
    });

    // 随机颜色背景
    const ranbColor = (min, max) => {
      let r = Math.floor(Math.random() * (max - min + 1) + min);
      let g = Math.floor(Math.random() * (max - min + 1) + min);
      let b = Math.floor(Math.random() * (max - min + 1) + min);
      return `rgb(${r},${g},${b})`;
    };
    // 随机范围数
    const ranbNum = (min, max) => {
      var num = Math.floor(Math.random() * (max - min + 1) + min);
      return num;
    };

    // 绘制验证码
    const draw = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas && canvas.getContext("2d");
      const canvasHeight = canvas.clientHeight;
      const canvasWidth = canvas.clientWidth;

      //清空之前的矩形,释放空间
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 绘制矩形
      ctx.fillStyle = ranbColor(170, 250);
      ctx.rect(0, 0, canvasWidth, canvasHeight);
      ctx.fill();

      // 绘制后端返回验证码
      const smscode = state.verification && state.verification.split("");
      smscode.forEach((el, index) => {
        ctx.fillStyle = ranbColor(60, 160);
        ctx.font = ranbNum(15, 30) + "px SimHei";
        ctx.fillText(el, ranbNum(5, 10) + index * 18, ranbNum(15, 25)); //字体填充(字内容,x轴,y轴)位置都是随机
      });

      // 绘制干扰线
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); //路径开始,子路经的集合
        ctx.moveTo(ranbNum(0, canvasWidth), ranbNum(0, canvasHeight)); //起始点(x,y),都随机
        ctx.lineTo(ranbNum(0, canvasWidth), ranbNum(0, canvasHeight)); //终止点(x,y)
        ctx.strokeStyle = ranbColor(60, 160); //路径的颜色
        ctx.stroke(); //将上面的两个点连接起来
      }

      // 绘制干扰点
      for (let i = 0; i < 20; i++) {
        ctx.beginPath(); //路径开始
        ctx.arc(
          ranbNum(0, canvasWidth),
          ranbNum(0, canvasHeight),
          1,
          0,
          6 * Math.PI
        ); //画圆(x,y,z,0,2*Math.PI) x坐标,y坐标,半径,完整圆
        ctx.strokeStyle = ranbColor(60, 160);
        ctx.stroke();
      }
    };

    // 刷新画布，并获取验证码
    const refreshCanvas = () => {
      getSmsCode().then(res => {
        state.verification = res.smsCode;
        draw();
      });
    };

    onMounted(() => {
      refreshCanvas();
    });

    return {
      ...toRefs(state),
      refreshCanvas
    };
  }
};
</script>

<style lang="scss" scoped></style>
