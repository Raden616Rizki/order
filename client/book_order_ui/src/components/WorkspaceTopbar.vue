<template lang="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">Dashboard</router-link>

        <div class="navbar-nav" v-if="currentUser?.role === 'ADMIN'">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:void(0)">Manage Book</a>
                    <div class="dropdown-menu">
                        <router-link :to="{name: 'AddBook'}" class="dropdown-item" href="javascript:void(0)">Add Book</router-link>
                        <router-link to="/admin/books" class="dropdown-item" href="javascript:void(0)">Listing Book</router-link>
                    </div>
                </li>
            </ul>
        </div>

        <div class="navbar-test ml-auto">
            <span class="logged-in-user">
                {{currentUser?.name}} ({{currentUser?.role}})
            </span>
        </div>
        <button @click="logout" class="btn btn-link">Logout</button>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex';
import router from '@/router';

export default {
    name: "WorkspaceTopbar",
    computed: {
        ...mapGetters(['currentUser'])
    },
    methods: {
        logout() {
            this.$store.commit('logout');
            router.replace({path: '/auth/login'})
        }
    }
}
</script>
<style lang="">

</style>