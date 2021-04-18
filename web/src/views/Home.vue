<template>
  <div>
    <swiper :options="swiperOptions" autoplay:true>
      <swiper-slide v-for="(item,index) in ads" :key="index">
        <a tag="div" :to="item.items[0].url">
          <img class="w-100" :src="item.items[0].image" alt=""/>
        </a>
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3"
        slot="pagination"
      ></div>
    </swiper>

    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-warp">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-aroundshop"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-newplayer"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-inherit"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-kingcamp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-wx"></i>
          <div class="py-2">公众号</div>
        </div>
      </div>
    </div>

    <!-- end of icons -->

    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, index) in category.newsList"
          :key="index"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-3">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="-superhero" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-warp" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, index) in category.heroList"
            :key="index"
          >
            <img :src="hero.avatar" class="w-100" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
//当页面没有轮播图圆点时，需要添加如下两行代码
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper";
Swiper2.use([Navigation, Pagination, Autoplay]);
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
        //添加此属性数值swiper自动播放
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroCats: [],
      ads:[]
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    async fetchAdsCats() {
      const res = await this.$http.get("ads/list");
      this.ads = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchAdsCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
  bottom: 10px;
  width: 100%;
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    color: map-get($colors, "grey-1");
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-left: none;
    }
  }
}
</style>