<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" custom-class="mydialog">
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
      <el-row :gutter="20">
        <el-col :span="6" v-loading="loading">
          <div class="lf-panel">
            <span class="tl">父部门</span>
            <el-tree
              ref="mtree"
              class="my-tree"
              node-key="id"
              :expand-on-click-node="false"
              :default-expand-all="true"
              :data="alldepts"
              :props="defaultProps"
              @node-click="chooseDept"
              :current-node-key="curkey"
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="rg-panel" v-if="curDept">
            <el-form ref="form" :model="curDept" label-width="80px">
              <el-form-item label="部门名称">
                <el-input v-model="curDept.name"></el-input>
              </el-form-item>
              <el-form-item label="部门描述">
                <el-input type="textarea" v-model="curDept.desc"></el-input>
              </el-form-item>
              <!-- <el-form-item label="管理分类">
                <el-cascader
                  :options="catesOption"
                  v-model="curDept.cates"
                  :props="props"
                  clearable
                ></el-cascader>
              </el-form-item>-->
            </el-form>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOk()" v-loading="saving">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getAllCategorys, getDeptCates, updateDept } from "@/api/cms";
export default {
  data() {
    return {
      dialogVisible: false,
      title: "修改部门",
      alldepts: [],
      defaultProps: {
        children: "childrens",
        label: "name"
      },
      curkey: 1,
      curDept: {
        name: "",
        cates: [],
        desc: "",
        id: "",
        pid: -1
      },
      loading: false,
      saving: false
      //props: { multiple: true, label: "name", value: "id" },
      //catesOption: []
    };
  },
  methods: {
    async initcates(did) {
      let cates = await getAllCategorys({});
      this.catesOption = cates;
      let objs = await getDeptCates({ deptid: did });

      let selvals = [];
      for (let oid of objs) {
        for (let c of cates) {
          if (c.children) {
            for (let ci of c.children) {
              if (ci.id == oid) {
                selvals.push([c.id, ci.id]);
              }
            }
          }
        }
      }

      this.curDept.cates = selvals;
    },
    initDepts(depts) {
      this.alldepts = depts;
    },
    showDialogForAdd(title, dept) {
      this.title = title;
      this.dialogVisible = true;
      this.loading = true;
      setTimeout(() => {
        this.curDept = {
          name: "",
          cates: [],
          desc: "",
          id: ""
        };
        this.curkey = dept.id;
        this.$refs.mtree.setCurrentKey(this.curkey);

        this.loading = false;
      }, 500);
    },
    showDialog(title, dept) {
      this.title = title;
      this.dialogVisible = true;
      /////
      this.loading = true;

      setTimeout(() => {
        this.curkey = dept.parentid;
        this.curDept = dept;
        this.initcates(dept.id);

        this.$refs.mtree.setCurrentKey(this.curkey);
        this.loading = false;
      }, 500);
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    async confirmOk() {
      let cids = [];
      for (let c of this.curDept.cates) {
        let id1 = c[0],
          id2 = c[1];
        if (!this._inarray(id1, cids)) {
          cids.push(id1);
        }
        if (!this._inarray(id2, cids)) {
          cids.push(id2);
        }
      }
      this.saving = true;
      await updateDept({
        deptid: this.curDept.id,
        name: this.curDept.name,
        desc: this.curDept.desc,
        cids: cids.join(","),
        parentId: this.$refs.mtree.getCurrentKey()
      });
      this.saving = false;
      ////
      this.$message({
        message: "操作成功！",
        type: "success"
      });
      this.$emit("addDeptEvent")
      this.dialogVisible = false
    },
    ///////
    _inarray(id, arr) {
      let ishave = false;
      for (let a of arr) {
        if (id == a) {
          ishave = true;
          break;
        }
      }
      return ishave;
    },
    chooseDept(datanode) {
      //   updateDept({deptid: datanode.id, name: datanode.name, desc: datanode.desc, cids: cids})
    }
  }
};
</script>
<style lang="scss" scoped>
.lf-panel {
  border: solid 1px #ccc;
  padding: 10px;
  height: 100%;
  .tl {
    font-size: 16px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    border-bottom: solid 1px #ccc;
    display: block;
    padding: 0 0 4px 0;
    margin: 0 0 10px 0;
  }
}
</style>
<style lang="scss">
.my-tree {
  .el-tree-node.is-current {
    & > .el-tree-node__content {
      background: #409eff !important;
      color: #fff !important;
    }
  }
  .el-tree-node__content:hover {
    background: #409eff !important;
    color: #fff !important;
  }
}
.mydialog {
  .el-dialog__body {
    padding: 15px 20px;
  }
}
</style>