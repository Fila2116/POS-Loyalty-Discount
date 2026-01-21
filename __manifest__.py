{
    "name": "POS Loyalty Discount",
    "version": "17.0.1.0.0",
    "category": "Point of Sale",
    "summary": "Tier-based loyalty discount system for POS",
    "depends": ["point_of_sale"],
    "post_init_hook": "post_init_hook",
    "data": [
        "security/security.xml",
        "security/ir.model.access.csv",
        "views/res_partner_views.xml",
        "views/pos_discount_rule_views.xml",
        "views/pos_loyalty_menu.xml",
        "data/default_discount_rules.xml",
    ],
    "assets": {
        "point_of_sale.assets": [
            "pos_loyalty_discount/static/src/js/*.js",
            "pos_loyalty_discount/static/src/xml/*.xml",
        ],
    },
    "installable": True,
    "application": False,
}
