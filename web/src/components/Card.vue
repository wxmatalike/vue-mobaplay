<template>
    <div class="card bg-white p-3 mt-2">
      <div class="d-flex ai-center"
      :class="{'border-bottom':!plain,'pb-3':!plain}">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="flex-1 fs-xl px-2">{{title}}</div>
        <i class="iconfont icon-shenglve" v-if="!plain"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{type: String , required:true},
        icon:{type: String , required:true},
        plain:{type: Boolean},
    }
}
</script>


<style lang="scss">
@import '../assets/scss/_variables.scss';
    .card{
        border-bottom:  1px solid $border-color;
    }
</style>