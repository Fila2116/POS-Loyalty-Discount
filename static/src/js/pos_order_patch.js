// pos_order_patch.js
import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";
import { getDiscountForPartner } from "./loyalty_discount_utils";

patch(Order.prototype, {
    setup() {
        super.setup(...arguments);
        this.loyaltyDiscount = 0;
        this.loyaltyRule = null;
    },

    set_partner(partner) {
        const result = super.set_partner(...arguments);
        this._applyLoyaltyDiscount();
        return result;
    },

    add_product(product, options) {
        const line = super.add_product(...arguments);
        this._applyLoyaltyDiscount();
        return line;
    },

    remove_orderline(line) {
        super.remove_orderline(...arguments);
        this._applyLoyaltyDiscount();
    },

    _applyLoyaltyDiscount() {
        const partner = this.get_partner();
        const discount = getDiscountForPartner(this.pos, partner);
        
        const total = this.get_total_with_tax();
        const rules = this.pos.loyalty_discount_rules || [];
        const rule = rules.find(r => 
            r.loyalty_tier === partner?.loyalty_tier && 
            total >= r.minimum_order_amount
        );
        
        const finalDiscount = rule ? rule.discount_percentage : 0;
        
        if (finalDiscount !== this.loyaltyDiscount) {
            this.loyaltyDiscount = finalDiscount;
            this.loyaltyRule = rule;
            
            this.get_orderlines().forEach(line => {
                if (line.product && line.product.type !== 'service') {
                    line.set_discount(finalDiscount);
                }
            });
        }
    },

   
    get_total_with_tax() {
        const total = super.get_total_with_tax();
        return total;
    },


    export_for_printing() {
        const receipt = super.export_for_printing();
        if (this.loyaltyDiscount > 0) {
            receipt.loyalty_discount = {
                percentage: this.loyaltyDiscount,
                rule_name: this.loyaltyRule?.name || "Loyalty Discount"
            };
        }
        return receipt;
    },

   
    get_loyalty_discount() {
        return this.loyaltyDiscount;
    },
    
 
    get_loyalty_rule() {
        return this.loyaltyRule;
    }
});