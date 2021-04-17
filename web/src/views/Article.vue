<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-1">
        {{ model.title }}
      </strong>
      <div class="text-grey">2021-04-10</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-xl"></div>
    <div class="px-3 mt-4">
      <div class="d-flex ai-center ml-3">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue fs-xl ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1 ml-2"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="(item, index) of model.related"
          :key="index"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  watch:{
    id:'fetch'
    //完整写法
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>