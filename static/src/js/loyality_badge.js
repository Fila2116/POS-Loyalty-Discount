import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class LoyaltyBadge extends Component {
    setup() {
        this.pos = usePos();
    }

    get partner() {
        return this.pos.get_order()?.get_partner();
    }
}
LoyaltyBadge.template = "LoyaltyBadge";
