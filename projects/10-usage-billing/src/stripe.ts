// Report metered usage to Stripe (stub — wire up the Stripe SDK in production).
export async function reportUsage(subscriptionItemId: string, quantity: number): Promise<void> {
  // await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
  //   quantity, timestamp: Math.floor(Date.now() / 1000), action: 'increment'
  // });
  console.log(`[stripe] usage ${quantity} -> ${subscriptionItemId}`);
}
