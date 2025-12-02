import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  Github, 
  Cpu, 
  Terminal, 
  Layers, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  Smartphone, 
  Rocket, 
  User,
  MessageCircle,
  Copy,
  Check,
  Code,
  Car, // 新增：用于汽车场景
  Users, // 新增：用于校园经历
  Trophy, // 新增：用于奖项
  Target // 新增：用于契合度
} from 'lucide-react';

// --- 功能组件：可复制的联系胶囊 ---
const ContactPill = ({ icon: Icon, label, value, color = "blue" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后恢复
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div 
      onClick={handleCopy}
      className={`relative group flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 active:scale-95
      ${copied 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
        : `bg-white border-slate-200 text-slate-600 hover:border-${color}-300 hover:shadow-md`
      }`}
    >
      <div className={`p-2 rounded-lg ${copied ? 'bg-emerald-100' : `bg-${color}-50 text-${color}-600`}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">{label}</div>
        <div className="font-bold text-sm font-mono">{value}</div>
      </div>
      
      {/* 复制状态图标 */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-slate-500 transition-colors">
        {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
      </div>
      
      {/* 复制提示 Tooltip */}
      <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 transition-opacity ${copied ? 'opacity-100' : 'group-hover:opacity-100'}`}>
        {copied ? '已复制!' : '点击复制'}
      </div>
    </div>
  );
};

// --- 样式组件：背景纹理 ---
const BackgroundPattern = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-100 blur-[120px] opacity-40"></div>
    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[100px] opacity-50"></div>
  </div>
);

// --- 组件：技能胶囊 ---
const SkillPill = ({ icon: Icon, text, color = "blue", highlight = false }) => (
  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-default 
    ${highlight 
      ? `bg-${color}-50 border-${color}-200 text-${color}-700 ring-2 ring-${color}-100 ring-offset-1` 
      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
    }`}>
    <Icon size={12} className={highlight ? `text-${color}-600` : `text-${color}-500`} />
    {text}
  </div>
);

// --- 组件：数据卡片 ---
const StatCard = ({ title, value, subtext, icon: Icon, delay, type = "default" }) => (
  <div className={`
    p-6 rounded-2xl border shadow-sm transition-all duration-500 flex flex-col justify-between h-full animate-fade-in-up group hover:scale-[1.02]
    ${type === 'highlight' 
      ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-500 shadow-blue-200' 
      : 'bg-white/80 backdrop-blur-sm border-white hover:shadow-lg'
    }
  `} style={{ animationDelay: `${delay}ms` }}>
    
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl transition-colors ${type === 'highlight' ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
        <Icon size={22} />
      </div>
      {subtext && (
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md 
          ${type === 'highlight' ? 'bg-white/20 text-blue-50' : 'text-slate-400 bg-slate-100/50'}`}>
          {subtext}
        </span>
      )}
    </div>
    <div>
      <div className={`text-4xl font-extrabold tracking-tight mb-2 ${type === 'highlight' ? 'text-white' : 'text-slate-800'}`}>
        {value}
      </div>
      <div className={`text-sm font-medium ${type === 'highlight' ? 'text-blue-100' : 'text-slate-500'}`}>
        {title}
      </div>
    </div>
  </div>
);

