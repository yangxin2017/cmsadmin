<template>
  <div class="cms-container">
    <div class="buts">
      <el-button @click="addtag()" type="primary">添加标签</el-button>
    </div>
    <el-card class="box-card" style="margin-bottom:20px;" v-if="tableData.length > 0 && webtype == 'main'">
      <h3>待审核标签列表</h3>
      <div class="sh-tags">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="标签名称"></el-table-column>
          <el-table-column prop="lydwmc" label="来源单位"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="seetree(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="shtg(scope.row)">通过</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" style="height:600px;overflow:auto">
          <h3>标签列表</h3>
          <el-tree
            :default-expand-all="true"
            ref="tgtree"
            class="tagtree"
            :data="data"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            :props="props"
            v-loading="loading"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button size="mini" type="text" @click="() => append(data)">添加下级</el-button>
                <el-button v-if="webtype=='main'" size="mini" type="text" @click="() => edit(data)">编辑</el-button>
                <!-- <el-button size="mini" type="text" @click="() => editconf(data)">配置信息</el-button> -->
                <el-button v-if="webtype=='main'" size="mini" type="text" @click="() => remove(data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <add-tag ref="adTag" @addTagEvent="refresh()"></add-tag>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;" v-if="webtype=='main'">
          <add-conf ref="adConf"></add-conf>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { uuid } from "@/utils/common";
import addtag from "@/views/admin/tags/components/addtag";
import addconf from "@/views/admin/tags/components/addconf";
import { getTags, delTag, shtgTag } from "@/api/content";
import { mapGetters } from "vuex";

export default {
  components: {
    "add-tag": addtag,
    "add-conf": addconf
  },
  data() {
    return {
      data: [],
      tableData: [],
      props: {
        label: "name"
      },
      loading: false
    };
  },
  mounted() {
    this.initinfo();
  },
  computed: {
    ...mapGetters(["webtype"])
  },
  methods: {
    _setTagInfos(datas) {
      this.tableData = [];
      let _sts = n => {
        if (n.children && n.children.length > 0) {
          for (let ni of n.children) {
            if (ni.status == 0) {
              ni.name = ni.name + `(待审核)`;
              this.tableData.push(ni);
            }
            _sts(ni);
          }
        }
      };
      for (let d of datas) {
        if (d.status == 0) {
          this.tableData.push(d);
          d.name = d.name + `(待审核)`;
        }
        _sts(d);
      }
    },
    async initinfo() {
      this.loading = true;
      let datas = await getTags({ webtype: this.webtype });
      this._setTagInfos(datas);
      //////
      this.data = datas;
      this.loading = false;
    },
    seetree(item) {
      console.log(item);
      this.$refs.tgtree.setCurrentNode(item);
      //setCurrentNode
    },
    refresh() {
      this.initinfo();
    },
    addtag() {
      this.$refs.adTag.reset();
      this.$refs.adConf.reset();
    },
    append(data) {
      this.$refs.adTag.setParentId(data);
    },
    edit(data) {
      this.$refs.adTag.setEditInfo(data);
      this.editconf(data);
    },
    editconf(data) {
      this.$refs.adConf.setTid(data);
    },

    remove(data) {
      this.$confirm("您确定要删除吗?下级节点将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await delTag({ id: data.id });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.initinfo();
      });
    },

    async shtg(item) {
      await shtgTag({ id: item.id });
      this.initinfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-container {
  padding: 15px;
  .buts {
    margin: 0 0 15px 0;
  }
  h3 {
    margin: 0 0 10px 0;
  }
}
</style>
<style lang="scss">
.tagtree {
  .el-tree-node__content {
    height: 35px;
    display: flex;
  }
  .custom-tree-node {
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>