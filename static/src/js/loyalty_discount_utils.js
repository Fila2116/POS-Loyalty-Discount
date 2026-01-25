
export function getDiscountForPartner(pos, partner) {
    if (!partner || !partner.loyalty_tier || !pos.loyalty_discount_rules) {
        return 0;
    }
    
   
    const rule = pos.loyalty_discount_rules.find(
        rule => rule.loyalty_tier === partner.loyalty_tier
    );
    
    return rule ? rule.discount_percentage : 0;
}


export function getNextTierInfo(partner, rules) {
    if (!partner || !rules) return null;
    
    const tiers = ["bronze", "silver", "gold", "platinum"];
    const currentIndex = tiers.indexOf(partner.loyalty_tier);
    
    if (currentIndex < tiers.length - 1) {
        const nextTier = tiers[currentIndex + 1];
        const nextRule = rules.find(rule => rule.loyalty_tier === nextTier);
        
        let neededPoints = 0;
        if (nextTier === "silver") neededPoints = 500;
        else if (nextTier === "gold") neededPoints = 2000;
        else if (nextTier === "platinum") neededPoints = 5000;
        
        const pointsNeeded = Math.max(0, neededPoints - partner.loyalty_points);
        
        return {
            tier: nextTier,
            discount: nextRule ? nextRule.discount_percentage : 0,
            pointsNeeded: pointsNeeded
        };
    }
    
    return null;
}