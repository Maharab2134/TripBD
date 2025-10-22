// API Configuration
// Local development এর জন্য localhost ব্যবহার করুন
// Production এ deploy করার পর এখানে আপনার deployed API URL দিবেন

const API_BASE_URL = "http://localhost:3000";

// Export করুন যাতে সব file থেকে use করতে পারেন
if (typeof module !== "undefined" && module.exports) {
  module.exports = { API_BASE_URL };
}
