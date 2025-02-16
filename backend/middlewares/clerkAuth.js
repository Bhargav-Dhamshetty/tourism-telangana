const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = ClerkExpressWithAuth({
  onError: (err, req, res) => {
    console.error("❌ Clerk Auth Error:", err);
    res.status(401).json({ error: "Unauthorized" });
  },
});

module.exports = clerkAuth;
