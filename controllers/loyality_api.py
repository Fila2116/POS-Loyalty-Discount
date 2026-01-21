from odoo import http
from odoo.http import request

class LoyaltyAPI(http.Controller):

    @http.route("/api/loyalty/status", type="json", auth="user")
    def loyalty_status(self, partner_id):
        partner = request.env["res.partner"].browse(partner_id)
        if not partner.exists():
            return {"error": "Partner not found"}

        return {
            "points": partner.loyalty_points,
            "tier": partner.loyalty_tier,
        }

    @http.route("/api/loyalty/add_points", type="json", auth="user")
    def add_points(self, partner_id, points):
        partner = request.env["res.partner"].browse(partner_id)
        if not partner.exists():
            return {"error": "Partner not found"}

        partner.loyalty_points += int(points)
        return {"success": True}
