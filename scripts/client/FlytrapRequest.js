class FlytrapRequest {
    constructor(input, init) {
        this.headers = {};
        this.init = init || {};
        this.url = input;
    }
    static initialize(input, init) {
        return new FlytrapRequest(`https://api.audio.borumtech.com/v1/${input}`, init);
    }
    authorize(userApiKey = localStorage.getItem("userApiKey")) {
        Object.assign(this.headers, {
            "authorization": `Basic ${userApiKey}`
        });
        return this;
    }
    post(body) {
        Object.assign(this.init, {
            body,
            method: "POST"
        });
        Object.assign(this.headers, {
            "content-type": "application/x-www-form-urlencoded"
        });
        return this;
    }
    put(body) {
        Object.assign(this.init, {
            body,
            method: "PUT"
        });
        Object.assign(this.headers, {
            "content-type": "application/x-www-form-urlencoded"
        });
        return this;
    }
    delete(body) {
        Object.assign(this.init, {
            body,
            method: "DELETE"
        });
        Object.assign(this.headers, {
            "content-type": "application/x-www-form-urlencoded"
        });
        return this;
    }
    
    async makeRequest(abortController = new AbortController()) {
        this.init = {
            ...this.init,
            headers: this.headers,
            signal: abortController.signal
        };

        // Abort the request if it takes too long to give a response
        setTimeout(() => abortController.abort(), 5000)

        const response = await fetch(this.url, this.init);
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        }

        const { error } = await response.json();

        throw new Error(error.message);
    }
}

