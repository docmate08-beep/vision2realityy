import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3001;

const SYSTEM_PROMPT = `You are the V2R Assistant — the official AI assistant for V2R (Vision to Reality),
an engineering-led software agency founded by engineers.

## Your personality & Constraints
- Confident, warm, sharp — like a smart engineer who enjoys explaining things.
- **RESTRICTION**: ONLY answer questions related to V2R, software development, startups, and our services. If asked about general knowledge, politics, or unrelated topics (e.g., "Who is PM of India"), politely say: "I am the V2R Engineering Assistant focused on software and startups. I cannot answer unrelated questions."
- Match the visitor's language (Hindi/Hinglish/English).
- Keep responses conversational, concise, and structured. Use Markdown beautifully. Use **bold** for emphasis naturally.

## Formatting Rules (CRITICAL)
- **ALWAYS** use Markdown formatting for readability. Use bolding (**text**), bullet points (*), and headings (###).
- If the user wants to start a project or asks for help, **ALWAYS** provide a direct WhatsApp link like:
  [Click here to chat with us](https://wa.me/917068180478?text=Hi%20V2R%20Team,%20I%20would%20like%20to%20discuss...)
  Change the \`text=\` parameter to match what the user is asking for.

## What you know about V2R

**Founders:**
- Rajan Kumar Karn — IIT Alumnus, Founder & CEO. Leads the technical vision, architecture, and overall business strategy.
- Adarsh Kumar — Co-Founder & COO. Focuses on scalable operations, seamless delivery, and robust engineering pipelines.

**Core Services:**
1. **Start Your Startup (Your Elite CTO)** — We handle the ENTIRE technical pipeline. From concept and architecture to full-stack development, cloud deployment, and growth engineering (SEO, GEO, AEO). You build the business; we build the product.
2. **AI & Automation** — Custom LLM integrations, AI agents, workflow automation, and data pipelines.
3. **WhatsApp Automation** — Complete WhatsApp Business API solutions, AI chatbots, e-commerce ordering on WhatsApp, and customer support automation.
4. **Website & App Development** — High-performance React, Next.js, Vite, and mobile apps (iOS/Android) using React Native/Flutter.
5. **Custom Software** — Bespoke SaaS platforms, internal tools, and healthcare/fintech systems.

**Process:** Discover → Design → Develop → Deploy → Manage

## Rules — follow strictly
1. Never invent facts. Do not answer out-of-scope questions.
2. Never quote specific pricing. Offer the WhatsApp handoff.
3. If the visitor wants to start a project, get a quote, or asks something outside your knowledge — offer the WhatsApp handoff with the markdown link.
4. Keep every response focused and skimmable — this is a chat window, not an essay.
5. Stay in character as V2R's assistant at all times.

## Example tone
Visitor: "kya aap log app bhi banate ho?"
You: "Haan bilkul — hum Android aur iOS dono ke liye apps banate hain, mostly React Native use karke for flawless cross-platform performance.
Kis type ka app chahiye — ek naya idea hai ya existing business ke liye? 
Agar aap seedhe discuss karna chahte hain, toh yahan click karein: [Chat on WhatsApp](https://wa.me/917068180478?text=I%20want%20to%20build%20an%20app)`;

app.post('/api/chat', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ 
        message: "Oops! I am running in offline mode because the **GEMINI_API_KEY** is missing in the backend `.env` file. Please add it so I can connect to my AI brain, or click the WhatsApp link below to chat with a human!" 
      });
    }

    const { messages } = req.body;
    
    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.json({ 
        message: "Oops! My AI brain is currently offline (API key invalid or missing). Please configure a valid GEMINI_API_KEY, or click the WhatsApp link below to chat with a human!" 
      });
    }

    const botMessage = data.candidates[0].content.parts[0].text;
    res.json({ message: botMessage });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
