class ApiClient {
    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1";  // ✅ correct protocol
        this.headers = {
            "Content-Type": "application/json"
        };
    }

    // generic fetch method
    async getData(apiEndpoint, options = {}) {
        const url = `${this.baseUrl}${apiEndpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                ...this.headers,
                ...options.headers
            }
        });

        const data = await response.json();
        return data;
    }

    // login method
    async login(emailId, password) {
        const body = JSON.stringify({ emailId, password });
        const data = await this.getData("/login", {
            method: "POST",
            body
        });
        return data;
    }

    // example: fetch user profile with token
    async getProfile(token) {
        const data = await this.getData("/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    }
}

// usage example
const client = new ApiClient();

export default client;