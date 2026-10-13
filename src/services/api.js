import { productCategories, allCatalogProducts } from '../data/products';
import { galleryItems } from '../data/gallery';

/**
 * Mock API Service Layer
 * Prepared for seamless migration to REST or GraphQL endpoints in Phase 2.
 */

// Delay simulation helper
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(categoryFilter = null) {
  await delay(100);
  if (!categoryFilter || categoryFilter === 'all') {
    return allCatalogProducts;
  }
  return allCatalogProducts.filter((p) => p.categoryId === categoryFilter);
}

export async function getProductCategories() {
  await delay(50);
  return productCategories;
}

export async function getProductDetails(id) {
  await delay(100);
  const found = allCatalogProducts.find((p) => p.id === id);
  if (!found) throw new Error(`Product not found: ${id}`);
  return found;
}

export async function getGallery(categoryFilter = null) {
  await delay(100);
  if (!categoryFilter || categoryFilter === 'all') {
    return galleryItems;
  }
  return galleryItems.filter((item) =>
    item.category.toLowerCase().includes(categoryFilter.toLowerCase())
  );
}

export async function calculateQuote(config) {
  await delay(200);
  // Algorithmic estimate calculation based on chosen parameters
  const baseCost = config.productType === 'rigid-box' ? 120 :
                   config.productType === 'collapsible-box' ? 95 :
                   config.productType === 'paper-bags' ? 45 : 35;
  
  const quantity = Number(config.quantity) || 500;
  
  // Volume discount tiers
  const volumeMultiplier = quantity >= 5000 ? 0.65 :
                           quantity >= 2500 ? 0.75 :
                           quantity >= 1000 ? 0.85 :
                           quantity >= 500 ? 0.95 : 1.0;

  // Add finishing surcharges
  let finishingCost = 0;
  if (config.foiling) finishingCost += 18;
  if (config.spotUv) finishingCost += 12;
  if (config.embossing) finishingCost += 10;
  if (config.customInserts) finishingCost += 25;
  if (config.ribbon) finishingCost += 8;

  const unitPrice = Math.round((baseCost + finishingCost) * volumeMultiplier);
  const totalEstimate = unitPrice * quantity;

  return {
    unitPrice,
    totalEstimate,
    currency: 'INR',
    currencySymbol: '₹',
    estimatedProductionDays: quantity > 2000 ? '14–18 days' : '10–12 days',
    timestamp: new Date().toISOString()
  };
}

export async function submitLead(leadData) {
  await delay(350);
  // Store locally for demo review
  const existingLeads = JSON.parse(localStorage.getItem('aps_quotes_leads') || '[]');
  const newLead = {
    ...leadData,
    id: `LEAD-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString()
  };
  localStorage.setItem('aps_quotes_leads', JSON.stringify([newLead, ...existingLeads]));
  return { success: true, leadId: newLead.id };
}
