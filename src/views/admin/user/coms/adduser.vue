<template>
  <el-dialog title="用户管理" :visible.sync="dialogVisible" width="80%">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="tr-panel">
          <h3>选择部门</h3>
          <el-tree
            ref="refAUBM"
            :data="deptdata"
            default-expand-all
            node-key="id"
            :props="defaultProps"
            @node-click="clickNode"
            :highlight-current="true"
            :current-node-key="ckBM"
          ></el-tree>
          <label v-if="nohavebm" class="err">请选择部门！</label>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="账号" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-switch v-model="form.isadmin"></el-switch>
          </el-form-item>
          <el-form-item label="角色" v-if="form.isadmin" prop="role">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="首页审核管理员" value="6"></el-option>
              <el-option label="首页上传数据管理员" value="7"></el-option>
              <el-option label="单位管理员" value="3"></el-option>
              <el-option label="单位数据审核管理员" value="5"></el-option>
              <el-option label="单位上传数据管理员" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <div class="tr-panel">
          <h3>选择席位</h3>
          <el-tree
            ref="refAUXW"
            :current-node-key="ckXW"
            node-key="xh"
            :data="xwdata"
            default-expand-all
            :props="defaultXWProps"
            @node-click="clickXwNode"
            :highlight-current="true"
          ></el-tree>
        </div>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveUser" v-loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDepts, addUsers } from "@/api/cmsuser";
import { mapGetters } from "vuex";
import { getAllBM } from "@/api/content";
export default {
  computed: {
    ...mapGetters(["categorys", "user", "webtype"])
  },
  data() {
    return {
      dialogVisible: false,
      nohavebm: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      deptdata: [],
      xwdata: [],
      defaultXWProps: {
        children: "children",
        label: "mc"
      },
      ckBM: "",
      ckXW: "",
      form: {
        id: undefined,
        name: "",
        isadmin: false,
        password: "",
        repeatpassword: "",
        role: "",
        deptid: "",
        nickname: "",
        xw: ""
      },
      rules: [],
      loading: false
    };
  },
  methods: {
    clickNode(ev) {
      this.form.deptid = ev.id;
    },
    clickXwNode(ev) {
      this.form.xw = ev.xh;
    },
    async initInfo() {
      let datas = await getDepts({});
      this.deptdata = datas;
      let xwdatas = await getAllBM({ webtype: this.webtype });
      this.xwdata = xwdatas;
    },
    reset() {
      this.form = {
        id: undefined,
        name: "",
        isadmin: false,
        password: "",
        role: "",
        deptid: "",
        nickname: "",
        xw: ""
      };
      this.ckBM = "";
      this.ckXW = "";
      this.nohavebm = false;
    },
    show(us = null) {
      if (us == null) {
        this.reset();
        this.rules = {
          name: [
            { required: true, message: "请输入账号名称", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ],
          role: [{ required: true, message: "请选择角色", trigger: "blur" }],
          nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
        };
      } else {
        this.reset();
        this.rules = {
          name: [
            { required: true, message: "请输入账号名称", trigger: "blur" }
          ],
          role: [{ required: true, message: "请选择角色", trigger: "blur" }],
          nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
        };

        this.form.id = us.id;
        this.form.name = us.name;
        this.form.isadmin = us.superadmin;
        this.form.role = us.roles;
        this.form.deptid = us.deptid;
        this.form.nickname = us.nickname;
        this.form.xw = us.seatid;
        this.ckBM = us.deptid;
        this.ckXW = us.seatid;
        ////
        // console.log(this.form);
        setTimeout(() => {
          if (this.form.deptid) {
            this.$refs.refAUBM.setCurrentKey(this.form.deptid);
          }
          if (this.form.xw) {
            this.$refs.refAUXW.setCurrentKey(this.form.xw);
          }
        }, 300);
      }
      this.dialogVisible = true;
    },
    saveUser() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (!this.form.deptid) {
            this.nohavebm = true;
          } else {
            this.addUsers();
          }
        }
      });
    },
    async addUsers() {
      this.loading = true;
      let dataobj = await addUsers(this.form);
      if (dataobj.success === true) {
        this.$message({
          message: "用户添加成功！",
          type: "success"
        });
        this.$emit("refresh");
        this.dialogVisible = false;
      } else {
        this.$message({
          message: dataobj.msg,
          type: "error"
        });
      }
      this.loading = false;
    }
  },
  mounted() {
    this.initInfo();
  }
};
</script>
<style lang="scss" scoped>
.tr-panel {
  background: #efefef;
  border: solid 1px #eee;
  padding: 10px;
  height: 500px;
  overflow: auto;
  h3 {
    margin: 0 0 5px 0;
  }
  .err {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
  }
}
</style>