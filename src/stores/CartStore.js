import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        items: []
    }),
    actions: {
        clearItem(name) {
            // Elimina només UNA unitat d'un producte
            const index = this.items.findIndex(item => item.name === name);
            if (index !== -1) {
                this.items.splice(index, 1); // Elimina la primera coincidència
            }
            console.log(`Unitat eliminada: ${name}`);
        },

        setItemCount(item, count) {
            count = parseInt(count);
            if (count <= 0) {
                this.removeItem(item.name);
            } else {
                // Elimina totes les instàncies d'aquest producte
                this.items = this.items.filter(i => i.name !== item.name);

                // Afegir la nova quantitat correctament
                for (let i = 0; i < count; i++) {
                    this.items.push({ ...item });
                }
            }
            console.log(`Actualitzada quantitat: ${item.name} - ${count} unitats`);
        },

        addItems(count, product) {
            count = parseInt(count) || 1; // Si no hi ha count, per defecte 1
            this.$patch((state) => {
                for (let i = 0; i < count; i++) {
                    state.items.push({ ...product });
                }
            });
            console.log(`Productes afegits: ${product.name} - Quantitat: ${count}`);
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
                this.items = this.items.map(item =>
                    item.name === name ? { ...item, quantity: newCount } : item
                );
            }
            console.log(`Quantitat actualitzada: ${name} - ${newCount} unitats`);
        }

    },

    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.items.length === 0,
        grouped: (state) => groupBy(state.items, (item) => item.name),
        total: (state) => state.items.reduce((sum, item) => sum + (item.price || 0), 0),

        // Nou getter per comptar els elements d'un producte
        groupCount: (state) => (name) => state.grouped[name]?.length || 0
    }

});
