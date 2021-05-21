class FlytrapRequest extends BorumRequest {
    static initialize(input, init) {
        return new FlytrapRequest(`https://api.audio.borumtech.com/v1/${input}`, init);
    }
}

