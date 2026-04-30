import { useState, useRef } from "react";

// ===== CANDIDATE DATA =====
var MD = {
  name: "Joseph Iyanuoluwa Eyinade",
  location: "Vancouver, BC",
  email: "josephiyanu@gmail.com",
  phone: "+1 (236) 660-8515",
  linkedin: "linkedin.com/in/josephiyanu",
  github: "github.com/Zeus1me",
  certifications: [
    { id: "ai_practice", name: "AI in Professional Practice", issuer: "Northeastern University", date: "Jun 2025" },
    { id: "fin_accounting", name: "Financial Accounting", issuer: "University Canada West", date: "Jun 2024" },
    { id: "semrush_seo", name: "Semrush SEO Toolkit Exam", issuer: "Semrush", date: "Aug 2022" },
    { id: "linkedin_writing", name: "Writing Articles", issuer: "LinkedIn", date: "May 2022" }
  ],
  education: [
    { degree: "Master of Science in Data Analytics", school: "Northeastern University, Vancouver, BC", dates: "Sep 2024 – Jun 2026", gpa: "3.8 / 4.0", coursework: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Predictive Analytics", "Data Mining", "Cloud Computing", "AI Ethics", "Cybersecurity", "Analytics Leadership", "Optimization", "Business Intelligence", "Computer Vision", "Statistical Modeling"] },
    { degree: "Bachelor of Engineering, Electrical & Electronic Engineering", school: "Obafemi Awolowo University, Nigeria", dates: "2015 – 2020", gpa: null, coursework: null }
  ],
  experience: [
    { id: "freelance", title: "Freelance Data Analyst", company: "Remote", dates: "2019 – Present",
      bullets: [
        { id: "churn", text: "Engineered churn prediction models using Random Forest, Logistic Regression, and GLMs in Python (scikit-learn), reducing client risk exposure by 12% and informing retention strategies across 3 retail accounts." },
        { id: "dashboards", text: "Developed 8+ automated Power BI and Tableau dashboards for revenue forecasting and KPI tracking, improving retail planning accuracy and eliminating 25% of manual reporting effort (~10 hours/week)." },
        { id: "sql", text: "Optimized SQL-based ETL pipelines for data extraction, transformation, and analysis across datasets of 500K+ records, accelerating reporting turnaround by 40% and enabling real-time stakeholder access." },
        { id: "vba", text: "Automated Excel reporting workflows with VBA macros across 5 client accounts, reducing manual data entry effort by 25% and improving data integrity for monthly financial reports." },
        { id: "timeseries", text: "Built R-based time-series forecasting models (ARIMA, seasonal decomposition) for demand prediction, improving financial forecasting accuracy by 18% for retail clients." },
        { id: "presentations", text: "Delivered 15+ analytical presentations and executive summaries translating complex statistical findings into actionable business recommendations for non-technical stakeholders." }
      ]
    },
    { id: "jkl", title: "Data Analyst", company: "Jonathan Kings Limited, Nigeria", dates: "Jan 2021 – Dec 2023",
      bullets: [
        { id: "jkl_dashboards", text: "Designed and maintained 10+ Power BI and Tableau dashboards tracking sales revenue, inventory turnover, and supply chain KPIs, enabling data-driven procurement decisions that reduced stockout incidents by 20%." },
        { id: "jkl_reporting", text: "Built automated Excel and Google Sheets reporting systems for financial performance (P&L, budgets, cash flow), reducing month-end reporting time from 5 days to 2 days and improving accuracy." },
        { id: "jkl_python", text: "Developed Python (pandas, matplotlib) scripts to analyze 50K+ transaction records across retail and logistics operations, identifying $30K+ in cost-saving opportunities through procurement pattern analysis." },
        { id: "jkl_crm", text: "Analyzed customer purchase data and segmentation patterns to inform marketing campaigns, contributing to a 15% increase in repeat customer retention across 3 product lines." },
        { id: "jkl_supply", text: "Tracked and visualized end-to-end supply chain metrics (shipping times, vendor performance, freight costs) for international trade operations, improving vendor evaluation accuracy and reducing delivery delays by 18%." },
        { id: "jkl_stakeholder", text: "Presented weekly analytics reports and quarterly business reviews directly to the company director, translating complex data insights into strategic recommendations for inventory planning and market expansion." }
      ]
    },
    { id: "writer", title: "Freelance Technical Writer", company: "Upwork — Remote", dates: "2022 – Present",
      bullets: [
        { id: "wr_castlore", text: "Authored 5 strategy articles connecting classic card game mechanics to board game design for client Michael Long (Castlore), delivering SEO-optimized content on deadline." },
        { id: "wr_saas", text: "Produced 30+ technical and business content pieces across AI, data analytics, SaaS process optimization, blockchain/NFT, and nonprofit fundraising verticals." },
        { id: "wr_research", text: "Researched and synthesized complex technical topics into clear, audience-appropriate copy for blogs, case studies, lead magnets, YouTube scripts, and website content." }
      ]
    },
    { id: "huawei", title: "Field Engineering Intern", company: "Huawei Technologies, Nigeria", dates: "May 2019 – Aug 2019",
      bullets: [
        { id: "diagnostics", text: "Implemented data-driven diagnostic workflows across 12+ network subsystems, reducing system failures by 15% through root-cause analysis and preventive maintenance scheduling." },
        { id: "reports", text: "Produced weekly technical performance reports for senior leadership (audience of 20+), translating complex network metrics into actionable operational recommendations that improved uptime KPIs." }
      ]
    },
    { id: "airtel", title: "Telecom Engineering Intern", company: "Airtel Nigeria", dates: "Jul 2019 – Dec 2019",
      bullets: [
        { id: "kpi", text: "Tracked 10+ network KPIs and maintained incident logs for NOC/field teams across 3 regions, contributing to root-cause chronologies that reduced mean resolution time." },
        { id: "briefs", text: "Delivered concise daily status briefs to non-technical stakeholders, streamlining cross-team decision cycles and improving operational transparency." }
      ]
    }
  ],
  projects: [
    { id: "lidar", title: "LiDAR Point Cloud Smart Stitching — Capstone with Lumotive Inc.", dates: "Jan 2026 – Present", text: "Developing rain-scatter filtering algorithms for MD42 LiDAR sensor data across three echo return streams using Python and ROS2, improving 3D point cloud accuracy for autonomous systems." },
    { id: "jobforge", title: "JobForge — AI-Powered Job Search Application", dates: "Apr 2026", text: "Built a full-featured React job search app with AI-powered job matching, skill gap analysis, Kanban tracker, cover letter generation, and a three-tier search system." },
    { id: "resumefit", title: "ResumeFit — AI Resume Tailoring Web App", dates: "Apr 2026", text: "Built and deployed a Vite+React web app on Vercel with serverless Claude API integration that tailors resumes, generates cover letters, and answers application questions.", url: "lazyzeus2.vercel.app" },
    { id: "fruitnet", title: "FruitNet — Object Detection Microservice", dates: "Mar 2026", text: "Built and deployed a Faster R-CNN fruit detection API (FastAPI + Docker) on Hugging Face Spaces; fine-tuned on 4,485 images across 11 fruit classes.", url: "zeus1m-fruit-detector-api.hf.space" },
    { id: "intelcv", title: "Intel Image Classification — ResNet-18 Transfer Learning", dates: "Mar 2026", text: "Applied transfer learning with ResNet-18 on Intel Image Classification dataset (6 classes). Regularized model achieved macro F1 0.9353 using PyTorch." },
    { id: "textclass", title: "Text Classification — ULMFiT & NLP Pipeline", dates: "Mar 2026", text: "Fine-tuned AWD-LSTM via ULMFiT (fastai) on 10,000 AG News samples. Compared to TF-IDF + LinearSVC baseline using accuracy and macro-F1." },
    { id: "bikesharing", title: "Bike Sharing Demand Analysis — End-to-End ML Pipeline", dates: "Feb 2026", text: "Applied K-Means, PCA, Random Forest (R-squared > 0.91), Q-Learning, and neural networks on UCI Bike Sharing Dataset; delivered 13-slide executive presentation." },
    { id: "heartdisease", title: "Heart Disease Prediction — Multi-Model Comparison", dates: "Feb 2026", text: "Evaluated 9 supervised learning algorithms and 5 neural network architectures on UCI Heart Disease dataset. Focused on classification and model interpretability." },
    { id: "creditrisk", title: "Customer Churn & Credit Risk Modelling", dates: "2024 – 2025", text: "Built classification and regression models (Logistic Regression, XGBoost, GLMs) on German Credit and retail datasets; applied SHAP for model interpretability." },
    { id: "nashville", title: "Nashville Housing Price Prediction", dates: "Jan 2026", text: "Built and compared Linear Regression, Decision Tree, Random Forest, and Gradient Boosting models achieving R-squared=0.9481 with gradient boosting." },
    { id: "streamlit", title: "Amazon Movie Review Analytics Dashboard", dates: "Dec 2025", text: "Developed and deployed an interactive Streamlit dashboard analyzing Amazon movie review trends with dynamic filters and time-series analytics (~500K rows)." },
    { id: "steeves", title: "Resource Allocation Analytics — Steeves & Associates", dates: "Sep – Nov 2025", text: "Conducted exploratory analysis of FY2019-FY2025 resource-hour data for IT consulting sponsor. Used R and ggplot2 for allocation trends." },
    { id: "bicycleaccidents", title: "Bicycle Accidents EDA Dashboard", dates: "Feb 2026", text: "Developed an interactive Python/Plotly dashboard analyzing 847K+ bicycle accident records with geospatial visualization and severity analysis." },
    { id: "awsglue", title: "AWS Glue PySpark Data Pipeline", dates: "Dec 2025", text: "Developed an AWS Glue PySpark assignment processing online retail dataset on S3, implementing ETL transformations and big data pipeline architecture." },
    { id: "cymax", title: "Demand Forecasting Framework — Cymax Group Technologies", dates: "2025", text: "Designed analytics solution for Vancouver-based eCommerce logistics company proposing integrated demand forecasting." },
    { id: "nigeriaelection", title: "Nigerian Presidential Election Dashboard", dates: "Mar 2026", text: "Built interactive HTML dashboard comparing presidential election results across geopolitical zones using Chart.js." }
  ],
  skills: {
    languages: "Python, R, SQL, JavaScript, VBA, HTML/CSS",
    ml: "Scikit-learn, PyTorch, TensorFlow/Keras, fastai, Pandas, NumPy, SciPy, Statsmodels, PySpark, XGBoost, SHAP, SMOTE, torchvision",
    viz: "Tableau, Power BI, Matplotlib, Seaborn, Plotly, Streamlit, ggplot2, Chart.js, gt tables",
    tools: "Git, Docker, AWS (S3, Glue, EC2), Google Cloud Vision API, ROS2, Jupyter, PyCharm, RStudio, Excel (Advanced), Hugging Face, FastAPI, Quarto",
    db: "SQL Server, Snowflake, MS Access, MongoDB concepts, Parquet, DynamoDB concepts",
    methods: "Regression, Classification, Clustering, NLP, Time-Series Forecasting, A/B Testing, Deep Learning, Computer Vision, Object Detection, Transfer Learning, Dimensionality Reduction, Reinforcement Learning, Optimization, Text Mining, Web Scraping, RLHF, ETL Pipelines"
  }
};

// ===== SYSTEM PROMPT =====
function makeResumeSys(pages) {
  var pr = pages === 1
    ? "CRITICAL ONE-PAGE MODE: Select ONLY 3 bullets per experience role. Select ONLY 3 projects."
    : "TWO PAGES: Include 4-5 bullets per role, 5-6 projects.";
  return "You are a resume tailoring engine. Candidate data: " + JSON.stringify(MD) + "\n\n" + pr + "\n\nRULES:\n- Overview: 3 sentences, start with job title + '6+ years of experience'\n- Skills: 4 lines with labels matching the posting\n- include_airtel: true only if telecom/KPI relevant\n- include_writer: true only if writing/content relevant\n- certifications: select relevant cert IDs\n- coursework: select 6-8 relevant courses\n- key_highlights: 3 punchy quantified bullets\n- match_score: 0-100, matched_keywords: array\n\nJSON ONLY:\n{\"overview\":\"str\",\"target_title\":\"str\",\"skills\":[{\"label\":\"str\",\"items\":\"str\"}],\"coursework\":[\"str\"],\"key_highlights\":[\"str\"],\"match_score\":0,\"matched_keywords\":[\"str\"],\"include_airtel\":false,\"include_writer\":false,\"certifications\":[\"str\"],\"freelance_bullets\":[\"str\"],\"jkl_bullets\":[\"str\"],\"huawei_bullets\":[\"str\"],\"airtel_bullets\":[\"str\"],\"writer_bullets\":[\"str\"],\"projects\":[\"str\"],\"filename_suffix\":\"str\"}";
}

var COVER_SYS = "You are a cover letter engine. Write a Problem-Solution format cover letter. JSON ONLY: {\"salutation\":\"str\",\"body\":\"str\",\"closing\":\"str\",\"company_name\":\"str\"}";

// ===== COLORS =====
var C = {
  bg: "#0a0e14", surface: "#111827", border: "#1e293b",
  accent: "#3b82f6", accentD: "#1d4ed8",
  text: "#e5e7eb", textM: "#9ca3af", textD: "#6b7280",
  success: "#10b981", error: "#ef4444"
};

// ===== COMPONENT =====
export default function App() {
  var rRef = useRef(null);
  var cRef = useRef(null);
  var qaRef = useRef(null);

  var s = useState; // shorthand
  var _mode = s("text"), mode = _mode[0], setMode = _mode[1];
  var _posting = s(""), posting = _posting[0], setPosting = _posting[1];
  var _url = s(""), url = _url[0], setUrl = _url[1];
  var _instr = s(""), instr = _instr[0], setInstr = _instr[1];
  var _pages = s(1), pages = _pages[0], setPages = _pages[1];
  var _genType = s("resume"), genType = _genType[0], setGenType = _genType[1];
  var _status = s("idle"), status = _status[0], setStatus = _status[1];
  var _prog = s(""), prog = _prog[0], setProg = _prog[1];
  var _err = s(""), err = _err[0], setErr = _err[1];
  var _res = s(null), res = _res[0], setRes = _res[1];
  var _cov = s(null), cov = _cov[0], setCov = _cov[1];
  var _tab = s("resume"), tab = _tab[0], setTab = _tab[1];
  var _copied = s(false), copied = _copied[0], setCopied = _copied[1];
  var _covLoading = s(false), covLoading = _covLoading[0], setCovLoading = _covLoading[1];
  var _refineText = s(""), refineText = _refineText[0], setRefineText = _refineText[1];
  var _refining = s(false), refining = _refining[0], setRefining = _refining[1];

  function reset() {
    setStatus("idle"); setRes(null); setCov(null); setPosting(""); setUrl("");
    setErr(""); setProg(""); setInstr(""); setTab("resume"); setCopied(false);
    setCovLoading(false); setGenType("resume"); setRefineText(""); setRefining(false);
  }

  function getExp(id) {
    for (var i = 0; i < MD.experience.length; i++) {
      if (MD.experience[i].id === id) return MD.experience[i];
    }
    return null;
  }

  function getBul(expId, ids) {
    var exp = getExp(expId);
    if (!exp) return [];
    var result = [];
    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < exp.bullets.length; j++) {
        if (exp.bullets[j].id === ids[i]) result.push(exp.bullets[j]);
      }
    }
    return result.length > 0 ? result : exp.bullets.slice(0, 3);
  }

  function getProj(id) {
    for (var i = 0; i < MD.projects.length; i++) {
      if (MD.projects[i].id === id) return MD.projects[i];
    }
    return null;
  }

  async function apiCall(system, msg, maxTok) {
    var r = await fetch("/api/tailor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTok || 1500, system: system, messages: [{ role: "user", content: msg }] })
    });
    var d = await r.json();
    if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
    var text = "";
    if (d.content) {
      for (var i = 0; i < d.content.length; i++) {
        if (d.content[i].text) text += d.content[i].text;
      }
    }
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  }

  async function handleGo() {
    setErr(""); setStatus("loading"); setProg("Preparing...");
    try {
      var postText = posting;
      if (mode === "url" && url) {
        setProg("Fetching job posting...");
        var sr = await fetch("/api/scrape", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url }) });
        var sd = await sr.json();
        if (sd.error) throw new Error(sd.error);
        postText = sd.text;
        setPosting(postText);
      }
      if (!postText || postText.length < 30) throw new Error("Please paste a job posting (at least 30 characters).");

      setProg("Tailoring resume...");
      var extra = instr.trim() ? "\nADDITIONAL INSTRUCTIONS: " + instr.trim() : "";
      var raw = await apiCall(makeResumeSys(pages), "Job posting:\n" + postText + extra, pages === 2 ? 2000 : 1500);
      var p;
      try { p = JSON.parse(raw); } catch (e2) { throw new Error("Resume parse failed. Try again."); }
      setRes(p);

      var cp = null;
      if (genType === "both") {
        setProg("Writing cover letter...");
        var cRaw = await apiCall(COVER_SYS, "Job posting:\n" + postText + extra + "\n\nResume overview: " + p.overview + "\nTarget role: " + p.target_title, 1500);
        try { cp = JSON.parse(cRaw); } catch (e3) { throw new Error("Cover letter parse failed."); }
        setCov(cp);
      }
      setStatus("done"); setProg("");
    } catch (e) { setErr(e.message); setStatus("idle"); setProg(""); }
  }

  function doDownload(ref, filename) {
    if (!ref.current) return;
    var w = window.open("", "_blank");
    w.document.write("<!DOCTYPE html><html><head><title>" + filename + "</title><link href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap' rel='stylesheet'><style>*{box-sizing:border-box;margin:0;padding:0}html,body{background:#fff}body{font-family:'DM Sans',sans-serif;padding:40px 52px;color:#1a1a1a;line-height:1.5;max-width:800px;margin:0 auto}a{color:#1E3A5F;text-decoration:underline}@media print{body{padding:0}@page{margin:0.5in}}</style></head><body>" + ref.current.innerHTML + "</body></html>");
    w.document.close();
    setTimeout(function() { w.print(); }, 600);
  }

  function doCopy(ref) {
    if (!ref.current) return;
    navigator.clipboard.writeText(ref.current.innerText);
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 2000);
  }

  // ===== RENDER =====
  var inputStyle = { width: "100%", background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", color: C.text, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif" }}>

      <div style={{ borderBottom: "1px solid " + C.border, padding: "14px 20px", background: C.surface }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>Rf</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>ResumeFit</div>
              <div style={{ fontSize: 10, color: C.textD }}>AI RESUME TAILORING</div>
            </div>
          </div>
          {status === "done" && <button onClick={reset} style={{ padding: "7px 16px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "none", background: C.accent, color: "#fff" }}>+ New</button>}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>

        {status !== "done" && (
          <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid " + C.border }}>
              <button onClick={function() { setMode("text"); }} style={{ flex: 1, padding: "12px 0", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: mode === "text" ? "rgba(59,130,246,0.08)" : "transparent", color: mode === "text" ? C.accent : C.textD, borderBottom: mode === "text" ? "2px solid " + C.accent : "2px solid transparent" }}>Paste Text</button>
              <button onClick={function() { setMode("url"); }} style={{ flex: 1, padding: "12px 0", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: mode === "url" ? "rgba(59,130,246,0.08)" : "transparent", color: mode === "url" ? C.accent : C.textD, borderBottom: mode === "url" ? "2px solid " + C.accent : "2px solid transparent" }}>From URL</button>
            </div>
            <div style={{ padding: 20 }}>
              {mode === "text" ? (
                <textarea value={posting} onChange={function(e) { setPosting(e.target.value); }} placeholder="Paste the full job posting here..." style={Object.assign({}, inputStyle, { minHeight: 150, resize: "vertical" })} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.textD }}>🔗</span>
                  <input value={url} onChange={function(e) { setUrl(e.target.value); }} placeholder="https://example.com/jobs/..." style={inputStyle} />
                </div>
              )}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: C.textM }}>Extra Instructions <span style={{ fontWeight: 400 }}>optional</span></div>
                <textarea value={instr} onChange={function(e) { setInstr(e.target.value); }} placeholder='e.g. "Emphasize Python & cloud", "Highlight Lumotive capstone"' style={Object.assign({}, inputStyle, { minHeight: 60, resize: "vertical" })} />
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                  <span style={{ color: C.textM }}>Pages:</span>
                  <button onClick={function() { setPages(1); }} style={{ padding: "4px 12px", borderRadius: 6, border: pages === 1 ? "1.5px solid " + C.accent : "1px solid " + C.border, background: pages === 1 ? "rgba(59,130,246,0.08)" : "transparent", color: pages === 1 ? C.accent : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>1</button>
                  <button onClick={function() { setPages(2); }} style={{ padding: "4px 12px", borderRadius: 6, border: pages === 2 ? "1.5px solid " + C.accent : "1px solid " + C.border, background: pages === 2 ? "rgba(59,130,246,0.08)" : "transparent", color: pages === 2 ? C.accent : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>2</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                  <span style={{ color: C.textM }}>Generate:</span>
                  <button onClick={function() { setGenType("resume"); }} style={{ padding: "4px 14px", borderRadius: 6, border: genType === "resume" ? "1.5px solid " + C.accent : "1px solid " + C.border, background: genType === "resume" ? "rgba(59,130,246,0.08)" : "transparent", color: genType === "resume" ? C.accent : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Resume Only</button>
                  <button onClick={function() { setGenType("both"); }} style={{ padding: "4px 14px", borderRadius: 6, border: genType === "both" ? "1.5px solid " + C.success : "1px solid " + C.border, background: genType === "both" ? "rgba(16,185,129,0.08)" : "transparent", color: genType === "both" ? C.success : C.textD, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Resume + Cover Letter</button>
                </div>
              </div>
              <div style={{ marginTop: 20, textAlign: "right" }}>
                <button onClick={handleGo} disabled={status === "loading"} style={{ padding: "12px 32px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700, cursor: status === "loading" ? "wait" : "pointer", fontFamily: "inherit", background: "linear-gradient(135deg," + C.accent + "," + C.accentD + ")", color: "#fff" }}>
                  {status === "loading" ? prog : genType === "both" ? "Generate Both" : "Generate Resume"}
                </button>
              </div>
              {err && <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: C.error, fontSize: 12 }}>{err}</div>}
            </div>
          </div>
        )}

        {status === "done" && res && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={function() { setTab("resume"); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: tab === "resume" ? C.accent : C.surface, color: tab === "resume" ? "#fff" : C.textM }}>Resume</button>
              {cov && <button onClick={function() { setTab("cover"); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: tab === "cover" ? C.accent : C.surface, color: tab === "cover" ? "#fff" : C.textM }}>Cover Letter</button>}
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: C.success }}>{"✓ " + res.target_title}</span>
              <button onClick={function() { doCopy(tab === "resume" ? rRef : cRef); }} style={{ padding: "7px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + C.border, background: C.surface, color: C.text }}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={function() {
                var company = (cov ? cov.company_name : res.filename_suffix || "company").replace(/[^a-zA-Z0-9]/g, "_");
                var fname = tab === "resume" ? "Joseph_Eyinade_" + (res.target_title || "").replace(/[^a-zA-Z0-9]/g, "_") + "_" + company : "Cover_Letter_" + company;
                doDownload(tab === "resume" ? rRef : cRef, fname);
              }} style={{ padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "none", background: C.success, color: "#fff" }}>Download PDF</button>
            </div>

            {res.match_score > 0 && (
              <div style={{ marginBottom: 14, padding: "10px 16px", borderRadius: 10, background: C.surface, border: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: res.match_score >= 80 ? C.success : "#f59e0b" }}>{res.match_score}%</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>ATS Match Score</div>
                  <div style={{ fontSize: 11, color: C.textD }}>{(res.matched_keywords || []).join(", ")}</div>
                </div>
              </div>
            )}

            {tab === "resume" && (
              <div ref={rRef} style={{ background: "#fff", borderRadius: 12, padding: "28px 36px", color: "#1a1a1a", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.4, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ textAlign: "center", marginBottom: 2 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1E3A5F", letterSpacing: "0.05em" }}>{MD.name.toUpperCase()}</div>
                </div>
                <div style={{ textAlign: "center", fontSize: 10.5, color: "#777", marginBottom: 1 }}>{MD.location + " | " + MD.email + " | " + MD.phone}</div>
                <div style={{ textAlign: "center", fontSize: 10.5, marginBottom: 1 }}>
                  <a href={"https://www." + MD.linkedin} style={{ color: "#1E3A5F" }}>{MD.linkedin}</a>{" | "}<a href={"https://" + MD.github} style={{ color: "#1E3A5F" }}>{MD.github}</a>
                </div>
                <div style={{ textAlign: "center", fontSize: 9.5, color: "#555", fontStyle: "italic", marginBottom: 8 }}>Authorized to work in Canada (PGWP eligible)</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROFESSIONAL SUMMARY</div>
                <p style={{ fontSize: 10.5, color: "#333", margin: "3px 0 2px", lineHeight: 1.5 }}>{res.overview}</p>
                {res.key_highlights && res.key_highlights.map(function(h, i) { return <div key={i} style={{ fontSize: 10, color: "#333", paddingLeft: 10, lineHeight: 1.4 }}>{"• " + h}</div>; })}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>TECHNICAL SKILLS</div>
                {res.skills && res.skills.map(function(sk, i) { return <div key={i} style={{ fontSize: 10.5, marginBottom: 1 }}><span style={{ fontWeight: 600 }}>{sk.label}: </span><span style={{ color: "#333" }}>{sk.items}</span></div>; })}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>EDUCATION</div>
                {MD.education.map(function(ed, i) {
                  return (
                    <div key={i} style={{ marginBottom: 3 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span style={{ fontWeight: 600 }}>{ed.degree}</span><span style={{ color: "#777" }}>{ed.dates}</span></div>
                      <div style={{ fontSize: 10, color: "#777", fontStyle: "italic", display: "flex", justifyContent: "space-between" }}><span>{ed.school}</span>{ed.gpa && <span>{"GPA: " + ed.gpa}</span>}</div>
                      {i === 0 && res.coursework && <div style={{ fontSize: 9.5, color: "#666", marginTop: 1 }}>{"Relevant Coursework: " + res.coursework.join(", ")}</div>}
                    </div>
                  );
                })}

                {res.certifications && res.certifications.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>CERTIFICATIONS</div>
                    {res.certifications.map(function(cid) {
                      var cert = null;
                      for (var i = 0; i < MD.certifications.length; i++) { if (MD.certifications[i].id === cid) cert = MD.certifications[i]; }
                      if (!cert) return null;
                      return <div key={cid} style={{ fontSize: 10.5, marginBottom: 1 }}><span style={{ fontWeight: 600 }}>{cert.name}</span><span style={{ color: "#777" }}>{" — " + cert.issuer + " (" + cert.date + ")"}</span></div>;
                    })}
                  </div>
                )}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROFESSIONAL EXPERIENCE</div>
                {["freelance", "jkl", "huawei"].map(function(eid) {
                  var exp = getExp(eid);
                  var buls = getBul(eid, res[eid + "_bullets"] || []);
                  if (!exp) return null;
                  return (
                    <div key={eid} style={{ marginBottom: 5 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>
                      {buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}
                    </div>
                  );
                })}
                {res.include_writer && (function() {
                  var exp = getExp("writer");
                  var buls = getBul("writer", res.writer_bullets || []);
                  if (!exp) return null;
                  return (
                    <div style={{ marginBottom: 5 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>
                      {buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}
                    </div>
                  );
                })()}
                {res.include_airtel && (function() {
                  var exp = getExp("airtel");
                  var buls = getBul("airtel", res.airtel_bullets || []);
                  if (!exp) return null;
                  return (
                    <div style={{ marginBottom: 5 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span><span style={{ fontWeight: 600 }}>{exp.title}</span><span style={{ color: "#777" }}>{" | " + exp.company}</span></span><span style={{ color: "#777" }}>{exp.dates}</span></div>
                      {buls.map(function(b, i) { return <div key={i} style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10, lineHeight: 1.45 }}>{"• " + b.text}</div>; })}
                    </div>
                  );
                })()}

                <div style={{ fontSize: 11, fontWeight: 700, color: "#1E3A5F", borderBottom: "1.5px solid #1E3A5F", paddingBottom: 1, marginTop: 7, marginBottom: 3 }}>PROJECTS</div>
                {(res.projects || []).map(function(pid) {
                  var p = getProj(pid);
                  if (!p) return null;
                  return (
                    <div key={pid} style={{ marginBottom: 3 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}>
                        <span><span style={{ fontWeight: 600 }}>{p.title}</span>{p.url && <span>{" | "}<a href={"https://" + p.url} style={{ color: "#1E3A5F", fontSize: 9.5 }}>{p.url}</a></span>}</span>
                        <span style={{ color: "#777", flexShrink: 0, marginLeft: 8 }}>{p.dates}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#333", marginTop: 1, paddingLeft: 10 }}>{"• " + p.text}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "cover" && cov && (
              <div ref={cRef} style={{ background: "#fff", borderRadius: 12, padding: "28px 36px", color: "#1a1a1a", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E3A5F" }}>{MD.name}</div>
                  <div style={{ fontSize: 11.5, color: "#777" }}>{MD.location + " | " + MD.email + " | " + MD.phone}</div>
                  <div style={{ fontSize: 11.5, color: "#777" }}>{MD.linkedin + " | " + MD.github}</div>
                </div>
                <div style={{ fontSize: 12, marginBottom: 14 }}>{cov.salutation}</div>
                <div style={{ fontSize: 12, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{cov.body}</div>
                <div style={{ fontSize: 12, marginTop: 14 }}>{cov.closing}</div>
              </div>
            )}

            {!cov && tab === "resume" && (
              <div style={{ marginTop: 16 }}>
                <button onClick={async function() {
                  setCovLoading(true); setErr("");
                  try {
                    var cRaw = await apiCall(COVER_SYS, "Job posting:\n" + posting + "\n\nResume overview: " + res.overview + "\nTarget: " + res.target_title, 1500);
                    var cp;
                    try { cp = JSON.parse(cRaw); } catch (e2) { throw new Error("Cover letter parse failed."); }
                    setCov(cp);
                  } catch (e) { setErr(e.message); }
                  setCovLoading(false);
                }} disabled={covLoading} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1px solid " + C.success, background: "rgba(16,185,129,0.06)", color: C.success, fontSize: 14, fontWeight: 600, cursor: covLoading ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {covLoading ? "Writing cover letter..." : "Generate Cover Letter"}
                </button>
              </div>
            )}

            {err && <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: C.error, fontSize: 12 }}>{err}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
