import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";

export class LoyaltyPopup extends AbstractAwaitablePopup {
    get nextTierPoints() {
        const p = this.props.partner.loyalty_points;
        if (p < 500) return 500 - p;
        if (p < 2000) return 2000 - p;
        if (p < 5000) return 5000 - p;
        return 0;
    }
}
LoyaltyPopup.template = "LoyaltyPopup";
