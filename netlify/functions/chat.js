import { GoogleGenAI } from '@google/genai';

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

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    });
  }

  try {
    const body = await request.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'A message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contents = messages
      .filter(message =>
        (message?.role === 'user' || message?.role === 'bot') &&
        typeof message?.content === 'string' &&
        message.content.trim()
      )
      .map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content.trim() }],
      }));

    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    if (contents.length === 0 || contents.at(-1).role !== 'user') {
      return new Response(JSON.stringify({ error: 'The latest message must be from the user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });
    const botMessage = response.text?.trim();

    if (!botMessage) {
      throw new Error('Gemini returned an empty response');
    }

    return Response.json({ message: botMessage });
  } catch (error) {
    console.error('Chat function error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ error: 'Unable to generate a response right now' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