// --- 组件：岗位契合度卡片 (NEW) ---
const FitCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all hover:bg-white hover:border-blue-200">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-1">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- 组件：项目卡片 ---
const ProjectCard = ({ title, tags, description, icon: Icon, highlight }) => (
  <div className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 relative overflow-hidden">
    <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform rotate-12">
      <Icon size={180} />
    </div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3.5 bg-blue-50/80 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
          <Icon size={26} />
        </div>
        {highlight && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
             <Rocket size={12} fill="currentColor" /> {highlight}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
      
      <p className="text-slate-600 text-sm leading-7 mb-6 flex-grow">
        {description}
      </p>
      
      <div className="pt-6 border-t border-slate-50 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className={`text-[11px] font-medium px-2.5 py-1 rounded-md border
            ${tag.includes('Windsurf') || tag.includes('Coze') 
              ? 'bg-blue-50 text-blue-700 border-blue-100 font-bold' 
              : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

function Portfolio() {
  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-blue-100 relative">
      <BackgroundPattern />

      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">W</div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg leading-none">王楠</span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">AI PRODUCT ENGINEER</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-1">
             {['Fit', 'Experience', 'Projects'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                 {item === 'Fit' ? 'Why Me' : item}
               </a>
             ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-24">
        
        {/* Hero Section */}
        <header id="about" className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Heavy AI User & Builder
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Rapid AI Product <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Prototyping.</span>
            </h1>
            
            <div className="text-lg text-slate-600 leading-relaxed max-w-xl">
              <p className="mb-4">
                我是王楠，一名热衷于折腾新技术的 <strong>AI-Native 开发者</strong>。
                <br className="hidden sm:block" />
                擅长利用 <strong>Windsurf</strong>、<strong>Cursor</strong> 等工具链，将 <strong>大模型、Agent、多模态</strong> 的创意迅速转化为
                <span className="font-semibold text-slate-900 border-b-2 border-blue-200 mx-1">完整可用的全栈产品 Demo</span>。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <ContactPill icon={Smartphone} label="Mobile / 电话" value="18287833401" color="blue" />
              <ContactPill icon={MessageCircle} label="WeChat / 微信" value="rhrdkycwrhr" color="emerald" />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
               <a href="#projects" className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 active:scale-95">
                 <Rocket size={18} /> 查看 Demo
               </a>
               <a href="#fit" className="flex items-center gap-2 px-7 py-3.5 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition active:scale-95">
                 <Target size={18} /> 岗位契合度
               </a>
            </div>
          </div>

          <div className="lg:col-span-5 h-full min-h-[400px]">
            <div className="grid grid-cols-2 gap-5 h-full">
              <div className="col-span-2 bg-white/90 backdrop-blur p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-center gap-4 hover:shadow-lg transition-shadow relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Terminal size={100} />
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest relative z-10">
                     <Zap size={12} /> My AI-Native Workflow
                   </div>
                   <div className="flex flex-wrap gap-2.5 relative z-10">
                     <SkillPill icon={Terminal} text="Cursor" color="slate" highlight={true} />
                     <SkillPill icon={Zap} text="Windsurf" color="sky" highlight={true} />
                     <SkillPill icon={MessageCircle} text="Coze (Agent)" color="indigo" />
                     <SkillPill icon={Code} text="Gemini" color="slate" />
                   </div>
                   <p className="text-xs text-slate-400 mt-1 relative z-10">
                     *熟练使用以上工具实现前后端 0-1 快速闭环。
                   </p>
              </div>

              <StatCard title="Prototypes" value="Full-Stack" subtext="Delivery" icon={Layers} delay={100} type="highlight" />
              <StatCard title="Model R² Score" value="0.855" subtext="Tech Depth" icon={Cpu} delay={200} />
            </div>
          </div>
        </header>

        {/* --- 新增板块：岗位契合理由 (Why Me) --- */}
        <section id="fit" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
                <Target className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-slate-900">Why Me? 岗位契合度分析</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FitCard 
                    icon={Cpu}
                    title="多模态技术栈 (LLM + CV)" 
                    desc="兼具计算机视觉(TCGN, PyTorch)与大模型Agent(Coze, Dify)的实践经验，符合 JD 对多模态背景的要求。"
                />
                <FitCard 
                    icon={Car}
                    title="人-车场景理解" 
                    desc="曾参与 FSAC 大学生无人驾驶方程式大赛，对车载环境、车辆工程场景有真实的认知和接触。"
                />
                <FitCard 
                    icon={Smartphone}
                    title="产品全栈落地能力" 
                    desc="不只是写代码，更具备使用 Windsurf 独立完成前后端开发、云部署并交付可用 Demo 的能力。"
                />
                <FitCard 
                    icon={Zap}
                    title="AI 重度玩家" 
                    desc="对 AI 新产品极其敏感，日常重度使用 Gemini, GPT, Cursor 等工具，能够快速上手各类创新技术。"
                />
            </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-12 px-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">实习与科研</h2>
              <p className="text-slate-500">Professional Experience</p>
            </div>
            <div className="hidden sm:block h-px bg-slate-200 w-1/3 mb-2"></div>
          </div>

          <div className="space-y-6">
            <div className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
               <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Code size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">软件开发实习生</h3>
                    <p className="text-slate-500 font-medium">云南省测绘工程院科创中心</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-full">2025.07 - 2025.08</span>
              </div>
              <div className="md:pl-16">
                <p className="text-slate-600 leading-relaxed mb-4">
                  负责《水资源数据融合系统》的核心模块开发。
                  <span className="text-slate-900 font-medium">在团队中实践敏捷开发 (Agile)</span>，
                  具备将复杂业务逻辑转化为前端交互界面的落地能力。
                </p>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded text-xs font-medium text-slate-500">Vue.js</span>
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded text-xs font-medium text-slate-500">Agile</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">CV & LLM 科研实践</h3>
                    <p className="text-slate-500 font-medium">校内实验室 / 课题组</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-full">2023 - Present</span>
              </div>
              <div className="md:pl-16 space-y-3">
                <p className="text-slate-600 leading-relaxed">
                  深入钻研多模态与计算机视觉前沿技术，保持对新技术的敏锐嗅觉。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-1">
                    <div className="flex items-center gap-2 text-sm text-slate-700"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>数据工程 Data Pipeline</div>
                    <div className="flex items-center gap-2 text-sm text-slate-700"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>SOTA 算法复现</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 新增板块：校园与荣誉 (Campus) --- */}
        <section id="campus" className="scroll-mt-24">
            <div className="flex items-end justify-between mb-8 px-2">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">校园与荣誉</h2>
                  <p className="text-slate-500">Campus Leadership & Awards</p>
                </div>
                <div className="hidden sm:block h-px bg-slate-200 w-1/3 mb-2"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {/* 校园经历 1: 方程式大赛 (强调车相关) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Car size={20}/></div>
                        <div>
                            <div className="font-bold text-slate-900">FSAC 无人驾驶方程式</div>
                            <div className="text-xs text-slate-400">全国三等奖 | Team Member</div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600">参与车队无人驾驶系统研发，积累了宝贵的车辆工程与自动驾驶场景认知。</p>
                </div>

                {/* 校园经历 2: 极限编程 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Trophy size={20}/></div>
                        <div>
                            <div className="font-bold text-slate-900">IEEE Xtreme 极限编程</div>
                            <div className="text-xs text-slate-400">全球 Top 7%</div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600">在高强度全球编程竞技中展现了扎实的算法功底和快速解决问题的能力。</p>
                </div>

                {/* 校园经历 3: 蓝信封 (强调组织能力和AI应用) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Users size={20}/></div>
                        <div>
                            <div className="font-bold text-slate-900">“蓝信封” 校园大使</div>
                            <div className="text-xs text-slate-400">公益 | 招募 250+ 志愿者</div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600">利用 Gemini 3 制作宣传网页，成功组织大规模志愿者活动，体现技术赋能公益的价值。</p>
                </div>
            </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-12 px-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">创新 Demo</h2>
              <p className="text-slate-500">Solving Real Problems with AI</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <ProjectCard 
              title="岳麓山 AI 智能伴游 小程序" 
              // 修正点：删除了语音互动，强调了前后端及云开发
              description="[C端产品尝试] 针对游客痛点，利用 Windsurf 独立开发的一站式智能导览工具。实现了前后端及云开发，集成了实时地图与个性化推荐，完成全栈闭环。"
              icon={Smartphone}
              tags={["Windsurf (Full Stack)", "Coze Agent", "Cloud Dev"]}
              highlight="AI Agent Product"
            />
            <ProjectCard 
              title="TCGN 大气精准预测系统" 
              description="[技术落地] 基于时空图卷积网络的 PM2.5 预测系统。不只是算法，更完成了 Web 端部署，实现了从数据到可视化的完整闭环。"
              icon={Layers}
              tags={["PyTorch", "Web Deployment", "Data Viz"]}
              highlight="End-to-End"
            />
            <ProjectCard 
              title="公益活动 AI 提效平台" 
              description="[运营工具] 利用 Gemini 3 快速构建的响应式活动页，解决了公益组织招募难的问题。体现了用 AI 技术解决实际问题的能力。"
              icon={MessageCircle}
              tags={["Gemini 3", "Rapid Dev", "Social Good"]}
              highlight="Efficiency"
            />
          </div>
        </section>

      </main>

      <footer className="bg-slate-50 border-t border-slate-100 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="text-slate-900 font-bold text-lg">王楠<span className="text-blue-600">.Product</span></div>
            <p className="text-slate-500 text-sm mt-1">期待在“人车家”生态中创造价值。</p>
        </div>
      </footer>
    </div>
  );
}

// 挂载 React 应用到 DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);

