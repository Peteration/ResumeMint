"use client";

import { useState, useEffect } from "react";
import { supabase, getUserPremiumStatus } from "@/lib/supabaseClient";
import { generateResumeAI } from "@/lib/ai"; // assume this calls your /api/ai
import { savePDF } from "@/lib/pdf"; // your PDF generator helper
import Classic from "@/components/resume-templates/Classic";
import Modern from "@/components/resume-templates/Modern";
import Elegant from "@/components/resume-templates/Elegant";

export default function ResumeEditor() {
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [resume, setResume] = useState({
    fullName: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: [] as string[],
    skillInput: "",
    experience: [{ company: "", title: "", start: "", end: "", description: "" }],
    education: [{ school: "", degree: "", start: "", end: "" }],
  });

  // Load user session and premium status
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data?.session?.user?.id;
      setUser(data?.session?.user || null);

      if (userId) {
        const premium = await getUserPremiumStatus(userId);
        setIsPremium(premium);
      }
    };
    loadUser();
  }, []);

  // Update field helper
  const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResume({ ...resume, [field]: e.target.value });
  };

  // Skills handlers
  const addSkill = () => {
    if (!resume.skillInput.trim()) return;
    setResume({ ...resume, skills: [...resume.skills, resume.skillInput.trim()], skillInput: "" });
  };
  const removeSkill = (skill: string) => {
    setResume({ ...resume, skills: resume.skills.filter((s) => s !== skill) });
  };

  // Experience & Education handlers
  const addExperience = () =>
    setResume({ ...resume, experience: [...resume.experience, { company: "", title: "", start: "", end: "", description: "" }] });
  const addEducation = () =>
    setResume({ ...resume, education: [...resume.education, { school: "", degree: "", start: "", end: "" }] });

  // AI Resume Generator
  const handleAIGenerate = async () => {
    if (!isPremium) {
      alert("AI Resume generation is available for Premium users only.");
      return;
    }
    setLoadingAI(true);
    try {
      const data = await generateResumeAI(resume);
      setResume((prev) => ({ ...prev, summary: data.result }));
    } catch (err) {
      console.error(err);
      alert("Failed to generate resume via AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  // PDF Export
  const handlePDFDownload = async () => {
    savePDF(resume);
  };

  // Template rendering
  const templates = { Classic, Modern, Elegant };
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>("Classic");
  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-48 bg-gray-900 text-white p-4 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4">Templates</h2>
        {Object.keys(templates).map((temp) => (
          <button
            key={temp}
            className={`w-full text-left p-2 mb-2 rounded ${selectedTemplate === temp ? "bg-blue-600" : "bg-gray-800"}`}
            onClick={() => setSelectedTemplate(temp as keyof typeof templates)}
          >
            {temp}
          </button>
        ))}

        <button onClick={handlePDFDownload} className="mt-6 w-full p-2 bg-blue-600 rounded hover:bg-blue-500">
          Download PDF
        </button>

        {isPremium && (
          <button
            onClick={handleAIGenerate}
            className="mt-4 w-full p-2 bg-green-600 rounded hover:bg-green-500"
          >
            {loadingAI ? "Generating..." : "AI Generate Summary"}
          </button>
        )}
      </aside>

      {/* Editor Form */}
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Resume Details</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="input" placeholder="Full Name" value={resume.fullName} onChange={updateField("fullName")} />
          <input className="input" placeholder="Role" value={resume.role} onChange={updateField("role")} />
          <input className="input" placeholder="Email" value={resume.email} onChange={updateField("email")} />
          <input className="input" placeholder="Phone" value={resume.phone} onChange={updateField("phone")} />
          <input className="input md:col-span-2" placeholder="Location" value={resume.location} onChange={updateField("location")} />
        </div>

        <textarea className="input h-24 mt-4" placeholder="Professional Summary" value={resume.summary} onChange={updateField("summary")} />

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="Add skill"
              value={resume.skillInput}
              onChange={(e) => setResume({ ...resume, skillInput: e.target.value })}
            />
            <button onClick={addSkill} className="px-4 bg-blue-600 text-white rounded">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {resume.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer" onClick={() => removeSkill(skill)}>
                {skill} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Experience</h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-2 mb-4">
              <input className="input" placeholder="Company" value={exp.company} onChange={(e) => {
                const copy = [...resume.experience];
                copy[i].company = e.target.value;
                setResume({ ...resume, experience: copy });
              }} />
              <input className="input" placeholder="Title" value={exp.title} onChange={(e) => {
                const copy = [...resume.experience];
                copy[i].title = e.target.value;
                setResume({ ...resume, experience: copy });
              }} />
              <input className="input" placeholder="Start" value={exp.start} onChange={(e) => {
                const copy = [...resume.experience];
                copy[i].start = e.target.value;
                setResume({ ...resume, experience: copy });
              }} />
              <input className="input" placeholder="End" value={exp.end} onChange={(e) => {
                const copy = [...resume.experience];
                copy[i].end = e.target.value;
                setResume({ ...resume, experience: copy });
              }} />
              <textarea className="input md:col-span-2 h-20" placeholder="Description" value={exp.description} onChange={(e) => {
                const copy = [...resume.experience];
                copy[i].description = e.target.value;
                setResume({ ...resume, experience: copy });
              }} />
            </div>
          ))}
          <button onClick={addExperience} className="px-4 py-2 bg-gray-800 text-white rounded">
            + Add Experience
          </button>
        </div>

        {/* Education */}
        <div className="mt-6 mb-20">
          <h2 className="font-semibold mb-2">Education</h2>
          {resume.education.map((edu, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-2 mb-4">
              <input className="input" placeholder="School" value={edu.school} onChange={(e) => {
                const copy = [...resume.education];
                copy[i].school = e.target.value;
                setResume({ ...resume, education: copy });
              }} />
              <input className="input" placeholder="Degree" value={edu.degree} onChange={(e) => {
                const copy = [...resume.education];
                copy[i].degree = e.target.value;
                setResume({ ...resume, education: copy });
              }} />
              <input className="input" placeholder="Start" value={edu.start} onChange={(e) => {
                const copy = [...resume.education];
                copy[i].start = e.target.value;
                setResume({ ...resume, education: copy });
              }} />
              <input className="input" placeholder="End" value={edu.end} onChange={(e) => {
                const copy = [...resume.education];
                copy[i].end = e.target.value;
                setResume({ ...resume, education: copy });
              }} />
            </div>
          ))}
          <button onClick={addEducation} className="px-4 py-2 bg-gray-800 text-white rounded">
            + Add Education
          </button>
        </div>
      </main>

      {/* Live Preview */}
      <aside className="w-full md:w-[35%] bg-white border-l overflow-y-auto p-6">
        <SelectedTemplate resume={resume} />
      </aside>
    </div>
  );
}
