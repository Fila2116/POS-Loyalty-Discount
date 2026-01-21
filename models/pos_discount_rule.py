from odoo import models, fields

class PosDiscountRule(models.Model):
    _name = "pos.discount.rule"
    _description = "POS Loyalty Discount Rule"
    _order = "discount_percentage desc"

    name = fields.Char(required=True)
    loyalty_tier = fields.Selection(
        [
            ("bronze", "Bronze"),
            ("silver", "Silver"),
            ("gold", "Gold"),
            ("platinum", "Platinum"),
        ],
        required=True,
    )
    discount_percentage = fields.Float(required=True)
    minimum_order_amount = fields.Float(default=0.0)
    active = fields.Boolean(default=True)
    company_id = fields.Many2one(
        "res.company", default=lambda self: self.env.company
    )
