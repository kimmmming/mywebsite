import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink,
  Code,
  Smartphone,
  Database,
  Globe,
  Cpu,
  Palette,
  Coffee,
  Zap,
  Brain,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';

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
    name: '全栈博客系统',
    description: '从零构建的个人博客，记录编程学习历程和技术思考',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    metrics: '开发中',
    trend: 'up',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 6,
    name: '文科思维编程',
    description: '用人文思维解读技术概念的教程平台，让编程更有温度',
    tags: ['教育', '内容创作', 'Web'],
    metrics: '构思中',
    trend: 'stable',
    color: 'from-pink-500 to-pink-600'
  }
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

const FloatingIcon = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`absolute text-3xl opacity-20 animate-float ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: '6s'
    }}
  >
    {children}
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center`}>
        <Code className="w-6 h-6 text-white" />
      </div>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          title="前往"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-12">
            <ExternalLink className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </a>
      ) : (
        <ExternalLink className="w-5 h-5 text-gray-300" />
      )}
    </div>
    
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag, index) => (
        <span 
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
    
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold text-gray-900">{project.metrics}</span>
      <div className={`flex items-center ${project.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
        <div className="w-16 h-8 bg-gray-50 rounded flex items-end justify-center gap-1">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={`w-1 bg-current rounded-t ${project.trend === 'up' ? 'animate-pulse' : ''}`}
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
  const weeks = [];
  
  // Group contributions by week
  let currentWeek = [];
  contributions.forEach((contribution, index) => {
    currentWeek.push(contribution);
    if (contribution.date.getDay() === 6 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getIntensity = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 1) return 'bg-green-200';
    if (count <= 2) return 'bg-green-300';
    if (count <= 3) return 'bg-green-400';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">学习活动记录</h3>
        <span className="text-sm text-gray-500">过去一年的编程学习足迹</span>
      </div>
      
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded ${getIntensity(day.count)} hover:ring-2 hover:ring-green-300 transition-all cursor-pointer`}
                title={`${day.date.toLocaleDateString()} - ${day.count > 0 ? '有学习活动' : '休息日'}`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>较少</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-gray-100" />
          <div className="w-3 h-3 rounded bg-green-200" />
          <div className="w-3 h-3 rounded bg-green-300" />
          <div className="w-3 h-3 rounded bg-green-400" />
          <div className="w-3 h-3 rounded bg-green-500" />
        </div>
        <span>较多</span>
      </div>
    </div>
  );
};

// 新增学习理念展示组件
const LearningPhilosophy = () => (
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-16">
    <div className="text-center mb-8">
      <Target className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
      <h2 className="text-3xl font-bold text-gray-900 mb-4">我的学习理念</h2>
      <p className="text-lg text-gray-600">Output倒逼Input - 通过实际项目驱动学习</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <BookOpen className="w-8 h-8 mx-auto text-blue-500 mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">文科思维</h3>
        <p className="text-sm text-gray-600">用人文视角理解技术，将抽象概念具象化</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <Brain className="w-8 h-8 mx-auto text-purple-500 mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">AI驱动</h3>
        <p className="text-sm text-gray-600">拥抱AI工具，将其作为学习和创作的助手</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <Lightbulb className="w-8 h-8 mx-auto text-orange-500 mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">项目导向</h3>
        <p className="text-sm text-gray-600">每个项目都是学习的催化剂，实践出真知</p>
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('感谢订阅！我会定期分享学习心得和项目进展 😊');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Floating Tech Icons - 更新为更贴合的图标 */}
      <FloatingIcon className="top-20 left-10" delay={0}>
        <Code className="text-blue-500" />
      </FloatingIcon>
      <FloatingIcon className="top-32 right-20" delay={1}>
        <Brain className="text-purple-500" />
      </FloatingIcon>
      <FloatingIcon className="top-60 left-1/4" delay={2}>
        <Database className="text-green-500" />
      </FloatingIcon>
      <FloatingIcon className="top-80 right-10" delay={3}>
        <BookOpen className="text-orange-500" />
      </FloatingIcon>
      <FloatingIcon className="top-96 left-3/4" delay={4}>
        <Cpu className="text-red-500" />
      </FloatingIcon>
      <FloatingIcon className="bottom-40 left-16" delay={5}>
        <Lightbulb className="text-pink-500" />
      </FloatingIcon>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <img 
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=blackcat"
                  alt="Profile" 
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <span className="text-2xl">👋</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            嗨，我是 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">金同学Kim</span>
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
          
          <h2 className="text-2xl text-gray-600 mb-6 font-medium">
            文科生 × 自学代码 × AI热衷者 × 全栈探索者
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            从文科背景出发，用不同的视角探索编程世界。相信技术与人文的结合能创造更有温度的产品。
            这里是我的数字实验室，通过实际项目来驱动学习，用 <strong>Output倒逼Input</strong> 的方式成长。
          </p>
          
          <div className="bg-blue-50 rounded-xl p-4 max-w-2xl mx-auto mb-8">
            <p className="text-blue-800 text-base">
              💡 <strong>核心理念：</strong>每一个项目都是学习的催化剂，每一行代码都是思考的结晶。
              不追求完美，但求真实记录这段从文科生到程序员的转变历程。
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <MapPin className="w-5 h-5" />
            <span>中国</span>
            <span className="mx-2">•</span>
            <Coffee className="w-5 h-5" />
            <span>终身学习者</span>
            <span className="mx-2">•</span>
            <Brain className="w-5 h-5" />
            <span>AI时代探索者</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { Icon: Github, color: 'hover:text-gray-900', label: 'GitHub' },
              { Icon: Twitter, color: 'hover:text-blue-500', label: 'Twitter' },
              { Icon: Linkedin, color: 'hover:text-blue-600', label: 'LinkedIn' },
              { Icon: Mail, color: 'hover:text-red-500', label: 'Email' }
            ].map(({ Icon, color, label }, index) => (
              <a
                key={index}
                href="#"
                className={`p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 ${color} hover:-translate-y-1`}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Learning Philosophy Section */}
        <LearningPhilosophy />

        {/* Contribution Calendar */}
        <div className="mb-16">
          <ContributionCalendar />
        </div>

        {/* My Works Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">我的项目实验室</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              这些项目记录了我的学习轨迹，从想法到实现，每一步都在推动我成长。
              有些还在萌芽期，有些正在建设中，但每一个都承载着我对技术的热爱。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white mb-16">
          <Zap className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
          <h3 className="text-3xl font-bold mb-4">一起学习成长</h3>
          <p className="text-xl mb-8 opacity-90">
            订阅我的学习日志，分享编程路上的心得体会、项目进展和思考感悟。
            从文科生视角看技术世界，或许能给你不一样的启发。
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入你的邮箱地址..."
              className="flex-1 px-6 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              订阅
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500">
          <p className="mb-4">
            © 2025 金同学Kim. 用代码记录思考，用项目驱动成长 ☕
          </p>
          <p className="text-sm">
            "学而时习之，不亦说乎。在代码中寻找人文之美，在技术里探索表达的可能。"
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;