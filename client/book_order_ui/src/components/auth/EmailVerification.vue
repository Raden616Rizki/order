<template>
    <div class="row mt-5">
        <div class="col-md-12 m-auto">
            <div class="card card-body text-center">
                <h1>Email Verification</h1>
                <small>Please enter the token received in your registered mail address</small>
                <form @submit.prevent="verify()">
                    <div class="form-group">
                        <label for="token" class="float-left">Token</label>
                        <input type="text" name="token" id="token" v-model="token" class="form-control"
                            placeholder="Enter your received token" required>
                    </div>
                    <button type="submit" class="btn btn-success float-left">Submit</button>
                </form>
                <p class="mt-4">
                    <span class="float-right">Already verified? Go to <a href="/login">Login</a></span>
                    <span class="float-left">Didn't receive token? <a href="javascript:void(0)">Resend</a></span>
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'EmailVerification',
    data() {
        return {
            email: null,
            password: null
        };
    },
    mounted() {
        this.email = this.$route.query.email;
    },
    methods: {
        async verify() {
            try {
                await axios.post('http://localhost:7007/auth/email_verification', {
                    email: this.email,
                    token: this.token
                });
                swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully verified',
                })
                this.$router.push({path: '/login'});
            } catch (e) {
                swal.fire({
                    icon: 'error',
                    title: 'Verification Failed',
                    text: e.response.data.message || 'An error occurred during login.',
                })
            }
        }
    },
}
</script>