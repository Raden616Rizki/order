import { jwtDecode } from "jwt-decode";

// Define the class named User
export default class User {
    constructor({id, email, role, first_name, last_name, email_verification_status}) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.first_name = first_name;
        this.last_name = last_name;
        this.name = `${this.first_name} ${this.last_name}`;
        this.isVerified = email_verification_status === 'VERIFIED';
    }

    // Static method to create a User object from a JWT token
    static from(token) {
        try {
            let obj = jwtDecode(token); // Decode JWT Token
            return new User(obj);       // Create a new User Object with the decoded data
        } catch (e) {
            return null;
        }
    }
}