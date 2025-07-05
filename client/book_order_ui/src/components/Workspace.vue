<template lang="">
    <div id="main-wrapper">
        <workspace-topbar></workspace-topbar>
        <div id="page-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import WorkspaceTopbar from './WorkspaceTopbar.vue';

export default {
    name: "MyWorkspace",
    components: {
        WorkspaceTopbar
    }
}
</script>
<style scopped>
    #main-wrapper {
        position: absolute;
        top: 0px;
        width: 100%;
        z-index: -1;
    }
</style>