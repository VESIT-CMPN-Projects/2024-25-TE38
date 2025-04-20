import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist/webpack"; // Import PDF.js

export default function ResumeChatbot() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [report, setReport] = useState(null);
  const [tailoredResume, setTailoredResume] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract text from PDF using pdfjs-dist
  const extractTextFromPDF = async (file) => {
    console.log("Extracting text from PDF:", file.name);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      console.log("PDF loaded successfully");
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      console.log("PDF document loaded with", pdf.numPages, "pages");
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      console.log("Extracted text:", extractedText.substring(0, 500), "...");
      setResumeText(extractedText);
    };
  };

  // File Upload Handler
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log("File dropped:", acceptedFiles[0].name);
      extractTextFromPDF(acceptedFiles[0]);
    },
  });

  // Function to analyze resume and generate tailored resume
  const analyzeResume = async () => {
    if (!resumeText || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      console.log("Missing resume or job description");
      return;
    }

    setLoading(true);
    setReport(null);
    setTailoredResume("");
    console.log("Sending data for analysis...");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are an AI-powered ATS resume analyzer." },
            { 
              role: "user", 
              content: `
                Compare the following resume with this job description:
                - Job Description: ${jobDescription}
                - Resume: ${resumeText}

                Return a structured JSON output:
                {
                  "percentage_match": "XX%",
                  "skills_matched": ["Skill1", "Skill2"],
                  "missing_skills": ["Skill3", "Skill4"],
                  "strengths": ["Strong points"],
                  "weaknesses": ["Areas to improve"],
                  "feedback": "Detailed feedback"
                }
                Dont add any extra text(like greeting or here is ..) than json and always return response in standard json format.
              ` 
            }
          ],
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response received:", response.data);

      if (!response.data.choices || response.data.choices.length === 0) {
        console.error("API response does not contain choices:", response.data);
        alert("Unexpected API response format.");
        return;
      }

      const rawContent = response.data.choices[0].message?.content || "";
      console.log("Raw content received:", rawContent);

      // Extract JSON block and parse it
      const jsonStartIndex = rawContent.indexOf("");
      let jsonString = rawContent;

      if (jsonStartIndex !== -1) {
        jsonString = rawContent.substring(jsonStartIndex).replace(/json|```/g, "").trim();
      }

      try {
        const parsedResponse = JSON.parse(jsonString);
        console.log("Parsed response:", parsedResponse);
        setReport(parsedResponse);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        alert("Failed to parse API response. Please check the API output.");
      }

      // Generate tailored resume
      await generateTailoredResume();

    } catch (error) {
      alert("Error analyzing resume. Try again.");
      console.error("API error:", error);
    } finally {
      setLoading(false);
      console.log("Analysis process completed");
    }
  };

  // Function to generate tailored resume

  // Function to download the tailored resume as a text file
const downloadResume = () => {
    if (!tailoredResume) return;
  
    const blob = new Blob([tailoredResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Tailored_Resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  

  const generateTailoredResume = async () => {
    console.log("Generating tailored resume...");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are an AI-powered resume generator." },
            { 
              role: "user", 
              content: `
                Create a tailored resume for the following job description:
                - Job Description: ${jobDescription}
                - Use the original resume as reference: ${resumeText}

                The resume should be formatted in a professional manner, emphasizing skills relevant to the job description, improving any weak points, and ensuring an ATS-friendly format.

                Return the resume as plain text without additional text before or after.
              ` 
            }
          ],
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Tailored resume response received:", response.data);
      
      if (!response.data.choices || response.data.choices.length === 0) {
        console.error("Unexpected API response:", response.data);
        alert("Failed to generate tailored resume.");
        return;
      }

      const tailoredResumeText = response.data.choices[0].message?.content || "";
      console.log("Tailored resume:", tailoredResumeText);

      setTailoredResume(tailoredResumeText);

    } catch (error) {
      alert("Error generating tailored resume.");
      console.error("Resume generation error:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📄 Upload Your Resume</h2>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="3"
        placeholder="Enter job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer text-center mb-4">
        <input {...getInputProps()} />
        <p>Drag & drop your resume (PDF) here, or click to select.</p>
      </div>

      {resumeText && <p className="text-green-600">✅ Resume uploaded successfully!</p>}

      <button
        onClick={analyzeResume}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {report && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold text-lg">🔍 ATS Report:</h3>
          <p><strong>✅ Match Score:</strong> {report.percentage_match}</p>
          <p><strong>📝 Missing skills:</strong> {report.missing_skills}</p>
          <p><strong>📝 skills matched:</strong> {report.skills_matched}</p>
          <p><strong>📝 strengths:</strong> {report.strengths}</p>
          <p><strong>📝 weakness:</strong> {report.weaknesses}</p>
          <p><strong>📝 Feedback:</strong> {report.feedback}</p>
          
        </div>
      )}

      {tailoredResume && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold text-lg">📄 Tailored Resume:</h3>
          <pre className="whitespace-pre-wrap">{tailoredResume}</pre>
          {tailoredResume && (
  <button
    onClick={downloadResume}
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    📥 Download Resume
  </button>
)}

        </div>
      )}
    </div>
  );
}