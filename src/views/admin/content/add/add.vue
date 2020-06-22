<template>
  <div class="cms-container">
    <el-card class="box-card" v-if="curCategory">
      <h3>
        <em>[{{ curCategory.name }}]</em>-添加内容
      </h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="标题" prop="title" required>
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="form.desc" type="textarea" :rows="4"></el-input>
              </el-form-item>
              <el-form-item label="执勤表" v-if="curCategory.fileds.indexOf('sftt') >= 0">
                <div class="zqbs">
                  <div class="zqb-item" v-for="(item, index) in form.zqbarr" :key="index">
                    <span>席位：</span>
                    <el-input v-model="item.xw"></el-input>
                    <span>姓名：</span>
                    <el-input v-model="item.xm"></el-input>
                    <span>职务：</span>
                    <el-input v-model="item.zw"></el-input>
                    <span>电话：</span>
                    <el-input v-model="item.dh"></el-input>
                    <el-button
                      style="width:40px"
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      circle
                      @click="deleteZqbItem(item)"
                    ></el-button>
                  </div>

                  <el-button type="primary" plain size="small" @click="addZqbItem()">添加</el-button>
                </div>
              </el-form-item>
              <el-form-item
                label="外链地址"
                prop="url"
                required
                v-if="curCategory.fileds.indexOf('wldz') >= 0"
              >
                <el-input placeholder="请输入内容" v-model="form.url">
                  <template slot="prepend">Https://</template>
                </el-input>
              </el-form-item>
              <div class="fl-content">
                <!-- <el-form-item
                  label="来源单位"
                  prop="lydw"
                  v-if="curCategory.fileds.indexOf('lydw') >= 0"
                >
                  <el-select v-model="form.lydw" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item
                  label="秘密等级"
                  prop="level"
                  v-if="curCategory.fileds.indexOf('mmdj') >= 0"
                  required
                >
                  <el-select v-model="form.level" placeholder="请选择">
                    <el-option
                      v-for="item in mmdjs"
                      :key="item.id"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="周边国家"
                  prop="gjlb"
                  v-if="curCategory.fileds.indexOf('zbgj') >= 0"
                  required
                >
                  <el-select v-model="form.gjlb" placeholder="请选择">
                    <el-option
                      v-for="item in hais"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="国家列表"
                  prop="gjlb"
                  v-if="curCategory.fileds.indexOf('gjlb') >= 0"
                  required
                >
                  <el-select v-model="form.gjlb" placeholder="请选择">
                    <el-option
                      v-for="item in guos"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="fl-content">
                <el-form-item
                  label="上传文件"
                  v-if="curCategory.fileds.indexOf('nrwj') >= 0"
                  required
                  prop="nrwj"
                >
                  <el-upload
                    class="upload-demo myupload"
                    :data="userdata"
                    drag
                    action="/cms/api/fileupload"
                    accept=".pdf, .doc, .docx"
                    :on-success="wjuploaded"
                    :on-remove="wjdelete"
                    :on-preview="wjprev"
                    :file-list="filelist"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      只能上传Word/Pdf文件，且不超过800Mb
                      <br />(Word最大支持50Mb,word转换需要一断时间)
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item
                  label="上传图片"
                  v-if="curCategory.fileds.indexOf('tpwj') >= 0"
                  required
                  prop="tpwj"
                >
                  <el-upload
                    class="upload-demo myupload"
                    :data="userdata"
                    drag
                    accept="image/png, image/jpeg"
                    action="/cms/api/fileupload"
                    :on-success="tpuploaded"
                    :on-remove="tpdelete"
                    :on-preview="tpprev"
                    :file-list="imagelist"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过20Mb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item
                  label="上传视频"
                  v-if="curCategory.fileds.indexOf('spwj') >= 0"
                  required
                  prop="spwj"
                >
                  <el-upload
                    class="upload-demo myupload"
                    :data="userdata"
                    drag
                    accept=".mp4"
                    action="/cms/api/fileupload"
                    :on-success="spuploaded"
                    :on-remove="spdelete"
                    :on-preview="spprev"
                    :file-list="videolist"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过800Mb</div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="con-item">
              <label class="lbl" style="position: relative;top: 14px;">选择席位</label>
              <div style="flex:1">
                <div class="con-items">
                  <el-select
                    style="margin:0 10px 0 0"
                    v-model="chooseXWValue"
                    clearable
                    placeholder="请选择席位模板"
                    @change="chooseXwTemplate($event)"
                  >
                    <el-option
                      v-for="item in xwtemplates"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <el-input
                    style="height:40px;"
                    size="small"
                    :clearable="true"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText"
                  ></el-input>
                </div>
                <el-tree
                  ref="xwtree"
                  class="mytree"
                  :data="xws"
                  show-checkbox
                  node-key="xh"
                  :filter-node-method="filterNode"
                  :default-checked-keys="chkxwkey"
                  :props="props2"
                ></el-tree>
              </div>
            </div>
            <div class="con-item" v-if="curCategory.fileds.indexOf('tag') >= 0">
              <label class="lbl">选择标签</label>
              <el-tree
                ref="tagtree"
                class="mytree"
                :data="tags"
                show-checkbox
                node-key="id"
                :default-checked-keys="chktagkey"
                :props="props"
              ></el-tree>
            </div>
            <label
              v-if="!ischooseTag"
              class="err"
              style="color:#f00;font-size:12px;margin-left:81px;"
            >请选择必选标签</label>
          </div>
        </el-col>
      </el-row>
      <div class="but-adds" v-loading="loading">
        <el-button type="success" @click="confirm('yes')">提交</el-button>
        <el-button type="primary" @click="confirm('no')">保存草稿</el-button>
        <el-button>返回</el-button>
      </div>
    </el-card>
    <prev-file ref="refFile"></prev-file>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  addContent,
  getUserData,
  getDicData,
  getTags,
  getAllBM,
  getContentById,
  getSeatConfByCid
} from "@/api/content";
import { getCoutryAndOcean } from "@/api/cms";
import { getDeptById, uuid } from "@/utils/common";

