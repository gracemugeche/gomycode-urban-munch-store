export const categories = ["groceries", "meals", "drinks"] as const;
export type Category = typeof categories[number];
