interface Message {
  role: string;
  content: string;
}

const fetchTrainingDataFromAPI = async () => {
  const response = await fetch("http://localhost:3001/api/training-data", {
    headers: {
      Authorization: "Basic " + btoa("admin:securepassword123"),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const getCombinedTrainingData = async () => {
  try {
    const apiTrainingData = await fetchTrainingDataFromAPI();
    const formattedApiData = apiTrainingData
      .map(
        (data: { input: string; output: string }, index: number) =>
          `Example ${index + 1}:\nQuestion: ${data.input}\nAnswer: ${
            data.output
          }`
      )
      .join("\n\n");

    return {
      role: "system",
      content: `You are Shantie, an AI assistant for C-TRADE, Zimbabwe's premier trading platform. Respond professionally with accurate, up-to-date market information.
        Your expertise covers:
        - Zimbabwe Stock Exchange (ZSE) listings
        - Bond markets
        - Trading platform guidance
        - Market analysis
  
        Strictly decline:
        - Non-financial queries
        - Anonymous requests
        - Personal financial advice
  
        The following are some of the FAQs you should be able to answer, you can expand them and correct them where you see fit:
        ${formattedApiData}`,
    };
  } catch (error) {
    console.error("Failed to fetch training data from API:", error);
    return `You are Shantie, an AI assistant for C-TRADE, Zimbabwe's premier trading platform. Your expertise covers: - Zimbabwe Stock Exchange (ZSE) listings - Bond markets - Forex trading (ZWL, USD, etc.) - Trading platform guidance - Market analysis Strictly decline: - Non-financial queries - Anonymous requests - Personal financial advice Respond professionally with accurate, up-to-date market information.`;
  }
};

export const initialMessage = await getCombinedTrainingData();
