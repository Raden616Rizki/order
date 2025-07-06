<template>
    <div class="row mt-5">
        <div class="col-md-12 m-auto">
            <div class="card card-header" style="background-color: white;">
                <h1>Online Book Order</h1>
            </div>
            <div class="card card-body text-center">
                <h2>Login</h2>
                <form @submit.prevent="login()">
                    <div class="form-group">
                        <label for="email" class="float-left">Email</label>
                        <input type="email" name="email" id="email" v-model="email" class="form-control"
                            placeholder="Enter your email address" required>
                    </div>
                    <div class="form-group">
                        <label for="password" class="float-left">Password</label>
                        <input type="password" name="password" id="password" v-model="password" class="form-control"
                            placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-success float-left">Submit</button>
                    <button type="reset" class="btn btn-secondary float-left ml-2">Reset</button>
                </form>
                <div class="form-group">
                    <div class="text-center">
                        Don't have an account?
                        <router-link to="/auth/registration" class="text-info font-weight-bold">Sign Up</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    name: 'UserLogin',
    data() {
        return {
            email: null,
            password: null
        };
    },
    methods: {
        async login() {
            try {
                const {data} = await this.$http.post('auth/login', {
                    email: this.email,
                    password: this.password
                });
                this.$store.commit('login', data);
                swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in.',
                });
                this.$router.push({path: '/'});
            } catch (e) {
                swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: e.response.data.message || 'An error occurred during login.',
                })
            }
        }
    },
}
</script>