import prevfile from "@/views/admin/content/prev/prevfile";
import { Base64 } from 'js-base64';

export default {
  components: {
    "prev-file": prevfile
  },
  watch: {
    filterText(val) {
      this.$refs.xwtree.filter(val);
    }
  },
  data() {
    return {
      chooseXWValue: "",
      xwtemplates: [],
      //////////////
      filterText: "",
      curCategory: null,
      props: {
        label: "name"
      },
      props2: {
        children: "children",
        label: "mc"
      },
      form: {
        title: "",
        desc: "",
        lydw: "",
        level: "1",
        gjlb: "",
        nrwj: "",
        tpwj: "",
        spwj: "",
        draft: false,
        id: undefined,
        cid: undefined,
        xwstr: "",
        tagstr: "",
        filetype: "",
        url: "",
        zqbarr: [
          { id: 1, xw: "", xm: "", zw: "", dh: "" },
          { id: 2, xw: "", xm: "", zw: "", dh: "" }
        ],
        sftt: ""
      },
      chkxwkey: [],
      chktagkey: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入URL", trigger: "blur" }],
        nrwj: [{ required: true, message: "请上传文件", trigger: "blur" }],
        tpwj: [{ required: true, message: "请上传图片", trigger: "blur" }],
        spwj: [{ required: true, message: "请上传视频", trigger: "blur" }],
        level: [{ required: true, message: "请选择秘密等级", trigger: "blur" }],
        gjlb: [{ required: true, message: "请选择信息", trigger: "blur" }]
      },
      userdata: null,
      filelist: [],
      imagelist: [],
      videolist: [],
      tplist: [],
      splist: [],
      guos: [],
      hais: [],
      mmdjs: [],
      depts: [],
      tags: [],
      xws: [],
      curuserdept: false,
      loading: false,
      bxtagIds: [],
      ischooseTag: true
    };
  },
  mounted() {
    this.initAll();
  },
  computed: {
    ...mapGetters(["categorys", "user", "webtype"])
  },
  methods: {
    addZqbItem() {
      this.form.zqbarr.push({ id: uuid(), xw: "", xm: "", zw: "", dh: "" });
    },
    deleteZqbItem(item) {
      this.form.zqbarr = this.form.zqbarr.filter(v => {
        return v.id != item.id;
      });
    },

    chooseXwTemplate(ev) {
      this.chkxwkey = [];
      if (ev) {
        for (let d of this.xwtemplates) {
          if (d.id == ev) {
            let chks = d.seatids ? d.seatids.split(",") : [];
            this.chkxwkey = chks;
          }
        }
      }
      let ids = this.$refs.xwtree.setCheckedNodes(this.chkxwkey);
    },
    async initAll() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "正在加载中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)"
      // });

      let cid = this.$route.query.cid;
      this.form.cid = cid;
      this.curCategory = this.getCateById(cid);

      this.userdata = getUserData();
      await this.initInfo();
      this.depts = this.user.depts;
      this.curuserdept = getDeptById(this.depts, this.user.deptId);
      /////
      this.form.lydw = this.user.deptId;
      /////
      let id = this.$route.query.id;
      if (id) {
        await this.initContent(id);
      } else {
        // 默认选中必选标签：
        this.chktagkey = this.bxtagIds;
      }
      this.xwtemplates = await getSeatConfByCid({ cid: cid });

      ///// 放在最后一个
      this.xws = await getAllBM({ webtype: this.webtype });

      // loading.close();
    },
    _setTagConf(tags) {
      this.bxtagIds = [];

      let _sts = n => {
        if (n.children && n.children.length > 0) {
          for (let ni of n.children) {
            if (ni.status == 0) {
              ni.disabled = true;
            } else {
              if (ni.cfs["m_" + this.form.cid]) {
                ni.cfstr = ni.cfs["m_" + this.form.cid].conf;
              } else {
                ni.cfstr = "";
              }
              if (ni.cfstr.indexOf("hidden") >= 0) {
                ///////
                ni.disabled = true;
              } else {
                if (ni.cfstr.indexOf("required") >= 0) {
                  ni.name += "(推荐)";
                  this.bxtagIds.push(ni.id);
                }
              }
              _sts(ni);
            }
          }
        }
      };

      for (let t of tags) {
        if (t.status == 1) {
          if (t.cfs["m_" + this.form.cid]) {
            t.cfstr = t.cfs["m_" + this.form.cid].conf;
          } else {
            t.cfstr = "";
          }
          if (t.cfstr.indexOf("hidden") >= 0) {
            ///////
            t.disabled = true;
          } else {
            if (t.cfstr.indexOf("required") >= 0) {
              t.name += "(推荐)";
              this.bxtagIds.push(t.id);
            }
          }
          _sts(t);
        } else {
          t.disabled = true;
        }
      }
      return tags;
    },
    async initInfo() {
      let dataobj = await getCoutryAndOcean();
      this.guos = dataobj.country;
      this.hais = dataobj.ocean;
      this.mmdjs = await getDicData({ id: "1" });
      let tags = await getTags({ webtype: this.webtype });
      tags = this._setTagConf(tags);
      this.tags = tags;
    },
    async initContent(id) {
      let content = await getContentById({ id: id });
      ////
      if (content) {
        this.form.title = content.title;
        this.form.desc = content.desc;
        this.form.lydw = content.lydw;
        this.form.level = content.mmdj;
        this.form.gjlb = content.gjmc;
        this.form.nrwj = content.nrwj;
        this.form.tpwj = content.tpwj;
        this.form.spwj = content.spwj;
        this.form.draft = false;
        this.form.id = content.id;
        this.form.cid = content.categoryId;
        this.form.xwstr = content.olden.seatids;
        this.form.tagstr = content.tagids.join(",");
        this.form.filetype = content.olden.filetype;
        this.form.url = content.olden.url;
        this.form.zqbarr = content.zqbjson;
        console.log(this.form.zqbarr)
        ///// chkxwkey
        this.chkxwkey = [];
        let arr = this.form.xwstr.split(",");
        for (let a of arr) {
          if (a) {
            this.chkxwkey.push(a);
          }
        }
        ///// chktagkey
        this.chktagkey = [];
        let arr2 = this.form.tagstr.split(",");
        for (let a of arr2) {
          if (a) {
            this.chktagkey.push(a);
          }
        }
        /////
        this.filelist = [];
        if (content.nrwj) {
          this.filelist = [{ name: "点击查看文件", url: content.nrwj }];
        }
        this.imagelist = [];
        if (content.tpwj) {
          this.imagelist = [{ name: "点击查看文件", url: content.tpwj }];
        }
        this.videolist = [];
        if (content.spwj) {
          this.videolist = [{ name: "点击查看文件", url: content.spwj }];
        }
      }
    },
    getCateById(cid) {
      let res = null;
      for (let c of this.categorys) {
        if (c.children) {
          for (let ci of c.children) {
            if (ci.id == cid) {
              res = ci;
            }
          }
        }
      }
      return res;
    },
    wjuploaded(res, file, fileList) {
      this.form.nrwj = res.data.fileName;
      this.form.filetype = res.data.fileType;
      this.filelist = [{ url: res.data.fileName, name: "点击查看文件" }];
    },
    wjdelete(file, fileList) {
      this.form.nrwj = "";
    },
    wjprev(file) {
      this.$refs.refFile.show(file.url, "file");
    },

    tpuploaded(res, file, fileList) {
      this.form.tpwj = res.data.fileName;
      this.imagelist = [{ url: res.data.fileName, name: "点击查看文件" }];
    },
    tpdelete(file, fileList) {
      this.form.tpwj = "";
    },
    tpprev(file) {
      this.$refs.refFile.show(file.url, "image");
    },

    spuploaded(res, file, fileList) {
      this.form.spwj = res.data.fileName;
      this.form.filetype = res.data.fileType;
      this.videolist = [{ url: res.data.fileName, name: "点击查看文件" }];
    },
    spdelete(file, fileList) {
      this.form.spwj = "";
    },
    spprev(file) {
      this.$refs.refFile.show(file.url, "video");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.mc.indexOf(value) !== -1;
    },

    async confirm(tp) {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let selxw = this.$refs.xwtree.getCheckedNodes();

          if (this.$refs.tagtree) {
            let seltag = this.$refs.tagtree.getCheckedNodes();
            let t2 = [];
            for (let tg of seltag) {
              t2.push(tg.id);
            }
            this.form.tagstr = t2.join(",");
          }

          let t1 = [];
          for (let xw of selxw) {
            t1.push(xw.xh);
          }

          this.form.xwstr = t1.join(",");
          this.form.draft = tp == "no";
          if (this.form.xwstr != "") {
            this.form.xwstr = "," + this.form.xwstr + ",";
          }

          /////
          this.form.sftt = Base64.encode(JSON.stringify(this.form.zqbarr));

          ///////////////
          this.ischooseTag = true;
          // let ststr = this.form.tagstr + ",";
          // for (let t of this.bxtagIds) {
          //   if (ststr.indexOf(t + ",") < 0) {
          //     this.ischooseTag = false;
          //   }
          // }

          if (this.ischooseTag) {
            this.loading = true;
            await addContent(this.form);
            this.loading = false;
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            /////
            setTimeout(() => {
              this.$router.push("list");
            }, 1500);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cms-container {
  padding: 15px;

  .zqbs {
    .zqb-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      span {
        width: 47px;
      }
      .el-input {
        flex: 1;
        margin-right: 10px;
      }
    }
  }

  .fl-content {
    display: flex;
    justify-content: space-between;
  }
  .box-card {
    h3 {
      margin-top: 0px;
      text-align: center;
      em {
        color: #409eff;
      }
    }
  }
  .con-item {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;
    .lbl {
      width: 80px;
      font-size: 14px;
      color: #606266;
    }
    .mytree {
      flex: 1;
      border: solid 1px #eee;
      height: 220px;
      padding: 5px;
      overflow: auto;
    }
  }
  .but-adds {
    margin: 20px 0 0 0;
    text-align: center;
    border-top: solid 1px #ddd;
    padding-top: 15px;
  }
  .con-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
}
</style>
<style lang="scss">
.myupload {
  .el-upload-dragger {
    width: 250px;
  }
  .el-upload__tip {
    margin: 0;
    line-height: 20px;
    font-weight: bold;
  }
}
.mytree {
  .el-tree-node[aria-disabled="true"] {
    display: none;
  }
}
</style>