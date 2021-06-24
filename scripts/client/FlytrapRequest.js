class FlytrapRequest extends BorumRequest {
    static initialize(input, init) {
        const host = 
            window.location.hostname === 'localhost' ? 
            'http://localhost:8100': 
            `https://api.audio.borumtech.com`;
            
        const url = `${host}/v1/${input}`;
        return new FlytrapRequest(url, init);
    }
}

