<template>
    <div class="pro-container">
        <h2>项目列表</h2>
        <el-row :gutter="12">
            <el-col :span="6">
                <el-card shadow="hover">
                    <b class="name">智慧城市管理系统</b>
                    <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    <div class="buttons">
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <i class="el-icon-edit"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="预览" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete"></i>
                            </el-tooltip>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <b class="name">智慧城市管理系统</b>
                    <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    <div class="buttons">
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <i class="el-icon-edit"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="预览" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete"></i>
                            </el-tooltip>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <b class="name">智慧城市管理系统</b>
                    <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    <div class="buttons">
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <i class="el-icon-edit"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="预览" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete"></i>
                            </el-tooltip>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <b class="name">智慧城市管理系统</b>
                    <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    <div class="buttons">
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <i class="el-icon-edit"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="预览" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </el-button>
                        <el-button class="f-btn" type="text">
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete"></i>
                            </el-tooltip>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.pro-container {
  padding: 20px 40px;
  .name{
      display:block;padding:0px 0 10px 0;
      text-align: center;
  }
}
.buttons {
  display: flex;
  .f-btn {
    flex: 1;
    font-size: 20px;
    padding-bottom: 0;
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
}
</style>
