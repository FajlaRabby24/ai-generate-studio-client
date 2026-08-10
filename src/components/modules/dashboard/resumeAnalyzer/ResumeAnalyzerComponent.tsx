"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { GenerationStatus, GenerationType } from "@/config/constant";
import { getRecentGenerationService, analyzeResumeService, generateResumePdfService } from "@/services/dashboard/resume-analyzer/resumeAnalyzer.service";
import { IAnalyzeResumeResponse, IGetRecentResumeAnalyzerResponse, IResumeAnalyzerResponse } from "@/types/resumeAnalyzer.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  History,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
  X,
  RefreshCw,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ResumeAnalyzerComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [improveResume, setImproveResume] = useState(false);
  const [selectedScan, setSelectedScan] = useState<
    | (IAnalyzeResumeResponse & {
        createdAt?: Date | string;
        generatedPdfUrl?: string | null;
      })
    | null
  >(null);
  const [editableResume, setEditableResume] = useState<any | null>(null);
  const [activeAnalyzerId, setActiveAnalyzerId] = useState<string | null>(null);
  const [editorPdfUrl, setEditorPdfUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch recent scans
  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentResumeScans"],
    queryFn: getRecentGenerationService,
  });

  const recentScans = recentRes?.data || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const { mutateAsync: analyzeResume, isPending: isAnalyzing } = useMutation({
    mutationFn: analyzeResumeService,
    onSuccess: (data) => {
      if (data?.success && data.data) {
        toast.success("Resume analyzed successfully!");
        setFile(null);
        setPrompt("");
        setImproveResume(false);
        setSelectedScan(data.data);
        queryClient.invalidateQueries({ queryKey: ["recentResumeScans"] });
      } else {
        toast.error(data?.message || "Failed to analyze resume.");
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to analyze resume.");
    },
  });
 
  const { mutateAsync: generatePdf, isPending: isGeneratingPdf } = useMutation({
    mutationFn: generateResumePdfService,
    onSuccess: (data) => {
      if (data?.success && data.data?.pdfUrl) {
        toast.success("PDF generated and saved successfully!");
        setEditorPdfUrl(data.data.pdfUrl);
        queryClient.invalidateQueries({ queryKey: ["recentResumeScans"] });
      } else {
        toast.error(data?.message || "Failed to generate PDF.");
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to generate PDF.");
    },
  });

  const handleSavePdf = async () => {
    if (!activeAnalyzerId) {
      toast.error("No active resume analyzer ID found.");
      return;
    }
    try {
      await generatePdf({
        name: editableResume?.personalInfo?.fullName || "Resume",
        analyzerId: activeAnalyzerId,
        editedResumeJson: editableResume,
      });
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to generate PDF.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select a resume to analyze.");
      return;
    }

    const formData = new FormData();
    formData.append("single-pdf", file);
    if (prompt.trim()) {
      formData.append("prompt", prompt.trim());
    }
    formData.append("isGenerateResume", improveResume ? "true" : "false");
    formData.append("type", GenerationType.RESUME_ANALYZER);

    try {
      await analyzeResume(formData);
    } catch (e:any) {
      console.error(e);
       toast.error(e?.message || "Failed to analyze resume.");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 60)
      return "text-amber-500 border-amber-500/30 bg-amber-500/10";
    return "text-rose-500 border-rose-500/30 bg-rose-500/10";
  };
 
  if (editableResume) {
    const p = editableResume.personalInfo || {};
    const s = editableResume.skills || {};
    const experiences = editableResume.experience || [];
    const projects = editableResume.projects || [];
    const educations = editableResume.education || [];

    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full gap-8">
        {/* Editor Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6 shrink-0">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              Customize Resume
              <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase">
                Editor
              </span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Edit the AI-restructured resume details below and generate a styled PDF layout.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                setEditableResume(null);
                setActiveAnalyzerId(null);
                setEditorPdfUrl(null);
              }}
              variant="outline"
              className="rounded-xl border border-border h-11 font-bold shadow-sm"
              disabled={isGeneratingPdf}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePdf}
              disabled={isGeneratingPdf}
              className="rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-lg shadow-primary/20 flex items-center gap-2 h-11 px-5 animate-in hover:scale-[1.01] transition-transform"
            >
              {isGeneratingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Save & Generate PDF
                </>
              )}
            </Button>
            {editorPdfUrl && (
              <a href={editorPdfUrl} download target="_blank" rel="noopener noreferrer">
                <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 h-11 shadow-lg shadow-emerald-600/20">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor (6 Columns) */}
          <div className="lg:col-span-6 space-y-6 max-h-[78vh] overflow-y-auto pr-2 pb-12">
            {/* 1. Personal Information */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-md space-y-4 shadow-md">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2">
                <FileText className="w-5 h-5 text-primary" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    value={p.fullName || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, fullName: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Job Title / Headline</label>
                  <input
                    type="text"
                    value={p.title || p.jobTitle || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, title: e.target.value, jobTitle: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    value={p.email || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, email: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                  <input
                    type="text"
                    value={p.phone || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, phone: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Location (City, Country)</label>
                  <input
                    type="text"
                    value={p.location || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, location: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">LinkedIn URL</label>
                  <input
                    type="text"
                    value={p.linkedin || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, linkedin: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">GitHub URL</label>
                  <input
                    type="text"
                    value={p.github || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, github: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Portfolio URL</label>
                  <input
                    type="text"
                    value={p.portfolio || ""}
                    onChange={(e) =>
                      setEditableResume({
                        ...editableResume,
                        personalInfo: { ...p, portfolio: e.target.value },
                      })
                    }
                    className="w-full h-10 p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Professional Summary</label>
                <textarea
                  value={p.summary || ""}
                  onChange={(e) =>
                    setEditableResume({
                      ...editableResume,
                      personalInfo: { ...p, summary: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none resize-none"
                />
              </div>
            </div>

            {/* 2. Skills Information */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-md space-y-4 shadow-md">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-2">
                <Sparkles className="w-5 h-5 text-primary" /> Skills
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Technical Skills (Comma separated)</label>
                  <textarea
                    value={s.technical?.join(", ") || ""}
                    onChange={(e) => {
                      const tags = e.target.value.split(",").map((t) => t.trim());
                      setEditableResume({
                        ...editableResume,
                        skills: { ...s, technical: tags },
                      });
                    }}
                    rows={2}
                    className="w-full p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none resize-none"
                    placeholder="JavaScript, TypeScript, React.js, Node.js..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Soft Skills (Comma separated)</label>
                  <textarea
                    value={s.soft?.join(", ") || ""}
                    onChange={(e) => {
                      const tags = e.target.value.split(",").map((t) => t.trim());
                      setEditableResume({
                        ...editableResume,
                        skills: { ...s, soft: tags },
                      });
                    }}
                    rows={2}
                    className="w-full p-3 rounded-lg border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm outline-none resize-none"
                    placeholder="Problem Solving, Adaptability, Collaboration..."
                  />
                </div>
              </div>
            </div>

            {/* 3. Professional Experience */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-md space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" /> Experience
                </h3>
                <Button
                  onClick={() => {
                    const newExp = [
                      ...experiences,
                      { title: "", company: "", duration: "", bulletPoints: [""] },
                    ];
                    setEditableResume({ ...editableResume, experience: newExp });
                  }}
                  size="sm"
                  className="rounded-lg h-8 flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </Button>
              </div>

              {experiences.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No experience items added.</p>
              ) : (
                <div className="space-y-4">
                  {experiences.map((job: any, idx: number) => (
                    <div key={idx} className="relative p-4 border border-border/60 rounded-xl bg-background/30 space-y-3 group">
                      <button
                        onClick={() => {
                          const newExp = experiences.filter((_: any, i: number) => i !== idx);
                          setEditableResume({ ...editableResume, experience: newExp });
                        }}
                        className="absolute top-3 right-3 p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Job Title</label>
                          <input
                            type="text"
                            value={job.title || ""}
                            onChange={(e) => {
                              const newExp = [...experiences];
                              newExp[idx] = { ...newExp[idx], title: e.target.value };
                              setEditableResume({ ...editableResume, experience: newExp });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Company</label>
                          <input
                            type="text"
                            value={job.company || ""}
                            onChange={(e) => {
                              const newExp = [...experiences];
                              newExp[idx] = { ...newExp[idx], company: e.target.value };
                              setEditableResume({ ...editableResume, experience: newExp });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Duration (e.g., 2023-Present)</label>
                          <input
                            type="text"
                            value={job.duration || ""}
                            onChange={(e) => {
                              const newExp = [...experiences];
                              newExp[idx] = { ...newExp[idx], duration: e.target.value };
                              setEditableResume({ ...editableResume, experience: newExp });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground flex items-center justify-between">
                          <span>Responsibilities (One point per line)</span>
                        </label>
                        <textarea
                          value={job.bulletPoints?.join("\n") || ""}
                          onChange={(e) => {
                            const newExp = [...experiences];
                            newExp[idx] = {
                              ...newExp[idx],
                              bulletPoints: e.target.value.split("\n"),
                            };
                            setEditableResume({ ...editableResume, experience: newExp });
                          }}
                          rows={3}
                          className="w-full p-2 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none resize-none"
                          placeholder="Quantified action-driven point 1&#10;Point 2..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Projects Section */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-md space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Projects
                </h3>
                <Button
                  onClick={() => {
                    const newProj = [
                      ...projects,
                      { name: "", description: "", technologies: [], liveUrl: "", githubUrl: "" },
                    ];
                    setEditableResume({ ...editableResume, projects: newProj });
                  }}
                  size="sm"
                  className="rounded-lg h-8 flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </Button>
              </div>

              {projects.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No project items added.</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project: any, idx: number) => (
                    <div key={idx} className="relative p-4 border border-border/60 rounded-xl bg-background/30 space-y-3 group">
                      <button
                        onClick={() => {
                          const newProj = projects.filter((_: any, i: number) => i !== idx);
                          setEditableResume({ ...editableResume, projects: newProj });
                        }}
                        className="absolute top-3 right-3 p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Project Name</label>
                          <input
                            type="text"
                            value={project.name || ""}
                            onChange={(e) => {
                              const newProj = [...projects];
                              newProj[idx] = { ...newProj[idx], name: e.target.value };
                              setEditableResume({ ...editableResume, projects: newProj });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Technologies Used (Comma separated)</label>
                          <input
                            type="text"
                            value={project.technologies?.join(", ") || ""}
                            onChange={(e) => {
                              const tags = e.target.value.split(",").map((t) => t.trim());
                              const newProj = [...projects];
                              newProj[idx] = { ...newProj[idx], technologies: tags };
                              setEditableResume({ ...editableResume, projects: newProj });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                            placeholder="React, MongoDB, Node..."
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Live URL</label>
                          <input
                            type="text"
                            value={project.liveUrl || ""}
                            onChange={(e) => {
                              const newProj = [...projects];
                              newProj[idx] = { ...newProj[idx], liveUrl: e.target.value };
                              setEditableResume({ ...editableResume, projects: newProj });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">GitHub URL</label>
                          <input
                            type="text"
                            value={project.githubUrl || ""}
                            onChange={(e) => {
                              const newProj = [...projects];
                              newProj[idx] = { ...newProj[idx], githubUrl: e.target.value };
                              setEditableResume({ ...editableResume, projects: newProj });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground">Description</label>
                        <textarea
                          value={project.description || ""}
                          onChange={(e) => {
                            const newProj = [...projects];
                            newProj[idx] = { ...newProj[idx], description: e.target.value };
                            setEditableResume({ ...editableResume, projects: newProj });
                          }}
                          rows={2}
                          className="w-full p-2 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Education Section */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-md space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Education
                </h3>
                <Button
                  onClick={() => {
                    const newEdu = [...educations, { degree: "", institution: "", year: "" }];
                    setEditableResume({ ...editableResume, education: newEdu });
                  }}
                  size="sm"
                  className="rounded-lg h-8 flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </Button>
              </div>

              {educations.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No education items added.</p>
              ) : (
                <div className="space-y-4">
                  {educations.map((school: any, idx: number) => (
                    <div key={idx} className="relative p-4 border border-border/60 rounded-xl bg-background/30 space-y-3 group">
                      <button
                        onClick={() => {
                          const newEdu = educations.filter((_: any, i: number) => i !== idx);
                          setEditableResume({ ...editableResume, education: newEdu });
                        }}
                        className="absolute top-3 right-3 p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Degree / Major</label>
                          <input
                            type="text"
                            value={school.degree || ""}
                            onChange={(e) => {
                              const newEdu = [...educations];
                              newEdu[idx] = { ...newEdu[idx], degree: e.target.value };
                              setEditableResume({ ...editableResume, education: newEdu });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Institution</label>
                          <input
                            type="text"
                            value={school.institution || ""}
                            onChange={(e) => {
                              const newEdu = [...educations];
                              newEdu[idx] = { ...newEdu[idx], institution: e.target.value };
                              setEditableResume({ ...editableResume, education: newEdu });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-muted-foreground">Graduation Year</label>
                          <input
                            type="text"
                            value={school.year || ""}
                            onChange={(e) => {
                              const newEdu = [...educations];
                              newEdu[idx] = { ...newEdu[idx], year: e.target.value };
                              setEditableResume({ ...editableResume, education: newEdu });
                            }}
                            className="w-full h-8 px-2.5 rounded-md border border-border/60 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Premium A4 Live Preview (6 Columns) */}
          <div className="lg:col-span-6 sticky top-6 max-h-[80vh] overflow-y-auto p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-start bg-neutral-900/40">
            <div className="w-full bg-white text-slate-800 p-8 shadow-2xl max-w-[800px] w-full mx-auto aspect-[1/1.414] overflow-hidden text-[10px] flex flex-col gap-4 font-sans select-none border border-slate-200">
              {/* Header section in A4 */}
              <div className="text-center space-y-1 border-b-2 border-slate-800 pb-3 shrink-0">
                {p.fullName && (
                  <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900 leading-tight">
                    {p.fullName}
                  </h1>
                )}
                {(p.title || p.jobTitle) && (
                  <p className="text-slate-600 font-bold uppercase text-[9px] tracking-widest leading-none">
                    {p.title || p.jobTitle}
                  </p>
                )}
                <div className="text-slate-500 flex flex-wrap items-center justify-center gap-1.5 text-[8px] mt-1 font-semibold">
                  {p.location && <span>{p.location}</span>}
                  {p.email && (
                    <>
                      <span>|</span>
                      <span>{p.email}</span>
                    </>
                  )}
                  {p.phone && (
                    <>
                      <span>|</span>
                      <span>{p.phone}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-[8px] font-bold text-blue-700 mt-1">
                  {p.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                      LinkedIn
                    </a>
                  )}
                  {p.github && (
                    <>
                      {p.linkedin && <span>|</span>}
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                        GitHub
                      </a>
                    </>
                  )}
                  {p.portfolio && (
                    <>
                      {(p.linkedin || p.github) && <span>|</span>}
                      <a href={p.portfolio} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                        Portfolio
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Summary / Objective in A4 */}
              {p.summary && (
                <div className="space-y-1">
                  <h3 className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-300 pb-0.5">
                    Objective
                  </h3>
                  <p className="text-[8.5px] leading-relaxed text-slate-600 text-justify">
                    {p.summary}
                  </p>
                </div>
              )}

              {/* Skills in A4 */}
              {((s.technical && s.technical.length > 0) || (s.soft && s.soft.length > 0)) && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-300 pb-0.5">
                    Skills
                  </h3>
                  <div className="space-y-0.5 text-[8.5px]">
                    {s.technical && s.technical.length > 0 && (
                      <p className="leading-relaxed">
                        <strong className="text-slate-800">Technical Skills: </strong>
                        <span className="text-slate-600">{s.technical.join(", ")}</span>
                      </p>
                    )}
                    {s.soft && s.soft.length > 0 && (
                      <p className="leading-relaxed">
                        <strong className="text-slate-800">Soft Skills: </strong>
                        <span className="text-slate-600">{s.soft.join(", ")}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Experience in A4 */}
              {experiences.length > 0 && (
                <div className="space-y-1.5 flex-1 min-h-0">
                  <h3 className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-300 pb-0.5">
                    Professional Experience
                  </h3>
                  <div className="space-y-3 overflow-hidden">
                    {experiences.map((job: any, i: number) => (
                      <div key={i} className="space-y-0.5 text-[8.5px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">
                            {job.title} {job.company ? `— ${job.company}` : ""}
                          </span>
                          {job.duration && (
                            <span className="text-slate-500 italic text-[7.5px]">
                              {job.duration}
                            </span>
                          )}
                        </div>
                        <ul className="list-disc pl-3 text-slate-600 space-y-0.5">
                          {job.bulletPoints?.map((bullet: string, bIdx: number) => {
                            if (!bullet.trim()) return null;
                            return (
                              <li key={bIdx} className="leading-relaxed text-justify">
                                {bullet}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects in A4 */}
              {projects.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-300 pb-0.5">
                    Projects
                  </h3>
                  <div className="space-y-2.5">
                    {projects.map((proj: any, i: number) => (
                      <div key={i} className="space-y-0.5 text-[8.5px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{proj.name}</span>
                          <div className="flex items-center gap-1.5 text-[7.5px] font-bold text-blue-700">
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="underline">
                                Live Link
                              </a>
                            )}
                            {proj.githubUrl && (
                              <>
                                {proj.liveUrl && <span>|</span>}
                                <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="underline">
                                  GitHub
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                        {proj.description && (
                          <p className="text-slate-600 leading-relaxed text-justify">
                            {proj.description}
                          </p>
                        )}
                        {proj.technologies && proj.technologies.length > 0 && (
                          <p className="text-[7.5px] text-slate-500">
                            <strong className="text-slate-700">Technologies:</strong>{" "}
                            {proj.technologies.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education in A4 */}
              {educations.length > 0 && (
                <div className="space-y-1.5 shrink-0 mt-auto pt-2 border-t border-slate-200">
                  <h3 className="font-bold text-[9px] uppercase tracking-wide text-slate-800 pb-0.5">
                    Education
                  </h3>
                  <div className="space-y-1.5">
                    {educations.map((school: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-[8px] text-slate-600">
                        <span>
                          <strong className="text-slate-800">{school.degree}</strong>{" "}
                          {school.institution ? `— ${school.institution}` : ""}
                        </span>
                        {school.year && <span className="italic">{school.year}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          ATS Resume Analyzer
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            AI Coach
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Optimize your resume for applicant tracking systems (ATS). Upload your
          PDF to instantly scan for score, keywords, and AI improvements.
        </p>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload and Setup (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <MagicCard
            mode="gradient"
            gradientColor="rgba(124, 58, 237, 0.05)"
            className="w-full p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl"
          >
            <div className="p-6 md:p-8 flex flex-col gap-6">
              {/* Drag and drop Area */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-primary" />
                  Upload your Resume (PDF format)
                </label>
                {file ? (
                  <div className="relative border border-primary/30 rounded-2xl p-6 flex items-center justify-between gap-4 bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-foreground max-w-[200px] sm:max-w-[320px] truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer border-none bg-transparent"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-border/60 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all bg-background/30 group">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="p-4 rounded-full bg-muted/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-foreground">
                        Choose file or drag here
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Support only PDF, max 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Prompt Instructions */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Custom Job Description or Instructions (Optional)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste the job description you are targeting, or specific keywords/areas you want the AI to analyze..."
                  className="w-full h-28 p-4 rounded-xl border border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50 resize-none transition-all text-sm outline-none shadow-inner"
                />
              </div>

              {/* Generate Improved Resume Toggle Option */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Structure Rewrite & PDF Generation
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Get an improved ATS-friendly version of your resume content.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={improveResume}
                  onChange={(e) => setImproveResume(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </div>

              {/* Action Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-bold group relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2 text-lg">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing Resume...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-lg cursor-pointer">
                    <TrendingUp className="w-5 h-5" />
                    Analyze Resume
                  </span>
                )}
              </Button>
            </div>
          </MagicCard>
        </div>

        {/* Right Column: Mini Info Dashboard (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl flex flex-col gap-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              ATS Statistics
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-border/60 bg-background/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs text-muted-foreground">
                    Target Score
                  </span>
                  <p className="text-sm font-bold text-foreground">
                    80+ points
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-border/60 bg-background/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs text-muted-foreground">
                    Analysis Model
                  </span>
                  <p className="text-sm font-bold text-foreground">
                    Llama-3 70B (Groq)
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History section */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Recent Scans
          </h3>
        </div>

        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground text-center">
              Loading recent scans...
            </p>
          </div>
        ) : recentScans.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              No recent resume scans found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentScans.map((item: IGetRecentResumeAnalyzerResponse) => {
              const analyzer = item.resumeAnalyzers?.[0];
              if (!analyzer) return null;

              const isCompleted =
                analyzer.status === GenerationStatus.COMPLETED;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl p-5 border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">
                          {analyzer.summary || "Resume Scan"}
                        </p>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(analyzer.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {isCompleted && (
                        <div
                          className={`px-2.5 py-1 rounded-full border text-xs font-bold ${getScoreColor(analyzer.atsScore)}`}
                        >
                          {analyzer.atsScore} ATS
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded bg-muted/40 text-[9px] font-bold text-muted-foreground">
                        Strengths: {analyzer.strengths?.length || 0}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted/40 text-[9px] font-bold text-muted-foreground">
                        Weaknesses: {analyzer.weaknesses?.length || 0}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted/40 text-[9px] font-bold text-muted-foreground">
                        Missing Keywords:{" "}
                        {analyzer.missingKeywords?.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/20 mt-auto">
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            setSelectedScan({
                              analyzerId: analyzer.id,
                              atsScore: analyzer.atsScore,
                              summary: analyzer.summary,
                              strengths: analyzer.strengths,
                              weaknesses: analyzer.weaknesses,
                              missingKeywords: analyzer.missingKeywords,
                              actionableSuggestions: analyzer.actionableSuggestions,
                              updatedResume: analyzer.updatedResumeJson,
                              createdAt: analyzer.createdAt,
                              generatedPdfUrl: analyzer.generatedPdfUrl,
                            })
                          }
                          size="sm"
                          variant="secondary"
                          className="rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border-none gap-1 font-semibold text-xs h-8 cursor-pointer"
                        >
                          View Analysis <ArrowRight className="w-3 h-3" />
                        </Button>
                        {analyzer.generatedPdfUrl && (
                          <a
                            href={analyzer.generatedPdfUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-lg hover:bg-muted/50 p-1.5 h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 animate-pulse" />
                        <span className="text-xs">Analyzing resume...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Modal for detailed analysis */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-2xl space-y-6 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border/40 pb-4 shrink-0">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">Resume Analysis Report</h3>
                <p className="text-xs text-muted-foreground">
                  Scanned on{" "}
                  {new Date(
                    selectedScan.createdAt || Date.now()
                  ).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedScan(null)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="space-y-6 overflow-y-auto pr-1">
              {/* ATS Score & Summary */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl border border-border/40 bg-muted/20">
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center font-extrabold text-2xl ${getScoreColor(selectedScan.atsScore)}`}>
                    {selectedScan.atsScore}
                    <span className="text-[10px] font-bold text-muted-foreground">ATS SCORE</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Professional Summary
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {selectedScan.summary || "No summary available."}
                  </p>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <h4 className="font-bold text-emerald-500 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Key Strengths ({selectedScan.strengths?.length || 0})
                  </h4>
                  <ul className="space-y-2">
                    {selectedScan.strengths?.map((item, index) => (
                      <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!selectedScan.strengths || selectedScan.strengths.length === 0) && (
                      <li className="text-xs text-muted-foreground">No strengths identified.</li>
                    )}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
                  <h4 className="font-bold text-rose-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Areas for Improvement ({selectedScan.weaknesses?.length || 0})
                  </h4>
                  <ul className="space-y-2">
                    {selectedScan.weaknesses?.map((item, index) => (
                      <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!selectedScan.weaknesses || selectedScan.weaknesses.length === 0) && (
                      <li className="text-xs text-muted-foreground">No weaknesses identified.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="p-5 rounded-2xl border border-border/40 bg-card space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Missing Industry Keywords ({selectedScan.missingKeywords?.length || 0})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedScan.missingKeywords?.map((item, index) => (
                    <span key={index} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground/80 border border-border/40">
                      {item}
                    </span>
                  ))}
                  {(!selectedScan.missingKeywords || selectedScan.missingKeywords.length === 0) && (
                    <span className="text-xs text-muted-foreground">No missing keywords found.</span>
                  )}
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="p-5 rounded-2xl border border-border/40 bg-card space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Actionable Recommendations
                </h4>
                <ul className="space-y-2.5">
                  {selectedScan.actionableSuggestions?.map((item, index) => (
                    <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                  {(!selectedScan.actionableSuggestions || selectedScan.actionableSuggestions.length === 0) && (
                    <li className="text-xs text-muted-foreground">No recommendations found.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border/40 pt-4 flex justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {selectedScan.updatedResume && (
                  <Button
                    onClick={() => {
                      setEditableResume(selectedScan.updatedResume);
                      setActiveAnalyzerId(selectedScan.analyzerId);
                      setEditorPdfUrl(selectedScan.generatedPdfUrl || null);
                      setSelectedScan(null);
                    }}
                    size="sm"
                    className="rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2 h-10"
                  >
                    <Sparkles className="w-4 h-4" /> Customize & Edit Resume
                  </Button>
                )}
                {selectedScan.generatedPdfUrl && (
                  <a href={selectedScan.generatedPdfUrl} download target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="rounded-xl font-bold flex items-center gap-2 h-10">
                      <Download className="w-4 h-4" /> Download PDF
                    </Button>
                  </a>
                )}
              </div>
              <Button onClick={() => setSelectedScan(null)} variant="secondary" className="rounded-xl border border-border h-10 font-bold">
                Close Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerComponent;
