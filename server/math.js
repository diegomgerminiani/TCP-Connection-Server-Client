
module.exports = {
    
    async inc(number) {
        let result = parseInt(number) + 1
        return result;
    },

    async dec(number){
        let result = parseInt(number) - 1 
        return result;
    }, 

    async mul(a, b){
        let result = parseInt(a) * parseInt(a) 
        return result;
    }
}