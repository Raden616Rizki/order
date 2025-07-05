<template>
    <div class="row mt-5">
        <div class="col-md-12 m-auto">
            <div class="card card-body text-center">
                <h1>Registration</h1>
                <form @submit.prevent="register()">
                    <div class="form-group">
                        <label for="email" class="float-left">Email</label>
                        <input type="email" name="email" id="email" v-model="user.email" class="form-control"
                            placeholder="Enter your email address" required>
                    </div>
                    <div class="form-group">
                        <label for="password" class="float-left">Password</label>
                        <input type="password" name="password" id="password" v-model="user.password"
                            class="form-control" placeholder="Enter your password" @input="validatePassword" required>
                    </div>
                    <div class="form-group">
                        <label for="cnfpass" class="float-left">Confirm Password</label>
                        <input type="password" name="cnfpass" id="cnfpass" v-model="confirmPassword"
                            class="form-control" placeholder="Enter your confirmation password"
                            @input="validatePassword" required>
                    </div>
                    <p class="text-success" v-if="user.password && confirmPassword && passwordMatch">Password Match!</p>
                    <p class="text-danger" v-else-if="user.password && confirmPassword">Password don't Match!</p>
                    <div class="form-group">
                        <label for="fname" class="float-left">First Name</label>
                        <input type="text" name="fname" id="fname" v-model="user.first_name" class="form-control"
                            placeholder="Enter your first name" required>
                    </div>
                    <div class="form-group">
                        <label for="lname" class="float-left">Last Name</label>
                        <input type="text" name="lname" id="lname" v-model="user.last_name" class="form-control"
                            placeholder="Enter your last name" required>
                    </div>
                    <div class="form-group">
                        <label for="role" class="float-left">Role</label>
                        <select name="role" id="role" v-model="user.role" class="form-control">
                            <option value="" disabled>Select an option</option>
                            <option :value="role" v-for="role in roles" :key="role">{{ role }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success float-left">Submit</button>
                </form>
                <p class="mt-4">
                    <span class="float-left">Go to Home? <a href="/">Home</a></span>
                    <span class="float-right">Go to Login? <a href="/login">Login</a></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    data() {
        return {
            roles: ['ADMIN', 'MEMBER'],
            confirmPassword: null,
            passwordMatch: false,
            user: {
                email: null,
                password: null,
                first_name: null,
                last_name: null,
                role: null
            }
        }
    },
    methods: {
        validatePassword() {
            this.passwordMatch = this.user.password === this.confirmPassword;
        },
        async register() {
            if (this.passwordMatch) {
                try {
                    await axios.post('http://localhost:7007/auth/register', {
                        user: this.user
                    });
                    swal.fire({
                        icon: 'success',
                        title: 'Register Successful',
                        text: 'You have successfully registered. Please check mailbox for token to validate your email address',
                    })
                    this.$router.push({
                        path: '/verify-email',
                        query: { email: this.user.email }
                    });
                } catch (e) {
                    swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: e.response.data.message || 'An error occurred during login.',
                    })
                }
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Passwords do not match!',
                })
            }
        }
    }
}
</script>