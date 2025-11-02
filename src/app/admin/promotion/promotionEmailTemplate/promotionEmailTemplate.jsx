// admin/promotion/promotionEmailTemplate/promotionEmailTemplate.js
export function PromotionEmailTemplate(promotion) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #030303; color: #F1EFEC; border: 2px solid #D4C9BE; border-radius: 10px; padding: 20px; max-width: 600px; margin: auto;">
      <h2 style="text-align: center; color: #F1EFEC;">${promotion.title}</h2>
      ${
        promotion.image
          ? `<div style="text-align:center; margin: 20px 0;">
              <img src="${process.env.NEXT_PUBLIC_BASE_URL}${promotion.image}" alt="${promotion.title}" style="max-width: 100%; border-radius: 10px;"/>
            </div>`
          : ""
      }
      <p style="font-size: 15px; line-height: 1.6;">${promotion.description}</p>
      <div style="background-color: #D4C9BE; color: #030303; padding: 10px; border-radius: 8px; text-align: center; font-weight: bold; letter-spacing: 1px; margin: 20px 0;">
        Promo Code: ${promotion.promoCode}
      </div>
      <p><strong>Discount:</strong> ${promotion.percentage || 0}%</p>
      <p><strong>Limit Quota:</strong> ${promotion.limitQuota}</p>
      <p><strong>Valid:</strong> ${promotion.startDate} - ${promotion.endDate}</p>
      <p style="margin-top: 20px; text-align:center;">Don't miss out on this special offer!</p>
    </div>
  `
}
