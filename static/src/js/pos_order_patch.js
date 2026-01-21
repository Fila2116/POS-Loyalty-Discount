import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {
    get loyaltyDiscount() {
        const partner = this.get_partner();
        return partner?.loyalty_tier || null;
    }
});
