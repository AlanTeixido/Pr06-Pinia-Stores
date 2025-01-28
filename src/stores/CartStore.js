import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        items: []
    }),
    actions: {
        addToCart(count, product) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...product }); 
            }
        console.log("Producto añadido:", product.name, "Cantidad:", count);
        },

        addItems(count,item){
            count=parseInt(count);
            for(let index=0;index<count;index++){
                this.items.push({...item});
            }
        } 
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.items.length === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name)
    }
});
