from odoo import models, api

class PosOrder(models.Model):
    _inherit = "pos.order"

    @api.model
    def _order_fields(self, ui_order):
        vals = super()._order_fields(ui_order)

        partner_id = vals.get("partner_id")
        amount_total = vals.get("amount_total", 0)

        if partner_id:
            partner = self.env["res.partner"].browse(partner_id)

            rule = self.env["pos.discount.rule"].search([
                ("loyalty_tier", "=", partner.loyalty_tier),
                ("minimum_order_amount", "<=", amount_total),
                ("active", "=", True),
                ("company_id", "=", self.env.company.id),
            ], limit=1)

            if rule:
                discount = amount_total * (rule.discount_percentage / 100)
                vals["amount_total"] -= discount

            earned_points = int(amount_total // 100)
            partner.loyalty_points += earned_points

        return vals
