class FlytrapRequest extends BorumRequest {
    static initialize(input, init) {
        const host = `https://api.audio.borumtech.com`;
        // const host = `http://localhost:8100`;
        const url = `${host}/v1/${input}`;
        return new FlytrapRequest(url, init);
    }
}

