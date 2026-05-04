export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query } = req.body;
        
        // This securely grabs the API key from Vercel's environment variables
        const geminiApiKey = process.env.GEMINI_API_KEY; 
        
        if (!geminiApiKey) {
            return res.status(500).json({ error: 'API key not configured securely on server' });
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

        const promptText = `You are a helpful customer support agent for CityCare Clinic. 
Here is the website information:
- Services: General Checkup, Diabetes Care, Women's Health, Blood Tests & Labs, Cardiology, Pediatrics, Dermatology, Dental Care.
- Main Doctor: Dr. Sanjay Gupta, MD (Internal Medicine).
- Contact: +91 95537 22793, email: care@cityhospital.in.
- Location: Apollo Hospital Rd, Jubilee Hills, Hyderabad.
Answer the user's question concisely, politely, and warmly based on this info.

User Question: ${query}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();

        if (response.ok && data.candidates && data.candidates.length > 0) {
            // Send the successful answer back to the frontend
            return res.status(200).json({ answer: data.candidates[0].content.parts[0].text });
        } else {
            console.error("Gemini Error:", data);
            return res.status(500).json({ 
                error: 'Failed to generate response from Gemini', 
                details: data.error ? data.error.message : 'Unknown Gemini Error' 
            });
        }
    } catch (error) {
        console.error("Chat API Error:", error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
