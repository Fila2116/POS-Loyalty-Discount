
import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { PosGlobalState } from "@point_of_sale/app/store/pos_global_state";

patch(PosGlobalState.prototype, {
    async _processData(loadedData) {
        const result = await super._processData(...arguments);
        
        if (loadedData.models['pos.discount.rule']) {
            this.loyalty_discount_rules = loadedData.models['pos.discount.rule'];
            console.log("Loaded loyalty discount rules:", this.loyalty_discount_rules);
        }
        
        return result;
    }
});

registry.category("pos_models").add("pos.discount.rule", {
    model: "pos.discount.rule",
    fields: ["name", "loyalty_tier", "discount_percentage", "minimum_order_amount", "active"],
    loaded: function (pos, rules) {
        pos.loyalty_discount_rules = rules.filter(rule => rule.active);
        console.log("Active loyalty discount rules loaded:", pos.loyalty_discount_rules);
    },
});