import React, { useState, useEffect } from 'react';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Coffee,
  Zap,
  Brain,
  BookOpen,
  Target,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { Navigation } from './components/Navigation';

// Mock data for projects - 更新为AI和全栈相关项目
const projects = [
  {
    id: 1,
    name: '健康食谱生成器',
    description: '基于AI的个性化健康食谱推荐系统，帮助用户制定营养均衡的饮食计划',
    tags: ['React', 'AI', 'Health'],
    metrics: '已完成',
    trend: 'up',
    color: 'from-green-500 to-green-600',
    url: 'https://healthyfood.kimlabs.top'
  },
  {
    id: 2,
    name: '猫咪头像生成器',
    description: '可爱的AI猫咪头像生成工具，为用户创造独特的猫咪形象',
    tags: ['JavaScript', 'AI Art', 'Fun'],
    metrics: '已完成',
    trend: 'up',
    color: 'from-orange-500 to-orange-600',
    url: 'https://imagecat.kimlabs.top'
  },
  {
    id: 3,
    name: '智能密码生成器',
    description: '安全可靠的密码生成工具，支持多种复杂度和自定义规则',
    tags: ['Security', 'Tool', 'Web'],
    metrics: '已完成',
    trend: 'up',
    color: 'from-blue-500 to-blue-600',
    url: 'https://createpassword.kimlabs.top'
  },
  {
    id: 4,
    name: '随机天气查询器',
    description: '有趣的天气查询工具，探索世界各地的实时天气信息',
    tags: ['API', 'Weather', 'Data'],
    metrics: '已完成',
    trend: 'up',
    color: 'from-purple-500 to-purple-600',
    url: 'https://weather.kimlabs.top'
  },
  {
    id: 5,
    name: '吵架战斗机',
    description: '为不会吵架的人提供AI吵架话术和反击idea，助你成为社交场合的嘴强王者',
    tags: ['AI', 'NLP', 'Fun'],
    metrics: '开发中',
    trend: 'up',
    color: 'from-yellow-500 to-yellow-600',
    url: 'https://chaojia.kimlabs.top/'
  },
  // {
  //   id: 6,
  //   name: '全栈博客系统',
  //   description: '从零构建的个人博客，记录编程学习历程和技术思考',
  //   tags: ['Next.js', 'Node.js', 'MongoDB'],
  //   metrics: '开发中',
  //   trend: 'up',
  //   color: 'from-indigo-500 to-indigo-600'
  // },
  // {
  //   id: 7,
  //   name: '文科思维编程',
  //   description: '用人文思维解读技术概念的教程平台，让编程更有温度',
  //   tags: ['教育', '内容创作', 'Web'],
  //   metrics: '构思中',
  //   trend: 'stable',
  //   color: 'from-pink-500 to-pink-600'
  // }
];

// Mock contribution data
const generateContributions = () => {
  const contributions = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 4); // 稍微降低活跃度，更符合学习阶段
    contributions.push({
      date: new Date(d),
      count
    });
  }
  return contributions;
};

