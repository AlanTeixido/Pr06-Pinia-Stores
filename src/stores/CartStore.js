import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        items: []
    }),
    actions: {
        // addItems(count, product) {
        //     count = parseInt(count);
        //     for (let index = 0; index < count; index++) {
        //         this.items.push({ ...product });
        //     }
        //     console.log("Productes afegits:", product.name, "Quantitat:", count);
        // },
        addItems(count, product) {
            this.$patch((state) => {
                count = parseInt(count);
                for (let index = 0; index < count; index++) {
                    state.items.push({ ...product });
                }
            });
            console.log("Productes afegits:", product.name, "Quantitat:", count);
        },
        clearCart() {
            this.items = [];
            console.log("Carret buidat!");
        },
        removeItem(name) {
            this.items = this.items.filter(item => item.name !== name);
            console.log(`Producte eliminat: ${name}`);
        },
        updateItemCount(name, newCount) {
            newCount = parseInt(newCount);
            if (newCount <= 0) {
                this.removeItem(name); 
            } else {
                this.items = this.items.filter(item => item.name !== name);
                for (let i = 0; i < newCount; i++) {
                    this.items.push({ name: name });
                }
            }
            console.log(`Quantitat actualitzada: ${name} - ${newCount} unitats`);
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.items.length === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name)
    }
});
