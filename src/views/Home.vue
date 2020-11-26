<template>
  <van-nav-bar title="首页" @click-right="rightClick">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div>
    sdfsjdk
  </div>
</template>

<script>
export default {
  setup() {
    const leftClick = () => {
      console.log("== leftClick ==");
    };

    const rightClick = () => {
      console.log("== rightClick ==");
    };
    return {
      leftClick,
      rightClick
    };
  }
};
</script>

<style lang="scss" scoped></style>
