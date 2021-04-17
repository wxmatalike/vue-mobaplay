<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" alt="" />
      <div class="px-2 flex-1">
        <span class="text-white">英雄联盟</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>

    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">
          {{ model.categories.map((v) => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skill }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-2">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm"
            >皮肤：8 &gt;</router-link
          >
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around py-2 pt-3 pb-2 border-bottom">
          <div class="nav-item active fs-lg">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 pb-1 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu"></i>
                  英雄介绍视频
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="skillsIndex=i"
                    :class="{active:skillsIndex===i}"
                    :src="item.icon"
                    v-for="(item,i) in model.skills"
                    :key="i"
                    width="16%"
                    alt=""
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-2">
                    <h4 class="m-0">{{currentSkill.name}}</h4>
                    <span class="text-grey ml-4 fs-xs">
                      (冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})
                    </span>
                  </div>
                    <div>
                      <p class="fs-md">{{currentSkill.description}}</p>
                    </div>
                </div>
              </div>
            </div>
            <m-card plain icon="menu" title="出装推荐" class="hero-items">
              <div class="fs-xl mb-3">顺风出装</div>
              <div class="d-flex jc-around text-center">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-2 mb-3"></div>
              <div class="fs-xl mb-3">逆风出装</div>
              <div class="d-flex jc-around text-center">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" alt="" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>

            <m-card plain icon="menu" title="使用技巧">
              <p class="m-0" style="line-height:1.5rem">{{model.usageTips}}</p>
            </m-card>

            <m-card plain icon="menu" title="克制技巧">
              <p class="m-0" style="line-height:1.5rem">{{model.battleTips}}</p>
            </m-card>

            <m-card plain icon="menu" title="背景故事">
              <p class="m-0" style="line-height:1.5rem">{{model.teamTips}}</p>
            </m-card>

            <m-card plain icon="menu" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.patners" :key="item.name" class="d-flex pt-4">
                <img :src="item.hero.avatar" height="55">
                <p class="flex-1 m-0 ml-3" style="line-height:1.5rem">
                  {{item.hero.name}}：{{item.description}}
                </p>
              </div>
              <div class="border-bottom mt-3 mb-2"></div>
              <div></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
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
      skillsIndex:0
    };
  },
  computed:{
    currentSkill(){
      return this.model.skills[this.skillsIndex]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.5rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.5rem;
        opacity: 0.8;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.skills{
  img.active{
    //可以为icon添加一个默认的white边框，来解决图标选中变小的问题，但没必要
    border: 3px solid map-get($colors, 'primary');
    border-radius: 50%;
  }
}
.hero-items{
  img.icon{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>