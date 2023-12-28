function makePotionsRoom() {
    return {
        store: new Map(),
        add: function (shelveName, potion) { // cool
            const shelve = this.store[shelveName] || [];
            shelve.push(potion);
            this.store[shelveName] = shelve;
        },
        takePotion: function (namePotion) { // cool?
            for (let shelveName in this.store) {
                for(let i in this.store[shelveName]) {
                    let potion = this.store[shelveName][i];
                    if (potion.name === namePotion){
                        delete this.store[shelveName].splice(i, 1);
                        return potion;
                    }
                }
            }
        },
        usePotion: function (namePotion) {
            for (let shelveName in this.store) {
                for(let i in this.store[shelveName]) {
                    let potion = this.store[shelveName][i];
                    if (potion.name === namePotion){
                        delete this.store[shelveName].splice(i, 1);
                        potion.use();
                        return;
                    }
                }
            }
        },
        getAllPotionsFromShelve: function (shelveName) {
            return this.store[shelveName] || [];
        },
        getAllPotions: function () {
            const uniquePotions = [];
            for (let shelveName in this.store) {
                for(let potion of this.store[shelveName]) {
                    uniquePotions.push(potion);
                }
            }
            return uniquePotions;
        },
        takeAllPotionsFromShelve: function (shelveName) { // cool
            let potions = this.store[shelveName] || [];
            this.store[shelveName] = [];
            return potions;
        },
        useAllPotionsFromShelve: function (shelveName) { // cool
            let potions = this.store[shelveName] || [];
            this.store[shelveName] = [];
            for(let potion of potions) potion.use();
        },
        clean: function (revisionDay) {
            let answer = [];
            for (let shelveName in this.store) {
                let newShelve = [];
                for(let i in this.store[shelveName]) {
                    let potion = this.store[shelveName][i];
                    let expirationDate = new Date(potion.created.getTime() + potion.expirationDays*24*60*60*1000);
                    if (expirationDate >= revisionDay) {
                        newShelve.push(potion);
                    } else {
                        answer.push(potion);
                    }
                }
                this.store[shelveName] = newShelve;
            }
            return answer;
        },
        uniquePotionsCount() {
            let potions = this.getAllPotions();
            let uniqueNames = new Set();
            for(let potion of potions) uniqueNames.add(potion.name);
            return uniqueNames.size;
        }
    };
}
module.exports = makePotionsRoom;
// const potionsRoom = makePotionsRoom();
// const potion = {
//     name: 'Амортенция',
//     expirationDays: 5,
//     created: new Date(2023, 0, 1),
//     use: function() {
//         console.log('Использован любовный напиток');
//     },
// }
// potionsRoom.add('Дальняя полка', potion);
// let getPotion = potionsRoom.takePotion(potion.name);
// console.log(potionsRoom.uniquePotionsCount());
// console.log(getPotion)