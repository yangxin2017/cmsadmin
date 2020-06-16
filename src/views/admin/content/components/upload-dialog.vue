<template>
  <div class="mulupload">
    <el-dialog title="批量上传" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div class="upload-container drop-container">
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
        </vue-dropzone>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { getUserData } from "@/api/content";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dialogVisible: false,
      dropzoneOptions: {
        url: "/cms/api/filebatchupload",
        paramName: "file",
        dictDefaultMessage: "拖拽文件夹上传",
        timeout: 600000,
        addRemoveLinks: false,
        maxFiles: 300,
        maxFilesize: 5000, //MB,
        acceptedFiles: ".doc,.docx,.pdf,.jpg,.jpeg,.png,.gif,.mp4",
        dictMaxFilesExceeded: "您最多只能上传300个文件！",
        dictResponseError: "文件上传失败!",
        dictInvalidFileType:
          "你不能上传该类型文件,文件类型只能是*.doc,*.docx,*.pdf。",
        dictFallbackMessage: "浏览器不受支持",
        dictFileTooBig: "文件过大上传文件最大支持.",
        dictRemoveFile: "删除文件",
        dictCancelUpload: "取消上传",
        accept: (file, done) => {
          if (file.fullPath) {
            var filepath = file.fullPath;
            var seg = filepath.split("/");
            if (seg.length != 3 && seg.length != 4) {
              done("文件夹格式不正确");
            } else {
              console.log(file);
              //   $(file.previewTemplate)
              //     .find(".dz-upload")
              //     .html("等待上传");
              done();
            }
          } else {
            done("不支持单独文件上传");
          }
        },
        sending: (file, xhr, formData) => {
          /** */
          var findDeptId = function(name) {
            return false;
          };
          var getTags = function(str) {
            return str.replace(/，/g, ",");
          };
          var getFilename = function(str) {
            var arrfs = str.split(".");
            var temparr = [];
            for (var i = 0; i < arrfs.length - 1; i++) {
              temparr.push(arrfs[i]);
            }
            var res = "";
            if (temparr.length > 1) {
              res = temparr.join(".");
            } else {
              res = temparr[0];
            }
            return res;
          };
          /////
          let users = getUserData();
          var form_data = {
            title: "",
            deptId: null,
            deptName: "",
            // 传给后台中文tag，如果不存在，创建tag之后再保存
            tags: "",
            // 通过两级目录去查找 categoryId
            level1: "",
            level2: "",
            // 上传单独文件的时候需要该字段
            categoryId: null,
            sptg: "no",
            country: "",
            authToken: users.authToken,
            authUserId: users.authUserId
          };
          var f_deptId = false;
          var f_deptName = "";
          var tags = "";
          var title = "";
          var categoryId = -1;

          //
          var setFormData = (filename, l1name, l2name, country) => {
            var names = filename.split("_");
            /**
             * 长度为1 表示只存名称
             * 长度为2 表示名称和来源单位或者表示名称和标签
             * 长度为3 表示名称，来源单位，标签
             */
            if (names.length == 1) {
              title = names[0];
            } else if (names.length == 2) {
              title = names[0];
              f_deptName = names[1];
              f_deptId = findDeptId(f_deptName);
              if (!f_deptId) {
                f_deptName = "";
                var f_tags = names[1];
                tags = getTags(f_tags);
              }
            } else if (names.length == 3) {
              title = names[0];
              f_deptName = names[1];
              var f_tags = names[2];

              f_deptId = findDeptId(f_deptName);
              if (!f_deptId) {
                f_deptName = "";
              }
              tags = getTags(f_tags);
            }
            // 组织数据
            form_data.level1 = l1name;
            form_data.level2 = l2name;
            form_data.title = title;
            form_data.tags = tags;
            form_data.deptId = "false";
            form_data.deptName = f_deptName;
            form_data.categoryId = categoryId;
            form_data.country = country;
          };

          if (file.fullPath) {
            var filepath = file.fullPath;
            var seg = filepath.split("/");
            if (seg.length == 3) {
              var l1name = seg[0],
                l2name = seg[1],
                filename = seg[2];
              filename = getFilename(filename);
              setFormData(filename, l1name, l2name, "");
            } else if (seg.length == 4) {
              var l1name = seg[0],
                l2name = seg[1],
                country = seg[2],
                filename = seg[3];
              filename = getFilename(filename);
              setFormData(filename, l1name, l2name, country);
            }

            // form_data._csrf = $("#uni-token").val();
            // formData.append("field", $("#pt_field").val());
            // formData.append("originalField", $("#pt_originalField").val());
            for (var k in form_data) {
              formData.append(k, form_data[k]);
            }
          }
        },
        // removedfile: (file) => {
        //   $(file.previewTemplate).remove();
        // },
        success: (file, response, e) => {
          //   var res = JSON.parse(response);
          //   if (res.success) {
          //     $(file.previewTemplate)
          //       .find(".dz-upload")
          //       .html("<b style='color:#33cabb'>上传完成</b>");
          //   } else {
          //     $(file.previewTemplate)
          //       .find(".dz-upload")
          //       .html("<b style='color:#ff0000'>上传失败</b>");
          //   }
          //   var k = $("#pt_field").val();
          //   var val = res[k];
          //   $("#pt_file_value").val(val);
        }
      }
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("fileUploaded");
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-container {
  width: 100%;
  border: dotted 1px #ddd;
  padding: 15px 20px;
  text-align: center;
  .el-icon-upload {
    font-size: 80px;
    opacity: 0.6;
  }
}
</style>
<style lang="scss">
.mulupload {
  .file-upload-container {
    width: 100%;
    height: 150px;
    background: #eee;
    border: dashed 5px #000;
  }
  .dz-preview {
    text-align: center;
  }
  .dz-error-message {
    color: red;
  }
  .dz-success-mark,
  .dz-error-mark {
    display: none;
  }
  .dz-image img {
    max-height: 42px;
  }

  .btn-tag-m .mdi-close {
    display: none;
  }
  .btn-tag-m.btn-primary .mdi-close {
    display: inline-block;
  }
  .modal {
    top: 0px;
  }

  .pv-contents {
    border: solid 1px #333;
    padding: 5px;
  }
  .dot-content {
    width: 255px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .drop-container {
    border: dashed 3px #000;
    background: #eee;
    height: 260px;
    overflow: auto;
  }
  .drop-container.hover {
    background: #ddd;
    border-color: #33cabb;
  }

  .dz-preview {
    float: left;
    width: 30%;
    background: #ccc;
    margin: 5px;
    border: solid 1px #000;
    border-radius: 13px;
  }
  .dz-image {
    display: none;
  }
  .dz-upload {
    color: #d822dc;
  }

  .radchange {
    position: relative;
    top: 4px;
    margin-right: 10px;
    line-height: 28px;
  }
  .radchange input {
    position: relative;
    top: 1px;
    margin-right: 3px;
  }

  .sort-link {
    color: #333333 !important;
  }
  .dz-remove {
    display: none;
  }
  .vue-dropzone {
    background: transparent;
    border: none;
  }
  .vue-dropzone > .dz-preview .dz-details {
    border-radius: 12px;
  }
  .mulupload .dz-preview {
    border: none;
  }
  .dz-error-message {
  }
}
</style>


