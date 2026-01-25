import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { getNextTierInfo } from "./loyalty_discount_utils";

export class LoyaltyPopup extends AbstractAwaitablePopup {
    static template = "LoyaltyPopup";
    
    get currentTierInfo() {
        const partner = this.props.partner;
        const rules = this.pos.loyalty_discount_rules || [];
        const currentRule = rules.find(rule => rule.loyalty_tier === partner.loyalty_tier);
        
        return {
            tier: partner.loyalty_tier,
            points: partner.loyalty_points,
            discount: currentRule ? currentRule.discount_percentage : 0,
            minAmount: currentRule ? currentRule.minimum_order_amount : 0
        };
    }
    
    get nextTierInfo() {
        const partner = this.props.partner;
        const rules = this.pos.loyalty_discount_rules || [];
        return getNextTierInfo(partner, rules);
    }
}