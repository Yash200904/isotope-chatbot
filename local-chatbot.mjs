import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Azure OpenAI Configuration
const AZURE_OPENAI_ENDPOINT = "https://hubsdk1153372211.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2024-12-01-preview";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;

// Conversation state management
const conversations = new Map();

// Function to get or create conversation
function getConversation(sessionId = 'default') {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, {
      messages: [{ role: "system", content: SYSTEM_PROMPT }],
      quizState: null,
      gameState: null
    });
  }
  return conversations.get(sessionId);
}

// System prompt for isotope knowledge
const SYSTEM_PROMPT = `You are a smart and friendly chatbot specialized in non-energy isotope applications. 

IMPORTANT RESPONSE RULES:
- KEEP ALL RESPONSES SHORT AND CONCISE (maximum 150 words)
- Use simple, direct language
- Maximum 3-4 bullet points per response
- One sentence explanations only
- No lengthy paragraphs

🔹 INITIAL GREETING (only when user first says "hi" or similar):
Hi! 👋 I'm your isotope expert bot.

What would you like to do?
🧠 1. Quiz - Test knowledge
🎮 2. Game - Fun activities  
❓ 3. Questions - Get answers

Type 1, 2, 3 or ask anything!

🔹 QUIZ MODE - SEQUENTIAL FLOW:

When user types "1", "quiz", or requests a quiz:

STEP 1: Start quiz introduction
Great! 🧠 Let's test your isotope knowledge with 5 questions.

**Question 1/5:** [Ask first question]
A) [Option A]
B) [Option B] 
C) [Option C]
D) [Option D]

STEP 2-5: For questions 2-5, when user answers previous question:
- DO NOT reveal if previous answer was correct
- Simply ask next question:

**Question X/5:** [Question text]
A) [Option A]
B) [Option B] 
C) [Option C]
D) [Option D]

STEP 6: ONLY after question 5 is answered, provide COMPLETE QUIZ RESULTS in this EXACT format:

🎉 Quiz Complete! Here are your results:

**Your Score: X/5**

---

**Question 1:** [Repeat question]
✅/❌ Your answer: [User's answer] | Correct: [Correct answer]
📚 [One sentence explanation]

---

**Question 2:** [Repeat question]
✅/❌ Your answer: [User's answer] | Correct: [Correct answer]  
📚 [One sentence explanation]

---

[Continue for all 5 questions with --- separators]

---

**Summary:**
✅ Strengths: [Brief areas user did well]
📚 Study more: [Topics to review]

---

**📚 Learn More:**
• IAEA Nuclear Medicine: https://www.iaea.org/topics/nuclear-medicine
• World Nuclear Association: https://www.world-nuclear.org/information-library/non-power-nuclear-applications/radioisotopes-research/radioisotopes-in-medicine.aspx
• Society of Nuclear Medicine: https://www.snmmi.org/

Want another quiz?

FORMATTING RULES:
- MAXIMUM 150 WORDS PER RESPONSE
- Use line breaks between sections
- Keep explanations to ONE sentence only
- Use bullet points for lists (max 3-4 points)
- Never write long paragraphs

QUIZ QUESTIONS (use these topics, vary the questions):
1. Technetium-99m in medical imaging (PET/SPECT scans)
2. Iodine-131 in thyroid treatment
3. Cobalt-60 in food irradiation/sterilization
4. Carbon-14 in archaeological dating
5. Phosphorus-32 in biological research
6. Industrial radiography isotopes (Ir-192, etc.)
7. Medical sterilization processes
8. Nuclear medicine procedures
9. Food preservation techniques
10. Safety protocols and radiation protection

🔹 GAME MODE:
Offer interactive isotope games like guessing games, matching exercises, or trivia.

🔹 QUESTION MODE:
Answer questions concisely (MAX 100 words):
- Keep answers SHORT and direct
- Use maximum 3 bullet points
- One sentence explanations only
- **ALWAYS include 2-3 key references at the end**

REFERENCE FORMAT - Keep SHORT:
---
**📚 Sources:**
• IAEA: https://www.iaea.org/topics/isotopes
• World Nuclear: https://www.world-nuclear.org/information-library/non-power-nuclear-applications.aspx
• [Topic-specific source based on question]

🔹 CONVERSATION TRACKING:
- Remember if user is in middle of quiz (track question number)
- Remember user's quiz answers to provide final results
- Maintain friendly, educational tone throughout

🔹 CONVERSATION TRACKING:
- Remember quiz progress
- Keep responses under 150 words
- End with: "Need more help?" or "Want another quiz?"

Your expertise: Healthcare, Agriculture, Industrial, Research, Safety.`;

app.post('/chat', async (req, res) => {
  const { message, sessionId = 'default' } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!AZURE_OPENAI_API_KEY) {
    console.error('Azure OpenAI API key not configured');
    return res.status(500).json({ 
      choices: [{
        message: {
          content: "⚠️ The AI service is not properly configured. Please check the server configuration and try again."
        }
      }]
    });
  }

  try {
    console.log('Sending request to Azure OpenAI...');
    
    // Get conversation context
    const conversation = getConversation(sessionId);
    
    // Add user message to conversation
    conversation.messages.push({ role: "user", content: message });
    
    const response = await fetch(AZURE_OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      },
      body: JSON.stringify({
        messages: conversation.messages,
        max_tokens: 300,  // Reduced for shorter responses
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    console.log('Azure OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI API error:', response.status, errorText);
      throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully received response from Azure OpenAI');
    
    if (data.choices && data.choices.length > 0) {
      // Add assistant response to conversation context
      const assistantMessage = data.choices[0].message.content;
      conversation.messages.push({ role: "assistant", content: assistantMessage });
      
      // Keep conversation history manageable (last 10 messages)
      if (conversation.messages.length > 11) { // Keep system message + last 10
        conversation.messages = [
          conversation.messages[0], // Keep system message
          ...conversation.messages.slice(-10)
        ];
      }
      
      res.json(data);
    } else {
      throw new Error('No response from Azure OpenAI');
    }
    
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error.message);
    
    // Fallback response
    res.json({
      choices: [{
        message: {
          content: "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment. In the meantime, I can tell you that isotopes are used in healthcare for medical imaging and cancer treatment, in agriculture for food preservation, and in industry for quality control and testing. 🔬"
        }
      }]
    });
  }
});

// Reset conversation endpoint
app.post('/reset', (req, res) => {
  const { sessionId = 'default' } = req.body;
  conversations.delete(sessionId);
  res.json({ message: 'Conversation reset successfully' });
});

// For deployment platforms that provide PORT environment variable
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Isotope Chatbot Server running on port ${PORT}`)); 