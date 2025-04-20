import { useEffect, useState } from "react";

export default function ProcessBot() {
  const [rules, setRules] = useState<string>("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Load rules.txt on mount
  useEffect(() => {
    fetch("/rules.txt")
      .then((res) => res.text())
      .then((text) => setRules(text))
      .catch((err) => console.error("Error loading rules:", err));
      console.log(rules)
  }, []);

  const askGroq = async (question: string) => {
    console.log(rules)
    if (!rules) return "Rules are still loading. Please try again.";
    
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) return "Groq API key is missing.";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,  // Ensure this is correct
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",  // Example, ensure the model name is valid
          messages: [{ role: "system", content: rules }, { role: "user", content: question  +"\n dont ans any question if not related to placement process or interview, in such case reply- Please Ask question related to placement." }],
          temperature: 0.7
        }),
      });
      

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
  };

  const handleAsk = async () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);

    const botResponse = await askGroq(query);
    
    setLoading(false);
    setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    setQuery("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-2">📢 ProcessBot</h2>

      <div className="h-64 overflow-y-auto bg-white p-3 rounded shadow-inner">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Ask me anything about placements!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded ${
                msg.role === "user" ? "bg-blue-200 text-right" : "bg-green-200 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
        {loading && <p className="text-gray-500 text-center">Thinking...</p>}
      </div>

      <div className="flex mt-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about placements..."
          className="flex-1 p-2 border rounded-l focus:outline-none"
        />
        <button onClick={handleAsk} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Ask
        </button>
      </div>
    </div>
  );
}