"use client";

import { useState, useEffect } from "react";
import { Resume } from "@/types/resume";
import { supabase } from "@/lib/supabaseClient"; // client-side Supabase for auth
import { getUserPremiumStatus } from "@/lib/supabase/server"; // server function
import { generateResumeAI } from "@/lib/ai";
import Classic from "@/components/resume-templates/Classic";
import Modern from "@/components/resume-templates/Modern";
import Elegant from "@/components/resume-templates/Elegant";

type ResumeType = Resume & { skillInput: string };

export default function ResumeEditor() {
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"Classic" | "Modern" | "Elegant">("Classic");
  const [resume, setResume] = useState<ResumeType>({
    fullName: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: [],
    skillInput: "",
    experience: [{ company: "", title: "", start: "", end: "", description: "" }],
    education: [{ school: "", degree: "", start: "", end: "" }],
    sections: [],
  });

  const templates = { Classic, Modern, Elegant };
  const SelectedTemplate = templates[selectedTemplate];

  // Load user session & premium status
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

  // Field handlers
  const updateField = (field: keyof ResumeType) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setResume({ ...resume, [field]: e.target.value });

  // Skills
  const addSkill = () => {
    if (!resume.skillInput.trim()) return;
    setResume({ ...resume, skills: [...resume.skills, resume.skillInput.trim()], skillInput: "" });
  };
  const removeSkill = (skill: string) => {
    setResume({ ...resume, skills: resume.skills.filter((s) => s !== skill) });
  };

  // Experience & Education
  const addExperience = () =>
    setResume({ ...resume, experience: [...resume.experience, { company: "", title: "", start: "", end: "", description: "" }] });
  const addEducation = () =>
    setResume({ ...resume, education: [...resume.education, { school: "", degree: "", start: "", end: "" }] });

  // AI Resume Generation
  const handleAIGenerate = async () => {
    if (!isPremium) return alert("AI Resume generation is for Premium users only.");
    setLoadingAI(true);
    try {
      const summary = await generateResumeAI(resume);
      setResume((prev) => ({ ...prev, summary }));
    } catch (err) {
      console.error(err);
      alert("Failed to generate resume via AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  // PDF Download (calls server route)
  const handlePDFDownload = async () => {
    if (!resume.id) return alert("Resume ID missing.");
    const res = await fetch(`/resume/${resume.id}/pdf`);
    if (!res.ok) return alert("Failed to generate PDF.");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.fullName}_resume.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

        <button onClick={handlePDFDownload} className="mt-6 w-full
