export type Interaction = {
  id: string,
  user_id: string,
  product_id: string,
  action_type: "view" | "like" | "purchase",
  timestamp: Date
}