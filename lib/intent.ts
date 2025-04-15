interface Intent {
    type: "enquiry" | "deposit" | "withdrawal" | "portfolio" | "unknown";
    params?: { amount?: number; currency?: string };
  }
  
  function detectIntent(input: string): Intent {
    const lowerInput = input.toLowerCase();
  
    // Deposit intent detection (you can enhance these regexes for better accuracy)
    const depositMatch = lowerInput.match(/deposit.*?(\d+(\.\d+)?)/);
    if (depositMatch) {
      return {
        type: "deposit",
        params: { amount: parseFloat(depositMatch[1]), currency: "USD" },
      };
    }
  
    // Withdrawal intent detection
    const withdrawalMatch = lowerInput.match(/withdraw.*?(\d+(\.\d+)?)/);
    if (withdrawalMatch) {
      return {
        type: "withdrawal",
        params: { amount: parseFloat(withdrawalMatch[1]), currency: "USD" },
      };
    }
  
    // Portfolio detection
    if (lowerInput.includes("portfolio") || lowerInput.includes("my portfolio")) {
      return { type: "portfolio" };
    }
  
    // If none match, assume it's a normal enquiry
    return { type: "enquiry" };
  }
  