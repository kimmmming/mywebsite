import React, { useEffect, useMemo, useState } from 'react';
import {
  Brain,
  BookOpen,
  Code,
  Coffee,
  ExternalLink,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Twitter,
  Utensils,
  Zap,
} from 'lucide-react';
import { Navigation } from './components/Navigation';

type Project = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  metrics: string;
  color: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
  bars: number[];
};

const projects: Project[] = [
  {
    id: 1,
    name: '健康食谱生成器',
    description: '基于 AI 的个性化健康食谱推荐系统，帮助用户制定营养均衡的饮食计划。',
    tags: ['React', 'AI', 'Health'],
    metrics: '已上线',
    color: 'from-emerald-500 to-teal-600',
    url: 'https://healthyfood.kimlabs.top',
    Icon: Utensils,
    bars: [34, 52, 46, 68, 74, 86],
  },
  {
    id: 2,
    name: '猫咪头像生成器',
    description: '可爱的 AI 头像生成工具，为用户创造独特、轻松、有记忆点的猫咪形象。',
    tags: ['JavaScript', 'AI Art', 'Fun'],
    metrics: '已上线',
    color: 'from-orange-500 to-rose-500',
    url: 'https://imagecat.kimlabs.top',
    Icon: Sparkles,
    bars: [42, 38, 64, 58, 72, 80],
  },
  {
    id: 3,
    name: '智能密码生成器',
    description: '安全可靠的密码生成工具，支持多种复杂度、自定义规则和快速复制。',
    tags: ['Security', 'Tool', 'Web'],
    metrics: '已上线',
    color: 'from-blue-500 to-cyan-600',
    url: 'https://createpassword.kimlabs.top',
    Icon: ShieldCheck,
    bars: [30, 48, 62, 56, 70, 78],
  },
  {
    id: 4,
    name: '随机天气查询器',
    description: '一个轻巧的天气查询实验，用随机地点探索世界各地的实时天气信息。',
    tags: ['API', 'Weather', 'Data'],
    metrics: '已上线',
    color: 'from-violet-500 to-indigo-600',
    url: 'https://weather.kimlabs.top',
    Icon: Zap,
    bars: [26, 44, 40, 60, 76, 84],
  },
  {
    id: 5,
    name: '吵架战斗机',
    description: '为不会吵架的人提供 AI 话术和反击 idea，练习表达边界与临场反应。',
    tags: ['AI', 'NLP', 'Fun'],
    metrics: '开发中',
    color: 'from-amber-500 to-yellow-500',
    url: 'https://chaojia.kimlabs.top/',
    Icon: Brain,
    bars: [20, 26, 38, 52, 64, 70],
  },
];

const socialLinks = [
  { Icon: Github, color: 'hover:text-gray-950 dark:hover:text-white', label: 'GitHub', href: 'https://github.com/' },
  { Icon: Twitter, color: 'hover:text-sky-500', label: 'Twitter', href: 'https://twitter.com/' },
  { Icon: Linkedin, color: 'hover:text-blue-600', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { Icon: Mail, color: 'hover:text-rose-500', label: 'Email', href: 'mailto:hello@kimlabs.top' },
];

const generateContributions = () => {
  const contributions: { date: Date; count: number }[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const count = seed % 7 === 0 ? 0 : seed % 4;
    contributions.push({
      date: new Date(d),
      count,
    });
  }
  return contributions;
};

const FloatingIcon = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div
    className={`absolute text-3xl opacity-10 dark:opacity-15 animate-float pointer-events-none ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '7s',
    }}
  >
    {children}
  </div>
);

const SectionHeading = ({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">{label}</p>
    <h2 className="mb-4 text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">{title}</h2>
    {children && <p className="text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">{children}</p>}
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const { Icon } = project;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white/85 p-5 shadow-soft backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-soft-lg dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-primary-800">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.color} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-primary-200 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:text-primary-400"
          title="访问项目"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-950 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
        {project.name}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-7 text-gray-600 dark:text-gray-400">{project.description}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{project.metrics}</span>
        <div className="flex h-8 w-16 items-end justify-center gap-1 rounded-lg bg-gray-50 p-1 text-primary-500 dark:bg-gray-800/70">
          {project.bars.map((height, index) => (
            <div key={index} className="w-1 rounded-t bg-current transition group-hover:opacity-80" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </article>
  );
};

const ContributionCalendar = () => {
  const contributions = useMemo(() => generateContributions(), []);
  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];

  contributions.forEach((contribution, index) => {
    currentWeek.push(contribution);
    if (contribution.date.getDay() === 6 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 1) return 'bg-emerald-500/25';
    if (count <= 2) return 'bg-emerald-500/45';
    return 'bg-emerald-500/75';
  };

  return (
    <section className="mb-16 rounded-2xl border border-gray-200 bg-white/85 p-5 shadow-soft backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70 md:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">Activity</p>
          <h3 className="text-xl font-semibold text-gray-950 dark:text-white">学习活动记录</h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">过去一年</span>
      </div>

      <div className="mb-4 flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date.toISOString()}
                className={`h-3 w-3 rounded-sm ${getIntensity(day.count)} transition hover:ring-2 hover:ring-emerald-400`}
                title={`${day.date.toLocaleDateString()} - ${day.count > 0 ? '有学习活动' : '休息日'}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>较少</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-3 rounded-sm bg-emerald-500/25" />
          <div className="h-3 w-3 rounded-sm bg-emerald-500/45" />
          <div className="h-3 w-3 rounded-sm bg-emerald-500/75" />
        </div>
        <span>较多</span>
      </div>
    </section>
  );
};

