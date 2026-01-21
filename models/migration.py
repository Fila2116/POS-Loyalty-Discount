from odoo import api, SUPERUSER_ID

def post_init_hook(env):
    # ensure superuser context
    env = env(context=dict(env.context, uid=SUPERUSER_ID))

    partners = env["res.partner"].search([])
    for partner in partners:
        orders = env["pos.order"].search([
            ("partner_id", "=", partner.id),
            ("state", "=", "paid"),
        ])
        total = sum(orders.mapped("amount_total"))
        partner.loyalty_points = int(total // 100)
