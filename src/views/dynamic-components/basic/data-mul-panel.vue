<template>
    <div>
        测试组件 {{ dataId }}
    </div>
</template>
<script>
export default {
    props: {
        dataId: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
