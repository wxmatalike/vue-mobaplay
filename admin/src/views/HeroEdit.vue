<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="detail">
        <el-tab-pane label="基本信息" name="detail">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=> $set(model,'avatar' , res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="英雄图片">
            <el-upload 
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=> $set(model,'banner' , res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select
              v-model="model.categories"
              multiple
              placeholder="选择英雄类型"
            >
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.skill"
            ></el-rate>
          </el-form-item>

          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>

          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select
              v-model="model.items1"
              multiple
              placeholder="选择物品装备"
            >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select
              v-model="model.items2"
              multiple
              placeholder="选择物品装备"
            >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              v-model="model.usageTips"
              placeholder="输入英雄的使用技巧"
            ></el-input>
          </el-form-item>

          <el-form-item label="克制技巧">
            <el-input
              type="textarea"
              v-model="model.battleTips"
              placeholder="输入英雄的克制技巧"
            ></el-input>
          </el-form-item>

          <el-form-item label="背景故事">
            <el-input
              type="textarea"
              v-model="model.teamTips"
              placeholder="输入英雄的背景故事"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
          
        <el-tab-pane label="技能介绍" name="skills">
          <el-button @click="model.skills.push({})"
            ><i class="el-icon-plus"></i> 添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>

              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="技能描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="操作">
                <el-button
                  size="small"
                  @click="model.skills.splice(i, 1)"
                  type="danger"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="patners">
          <el-button @click="model.patners.push({})"
            ><i class="el-icon-plus"></i> 添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.patners" :key="i">

              <el-form-item label="选择英雄">
                <el-select filterable  v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id"
                  :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="操作">
                <el-button
                  size="small"
                  @click="model.patners.splice(i, 1)"
                  type="danger"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      categories: [],
      items: [],
      heroes:[],
      model: {
        //先定义好需要的数据，即可用普通的赋值方式
        name: "",
        avatar: "",
        skills:[],
        patners:[],
        scores: {
          difficult: 0,
        },
      },
    };
  },
  methods: {
    afterUpload(res) {
      // this.$set(this.model,'avatar',res.url)
      //普通的赋值方式 建议使用
      this.model.avatar = res.url;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      console.log(res);
      // this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //防止服务器传回数据时二次覆盖一些参数
      this.model = Object.assign({}, this.model, res.data);
    },
    //渲染类型列表
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    //渲染装备列表
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    //渲染英雄列表
    async fetchIHeros() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    },
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchIHeros();
    this.id && this.fetch();
  },
};
</script>

