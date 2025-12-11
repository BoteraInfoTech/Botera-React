// Sample data for PremiumInbox components

export const ACCOUNTS = ["Account 1", "Account 2", "Account 3"];

export const sampleConversations = Array.from({ length: 18 }).map((_, i) => ({
  id: `c${i + 1}`,
  name: `Customer ${i + 1}`,
  last: "Hey — checking my order status",
  time: `11:2${i % 10} AM`,
  unread: i % 3 === 0 ? 1 + (i % 2) : 0,
  pinned: i === 3,
  avatarColor:
    i % 2 === 0 ? "from-sky-200 to-sky-400" : "from-rose-200 to-rose-400",
}));

export const sampleMessages = [
  {
    id: 1,
    type: "in",
    text: "Hello! How can I help you today?",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "out",
    text: "I haven't received my order yet.",
    time: "10:32 AM",
  },
  {
    id: 3,
    type: "in",
    text: "Can you share your order ID?",
    time: "10:34 AM",
  },
];

export const suggestedReplies = [
  "Sure, I can help with that.",
  "Can you share your order ID?",
  "Sorry for the delay — I'll check and update you.",
];
