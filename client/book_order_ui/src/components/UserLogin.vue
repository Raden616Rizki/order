<template>
    <div class="row mt-5">
        <div class="col-md-12 m-auto">
            <div class="card card-body text-center">
                <h1>Login</h1>
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
                </form>
                <p class="lead mt-4">
                    Go to Home? <a href="/">Home</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
                await axios.post('http://localhost:7007/login', {
                    email: this.email,
                    password: this.password
                });
                swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in.',
                })
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