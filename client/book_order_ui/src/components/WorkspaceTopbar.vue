<template lang="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">Dashboard</router-link>

        <div class="navbar-nav">
            <ul class="navbar-nav">
                <li class="nav-link">
                    <a class="nav-link" href="javascript:void(0)">Manage Book</a>
                </li>
            </ul>
        </div>

        <div class="navbar-test ml-auto">
            <span class="logged-in-user">
                Logged in as Raden Rizki
            </span>
        </div>
        <button class="btn btn-link">Logout</button>
    </nav>
</template>
<script>
export default {
    name: "WorkspaceTopbar",
}
</script>
<style lang="">

</style>