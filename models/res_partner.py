from odoo import models, fields, api

class ResPartner(models.Model):
    _inherit = "res.partner"

    loyalty_points = fields.Integer(default=0)
    loyalty_tier = fields.Selection(
        [
            ("bronze", "Bronze"),
            ("silver", "Silver"),
            ("gold", "Gold"),
            ("platinum", "Platinum"),
        ],
        compute="_compute_loyalty_tier",
        store=True,
    )

    @api.depends("loyalty_points")
    def _compute_loyalty_tier(self):
        for partner in self:
            points = partner.loyalty_points
            if points >= 5000:
                partner.loyalty_tier = "platinum"
            elif points >= 2000:
                partner.loyalty_tier = "gold"
            elif points >= 500:
                partner.loyalty_tier = "silver"
            else:
                partner.loyalty_tier = "bronze"
