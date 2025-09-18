import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const { resume, jobDescription } = req.body;

  const prompt = `
Given the following resume details and job description, rate the resume's match to the job (0-100%), and give 3 actionable, concise suggestions for improvement. Output as JSON {score, summary, suggestions:[{title, body}]}.

Resume Summary: ${resume.summary}
Experience: ${resume.experience}
Skills: ${resume.skills}
Education: ${resume.education}

Job Description: ${jobDescription}
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.4,
    });

    // Extract and parse JSON from the response
    const aiText = completion.data.choices[0].message.content;
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in AI output");
    const result = JSON.parse(jsonMatch[0]);
    res.json(result);
  } catch (e) {
    console.error("AI Analysis Error:", e);
    res.status(200).json({
      score: 65,
      summary: "There was an error parsing the AI response. Please try again.",
      suggestions: [],
    });
  }
});

export default router;