const LearningPhilosophy = () => {
  const items = [
    {
      Icon: BookOpen,
      title: '文科思维',
      text: '用人文视角理解技术，把抽象概念翻译成可感知、可表达的产品。',
      tone: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300',
    },
    {
      Icon: Brain,
      title: 'AI 驱动',
      text: '把 AI 当作学习伙伴和创作工具，用它加速验证想法，而不是替代思考。',
      tone: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300',
    },
    {
      Icon: Lightbulb,
      title: '项目导向',
      text: '每个项目都是学习的催化剂，在真实问题里补齐知识、形成判断。',
      tone: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
    },
  ];

  return (
    <section id="philosophy" className="mb-16">
      <SectionHeading label="Learning Mindset" title="我的学习理念">
        Output 倒逼 Input，把每一次发布都当成一次学习闭环。
      </SectionHeading>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map(({ Icon, title, text, tone }) => (
          <div key={title} className="rounded-2xl border border-gray-200 bg-white/85 p-6 shadow-soft backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-soft-lg dark:border-gray-800 dark:bg-gray-900/70">
            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-950 dark:text-white">{title}</h3>
            <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

function App() {
  const [email, setEmail] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsTyping((current) => !current);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感谢订阅！我会定期分享学习心得和项目进展。');
    setEmail('');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />

      <FloatingIcon className="left-8 top-24" delay={0}>
        <Code className="text-primary-500 dark:text-primary-400" />
      </FloatingIcon>
      <FloatingIcon className="right-16 top-36" delay={1}>
        <Brain className="text-accent-500 dark:text-accent-400" />
      </FloatingIcon>
      <FloatingIcon className="left-1/4 top-72 hidden sm:block" delay={2}>
        <BookOpen className="text-emerald-500 dark:text-emerald-400" />
      </FloatingIcon>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <section id="home" className="grid min-h-[calc(100vh-6rem)] items-center gap-12 py-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-700 shadow-soft backdrop-blur-sm dark:border-primary-900 dark:bg-gray-900/70 dark:text-primary-300">
              <Sparkles className="h-4 w-4" />
              Digital Craft Journal
            </div>

            <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-tight text-gray-950 dark:text-white sm:text-5xl md:mx-0 lg:text-6xl">
              嗨，我是{' '}
              <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-accent-600 bg-clip-text text-transparent">
                金同学 Kim
              </span>
              {isTyping && <span className="text-primary-600">|</span>}
            </h1>

            <p className="mb-6 text-xl font-medium leading-8 text-gray-600 dark:text-gray-300">
              文科生 × 自学代码 × AI 热衷者 × 全栈探索者
            </p>

            <p className="mx-auto mb-7 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 md:mx-0 md:text-lg">
              从文科背景出发，用不同视角探索编程世界。这里是我的数字实验室，我用真实项目驱动学习，用{' '}
              <strong className="font-semibold text-primary-600 dark:text-primary-400">Output 倒逼 Input</strong> 的方式成长。
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
              >
                查看项目
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/85 px-5 py-3 text-sm font-semibold text-gray-800 shadow-soft transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:text-primary-300"
              >
                联系我
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 md:justify-start">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>中国</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span>终身学习者</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>AI 时代探索者</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 md:justify-start">
              {socialLinks.map(({ Icon, color, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/85 text-gray-600 shadow-soft transition hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-400 ${color}`}
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md md:max-w-lg">
            <div className="relative rounded-[2rem] border border-gray-200 bg-white/75 p-4 shadow-soft-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70">
              <div className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-glow">
                AI + Web
              </div>
              <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary-50 via-white to-accent-50 p-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <img
                  src="/cats.png"
                  alt="金同学 Kim 的头像"
                  className="mx-auto mb-8 h-36 w-36 rounded-full border-4 border-white object-cover shadow-soft-lg dark:border-gray-800"
                />
                <div className="rounded-2xl border border-primary-100 bg-white/85 p-5 text-left shadow-soft dark:border-gray-800 dark:bg-gray-950/80">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    <Target className="h-4 w-4" />
                    核心理念
                  </div>
                  <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                    每个项目都是学习的催化剂，每一行代码都是思考的结晶。不追求完美，但求真实记录这段从文科生到程序员的转变历程。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LearningPhilosophy />
        <ContributionCalendar />

        <section id="projects" className="mb-16">
          <SectionHeading label="Lab Projects" title="我的项目实验室">
            这些项目记录了我的学习轨迹，从想法到实现，每一步都在推动我成长。
          </SectionHeading>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="contact" className="mb-16 overflow-hidden rounded-2xl bg-gray-950 p-6 text-white shadow-glow-lg dark:bg-white dark:text-gray-950 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-300 dark:text-primary-600">Stay In Sync</p>
              <h3 className="mb-4 text-3xl font-bold">一起学习成长</h3>
              <p className="max-w-2xl text-base leading-8 text-white/75 dark:text-gray-600">
                订阅我的学习日志，分享编程路上的心得体会、项目进展和思考感悟。从文科生视角看技术世界，或许能给你不一样的启发。
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入你的邮箱地址"
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-primary-300 focus:ring-2 focus:ring-primary-300/40 dark:border-gray-200 dark:bg-gray-100 dark:text-gray-950 dark:placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800"
              >
                订阅
              </button>
            </form>
          </div>
        </section>

        <footer className="pb-4 text-center text-sm leading-7 text-gray-500 dark:text-gray-400">
          <p className="mb-2">© 2026 金同学 Kim. 用代码记录思考，用项目驱动成长。</p>
          <p>"学而时习之，不亦说乎。在代码中寻找人文之美，在技术里探索表达的可能。"</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
