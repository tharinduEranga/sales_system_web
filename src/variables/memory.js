
class Memory {
    static setValue(key, value) {
        sessionStorage.setItem(key, value);
    }
    static getValue(key) {
        return sessionStorage.getItem(key);
    }
}

export default Memory;