const FloatingIcon = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div
    className={`absolute text-3xl opacity-10 dark:opacity-20 animate-float pointer-events-none ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '6s'
    }}
  >
    {children}
  </div>
);

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <div className="group bg-white dark:bg-gray-900/50 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
        <Code className="w-7 h-7 text-white" />
      </div>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link relative"
          title="访问项目"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 via-accent-400 to-pink-400 shadow-md transition-all duration-300 group-hover/link:scale-110 group-hover/link:shadow-glow group-hover/link:rotate-12">
            <ExternalLink className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:rotate-45" />
          </span>
        </a>
      ) : (
        <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-600" />
      )}
    </div>

    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
      {project.name}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
        {project.metrics}
      </span>
      <div className={`flex items-center ${project.trend === 'up' ? 'text-emerald-500' : 'text-primary-500'}`}>
        <div className="w-16 h-8 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg flex items-end justify-center gap-1 p-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-current rounded-t transition-all duration-300 ${project.trend === 'up' ? 'group-hover:animate-pulse' : ''}`}
              style={{ height: `${Math.random() * 100 + 20}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContributionCalendar = () => {
  const contributions = generateContributions();
  const weeks: { date: Date; count: number }[][] = [];
  
  // Group contributions by week
  let currentWeek: { date: Date; count: number }[] = [];
  contributions.forEach((contribution, index) => {
    currentWeek.push(contribution);
    if (contribution.date.getDay() === 6 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-white/[0.05]';
    if (count <= 1) return 'bg-emerald-500/20';
    if (count <= 2) return 'bg-emerald-500/40';
    if (count <= 3) return 'bg-emerald-400/60';
    return 'bg-emerald-300/80';
  };

  return (
    <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">学习活动记录</h3>
        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">过去一年</span>
      </div>

      <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded ${getIntensity(day.count)} hover:ring-2 hover:ring-emerald-400 transition-all cursor-pointer`}
                title={`${day.date.toLocaleDateString()} - ${day.count > 0 ? '有学习活动' : '休息日'}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="uppercase tracking-wider">较少</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="w-3 h-3 rounded bg-emerald-500/20" />
          <div className="w-3 h-3 rounded bg-emerald-500/40" />
          <div className="w-3 h-3 rounded bg-emerald-400/60" />
          <div className="w-3 h-3 rounded bg-emerald-300/80" />
        </div>
        <span className="uppercase tracking-wider">较多</span>
      </div>
    </div>
  );
};

// 新增学习理念展示组件
const LearningPhilosophy = () => (
  <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-3xl p-8 mb-16 border border-primary-100 dark:border-gray-800 backdrop-blur-sm shadow-soft">
    <div className="text-center mb-8">
      <p className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3 font-semibold">Learning Mindset</p>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-lg">
        <Target className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">我的学习理念</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">Output倒逼Input - 通过实际项目驱动学习</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white/80 dark:bg-gray-900/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 mb-4">
          <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">文科思维</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">用人文视角理解技术，将抽象概念具象化</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-900/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 mb-4">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI驱动</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">拥抱AI工具，将其作为学习和创作的助手</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-900/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 mb-4">
          <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">项目导向</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">每个项目都是学习的催化剂，实践出真知</p>
      </div>
    </div>
  </div>
);

function App() {
  const [email, setEmail] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(!isTyping);
    }, 2000);
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感谢订阅！我会定期分享学习心得和项目进展 😊');
    setEmail('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Floating Tech Icons */}
      <FloatingIcon className="top-20 left-10" delay={0}>
        <Code className="text-primary-500 dark:text-primary-400" />
      </FloatingIcon>
      <FloatingIcon className="top-32 right-20" delay={1}>
        <Brain className="text-accent-500 dark:text-accent-400" />
      </FloatingIcon>
      <FloatingIcon className="top-60 left-1/4" delay={2}>
        <Database className="text-emerald-500 dark:text-emerald-400" />
      </FloatingIcon>
      <FloatingIcon className="top-80 right-10" delay={3}>
        <BookOpen className="text-orange-500 dark:text-orange-400" />
      </FloatingIcon>
      <FloatingIcon className="bottom-40 left-16" delay={4}>
        <Lightbulb className="text-pink-500 dark:text-pink-400" />
      </FloatingIcon>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <section id="home" className="text-center mb-24 pt-8 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-500 via-accent-600 to-pink-600 p-1 shadow-glow-lg">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 backdrop-blur-lg flex items-center justify-center">
                <img
                  src="https://i.ibb.co/tpfS5NgM/cats.png"
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-soft-lg border-2 border-white dark:border-gray-700">
              <span className="text-2xl">👋</span>
            </div>
          </div>

          <p className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4 font-semibold">Digital Craft Journal</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            嗨，我是 <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">金同学Kim</span>
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>

          <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
            文科生 × 自学代码 × AI热衷者 × 全栈探索者
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
            从文科背景出发，用不同的视角探索编程世界。相信技术与人文的结合能创造更有温度的产品。
            这里是我的数字实验室，通过实际项目来驱动学习，用 <strong className="text-primary-600 dark:text-primary-400">Output倒逼Input</strong> 的方式成长。
          </p>

          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-primary-100 dark:border-gray-800 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed text-left">
                <strong className="text-primary-600 dark:text-primary-400">核心理念：</strong>每一个项目都是学习的催化剂，每一行代码都是思考的结晶。
                不追求完美，但求真实记录这段从文科生到程序员的转变历程。
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>中国</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5" />
              <span>终身学习者</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span>AI时代探索者</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { Icon: Github, color: 'hover:text-gray-900 dark:hover:text-white', label: 'GitHub' },
              { Icon: Twitter, color: 'hover:text-sky-500', label: 'Twitter' },
              { Icon: Linkedin, color: 'hover:text-blue-600', label: 'LinkedIn' },
              { Icon: Mail, color: 'hover:text-rose-500', label: 'Email' }
            ].map(({ Icon, color, label }, index) => (
              <a
                key={index}
                href="#"
                className={`p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl backdrop-blur-sm shadow-soft transition-all duration-300 text-gray-600 dark:text-gray-400 ${color} hover:-translate-y-1 hover:shadow-soft-lg`}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </section>

        {/* Learning Philosophy Section */}
        <section id="philosophy" className="animate-slide-up">
          <LearningPhilosophy />
        </section>

        {/* Contribution Calendar */}
        <div className="mb-16 animate-slide-up">
          <ContributionCalendar />
        </div>

        {/* My Works Section */}
        <section id="projects" className="mb-16 animate-slide-up">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3 font-semibold">Lab Projects</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">我的项目实验室</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              这些项目记录了我的学习轨迹，从想法到实现，每一步都在推动我成长。
              有些还在萌芽期，有些正在建设中，但每一个都承载着我对技术的热爱。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-12 text-center text-white mb-16 shadow-glow-lg animate-slide-up">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-transparent to-accent-600/20" />
          <div className="relative">
            <p className="text-xs uppercase tracking-wider text-white/80 mb-4 font-semibold">Stay In Sync</p>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">一起学习成长</h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              订阅我的学习日志，分享编程路上的心得体会、项目进展和思考感悟。
              从文科生视角看技术世界，或许能给你不一样的启发。
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="输入你的邮箱地址..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 outline-none transition backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-soft-lg"
              >
                订阅
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            © 2025 金同学Kim. 用代码记录思考，用项目驱动成长 ☕
          </p>
          <p className="text-sm">
            "学而时习之，不亦说乎。在代码中寻找人文之美，在技术里探索表达的可能。"
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
