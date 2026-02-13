import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Layers,
  Send,
  Loader2,
  Info,
  Monitor,
  ShieldCheck,
  TrendingUp,
  Cpu,
  CheckCircle,
  Plus,
  Maximize2,
  Target,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Award,
  Zap,
  BookOpen,
  GraduationCap,
  PlayCircle
} from 'lucide-react';
import { Equipment, BlogPost, Course } from './types';

const imageUrl = (file: string) => `${(import.meta as any).env.BASE_URL}images/${file}`;

const WHATSAPP_NUMBERS = (((import.meta as any).env.VITE_WHATSAPP_NUMBERS as string) || '5535999948797')
  .split(',')
  .map((n) => n.trim())
  .filter(Boolean);
const WHATSAPP_ROTATION_KEY = 'ml_whatsapp_rotation_idx';
const LEADS_ROTATION_KEY = 'ml_leads_rotation_idx';
const WHATSAPP_ASSIGNEE_NAMES = (((import.meta as any).env.VITE_WHATSAPP_ASSIGNEE_NAMES as string) || 'Thaina,Ana')
  .split(',')
  .map((n) => n.trim())
  .filter(Boolean);

const buildWhatsAppLinkForNumber = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const getDefaultWhatsAppLink = (text: string) =>
  buildWhatsAppLinkForNumber(WHATSAPP_NUMBERS[0], text);

const getNextWhatsAppNumber = () => {
  if (!WHATSAPP_NUMBERS.length) return '5535999948797';
  if (typeof window === 'undefined') return WHATSAPP_NUMBERS[0];

  try {
    const current = Number(window.localStorage.getItem(WHATSAPP_ROTATION_KEY) || '0');
    const nextIndex = Number.isFinite(current) ? (current + 1) % WHATSAPP_NUMBERS.length : 0;
    window.localStorage.setItem(WHATSAPP_ROTATION_KEY, String(nextIndex));
    return WHATSAPP_NUMBERS[current % WHATSAPP_NUMBERS.length] || WHATSAPP_NUMBERS[0];
  } catch {
    return WHATSAPP_NUMBERS[0];
  }
};

const getNextLeadAssignee = () => {
  if (!WHATSAPP_NUMBERS.length) {
    return { name: 'Consultora', number: '5535999948797' };
  }
  if (typeof window === 'undefined') {
    return { name: WHATSAPP_ASSIGNEE_NAMES[0] || 'Consultora', number: WHATSAPP_NUMBERS[0] };
  }

  try {
    const current = Number(window.localStorage.getItem(LEADS_ROTATION_KEY) || '0');
    const idx = Number.isFinite(current) ? current % WHATSAPP_NUMBERS.length : 0;
    const nextIndex = (idx + 1) % WHATSAPP_NUMBERS.length;
    window.localStorage.setItem(LEADS_ROTATION_KEY, String(nextIndex));
    return {
      name: WHATSAPP_ASSIGNEE_NAMES[idx] || `Consultora ${idx + 1}`,
      number: WHATSAPP_NUMBERS[idx],
    };
  } catch {
    return { name: WHATSAPP_ASSIGNEE_NAMES[0] || 'Consultora', number: WHATSAPP_NUMBERS[0] };
  }
};

const openRotatingWhatsApp = (text: string) => {
  if (typeof window === 'undefined') return;
  const number = getNextWhatsAppNumber();
  const url = buildWhatsAppLinkForNumber(number, text);
  window.open(url, '_blank', 'noopener,noreferrer');
};

const trackEvent = (eventName: string, params: Record<string, string> = {}) => {
  if (typeof window === 'undefined') return;
  const w = window as any;
  const payload = {
    ...params,
    page_path: w.location?.pathname || '/',
    page_hash: w.location?.hash || '',
  };

  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, payload);
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: eventName, ...payload });
  }
  if (typeof w.fbq === 'function') {
    if (eventName === 'lead_form_submit_success') {
      w.fbq('track', 'Lead', payload);
    } else {
      w.fbq('trackCustom', eventName, payload);
    }
  }
};

const handleWhatsAppCtaClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  text: string,
  section: string,
  cta: string,
) => {
  e.preventDefault();
  trackEvent('whatsapp_click', { section, cta, channel: 'whatsapp' });
  openRotatingWhatsApp(text);
};

const HeroParticles: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-20">
    {[...Array(15)].map((_, i) => (
      <div 
        key={i}
        className={`absolute w-1 h-1 ${i % 2 === 0 ? 'bg-pink-500/40' : 'bg-fuchsia-500/40'} rounded-full blur-[1px] animate-spark`}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          '--tx': `${(Math.random() - 0.5) * 400}px`,
          '--ty': `${(Math.random() - 0.5) * 400}px`,
          animationDelay: `${i * 0.2}s`,
        } as any}
      ></div>
    ))}
  </div>
);

const CreativeTechAura: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
    <div className="absolute w-[86%] h-[86%] border-[1px] border-fuchsia-500/[0.15] rounded-full animate-rotate-slow"></div>
    <div className="absolute w-[66%] h-[66%] border-dashed border-[1px] border-pink-500/[0.2] rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
    <div className="absolute top-[10%] left-[10%] animate-ui-float text-fuchsia-500/[0.28]"><Plus className="w-4 h-4" /></div>
    <div className="absolute bottom-[20%] right-[15%] animate-ui-float text-pink-500/[0.28]" style={{ animationDelay: '2s' }}><Target className="w-6 h-6" /></div>
    <div className="absolute top-[40%] right-[5%] animate-ui-float text-fuchsia-500/[0.28]" style={{ animationDelay: '4s' }}><Maximize2 className="w-3 h-3" /></div>
    <div className="absolute w-[78%] h-[78%] bg-gradient-to-br from-[var(--brand-hot-soft)] via-[var(--brand-wine-soft)] to-transparent rounded-full blur-[60px] animate-grid-pulse"></div>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-fuchsia-500/[0.12]"></div>
    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-pink-500/[0.12]"></div>
  </div>
);

const EquipmentModal: React.FC<{ equipment: Equipment; onClose: () => void }> = ({ equipment, onClose }) => {
  const equipmentWhatsappText = `Olá! Vim pelo site da Minas Laser e tenho interesse no equipamento ${equipment.title}.`;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-white border border-fuchsia-100 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] lg:max-h-[85vh] animate-slideUp">
        <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-12 relative overflow-hidden">
          <CreativeTechAura />
          <img src={equipment.image} alt={equipment.title} loading="lazy" decoding="async" className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl" />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-black"><X className="w-6 h-6" /></button>
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 text-[var(--brand-hot)] mb-3"><Info className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Ficha Técnica Oficial</span></div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] bg-clip-text text-transparent">{equipment.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light">{equipment.description}</p>
            </section>
            {equipment.specs && (
              <section>
                <div className="flex items-center gap-2 text-slate-400 mb-6"><Layers className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Configurações de Rental</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {equipment.specs.map((spec, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[var(--brand-hot-border)] transition-colors">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1 group-hover:text-[var(--brand-hot)]">{spec.label}</p>
                      <p className="font-bold text-sm text-slate-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="pt-8 flex flex-col gap-4">
              <a
                href={getDefaultWhatsAppLink(equipmentWhatsappText)}
                onClick={(e) => {
                  handleWhatsAppCtaClick(e, equipmentWhatsappText, 'modal_equipamento', `falar_whatsapp_${equipment.title.toLowerCase().replace(/\s+/g, '_')}`);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 border border-fuchsia-200 text-[var(--brand-wine)] font-bold rounded-2xl hover:bg-fuchsia-50 transition-all text-center uppercase tracking-widest text-[10px]"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseModal: React.FC<{ course: Course; onClose: () => void }> = ({ course, onClose }) => {
  const courseWhatsappText = `Olá! Vim pelo site da Minas Laser e tenho interesse no curso ${course.title}.`;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white border border-fuchsia-100 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-slideUp">
        <div className="md:w-5/12 bg-black relative overflow-hidden flex items-center justify-center">
          <img src={course.image} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-contain opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[var(--brand-wine-overlay)] to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-2 text-[var(--brand-hot)] mb-4">
              <PlayCircle className="w-6 h-6 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Masterclass Ativa</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{course.title}</h3>
          </div>
        </div>
        <div className="md:w-7/12 p-10 md:p-14 overflow-y-auto">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-black"><X className="w-6 h-6" /></button>
          <div className="space-y-10">
            <section>
              <span className="inline-block px-4 py-1 bg-fuchsia-50 rounded-full text-[9px] font-bold text-fuchsia-500 uppercase tracking-widest mb-6">{course.category}</span>
              <p className="text-slate-500 leading-relaxed font-light text-lg">{course.description}</p>
              {course.modules && course.modules.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {course.modules.map((item, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </section>
            <section className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
              <div className="space-y-2">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Carga Horária</p>
                <div className="flex items-center gap-2 text-black font-black">
                  <Clock className="w-4 h-4 text-[var(--brand-hot)]" /> <span>{course.duration}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Mentor Responsável</p>
                <div className="flex items-center gap-2 text-black font-black">
                  <User className="w-4 h-4 text-[var(--brand-wine)]" /> <span>{course.instructor}</span>
                </div>
              </div>
            </section>
            <div className="pt-4">
               <a
                 href={getDefaultWhatsAppLink(courseWhatsappText)}
                 onClick={(e) => {
                   handleWhatsAppCtaClick(e, courseWhatsappText, 'modal_curso', `falar_whatsapp_${course.title.toLowerCase().replace(/\s+/g, '_')}`);
                 }}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-4 mt-3 border border-fuchsia-200 text-[var(--brand-wine)] font-black rounded-2xl hover:bg-fuchsia-50 transition-all text-center uppercase tracking-[0.35em] text-[10px] block"
               >
                 Falar no WhatsApp
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-slideUp">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-fuchsia-900/20 to-transparent"></div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all"><X className="w-6 h-6" /></button>
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white text-[9px] font-bold uppercase tracking-widest rounded-full mb-4">{post.category}</span>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">{post.title}</h3>
          </div>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="flex items-center gap-8 mb-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[var(--brand-hot)]" /><span>{post.date}</span></div>
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-[var(--brand-wine)]" /><span>Por {post.author}</span></div>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-900 font-medium leading-relaxed mb-8 italic">{post.excerpt}</p>
            <div className="text-slate-600 leading-loose text-lg space-y-6">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-12 border-t border-slate-100">
             <a href="#contato" onClick={() => { trackEvent('cta_click', { section: 'modal_blog', cta: 'falar_sobre_tecnologia', channel: 'onsite' }); onClose(); }} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] bg-clip-text text-transparent hover:text-black transition-colors group">Falar sobre tecnologia <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[var(--brand-hot)]" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const LEADS_WEBHOOK_URL = (import.meta as any).env.VITE_LEADS_WEBHOOK_URL || '';
  const defaultWhatsappText = 'Olá! Vim pelo site da Minas Laser e quero solicitar um orçamento para locação de equipamentos.';
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string>('');
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const equipments: Equipment[] = [
    {
      id: '1',
      title: 'LAVIEEN',
      description: 'O laser Lavieen utiliza feixes de luz concentrados para direcionar áreas específicas da pele, estimulando a regeneração celular e promovendo a produção de colágeno. Seu resultado gera uma renovação tecidual, levando à atenuação de rugas, remoção de pigmentações excessivas, diminuição de poros e uniformização da pele.',
      highlight: 'BB Laser & Skin Quality',
      image: imageUrl('Laser%20Lavieen.png'), // Placeholder representativo
      category: 'Laser & Rejuvenescimento',
      specs: [
        { label: 'Indicação', value: 'Manchas, Poros e Rugas' },
        { label: 'Tecnologia', value: 'Laser de Thulium 1927nm' },
        { label: 'Sessões', value: 'Recuperação Ultrarrápida' }
      ]
    },
    {
      id: '2',
      title: 'ULTRAFORMER MPT',
      description: 'O Ultraformer MPT (Micro Point HIFU Technology) combina ultrassom focalizado e microfocalizado para oferecer resultados mais precisos e eficazes. Ele usa ondas de ultrassom de alta intensidade para estimular a produção de colágeno nas camadas mais profundas da pele. A tecnologia MPT permite uma cobertura mais completa e uma ação mais precisa nas áreas tratadas.',
      highlight: 'HIFU de Última Geração',
      image: imageUrl('Ultraformer%20MPT.png'), 
      category: 'Lifting & Ultrassom',
      specs: [
        { label: 'Disparos', value: 'Mínimo 1800 por locação' },
        { label: 'Ação', value: 'Lifting Facial e Corporal' },
        { label: 'Vantagem', value: 'Micro-Pulsed Technology' }
      ]
    },
    {
      id: '3',
      title: 'SOPRANO ICE PLATINUM',
      description: 'O Soprano ICE Platinum é uma revolução no mercado de depilação. Ele emprega os 3 feixes de laser que estão sendo utilizados no mercado para a depilação. Todos os equipamentos no mercado utilizam um feixe único (um comprimento de onda único, seja Alexandrita, Diodo ou Nd:YAG).',
      highlight: 'Depilação de Tripla Ação',
      image: imageUrl('Soprano%20Ice%20Platinum.png'),
      category: 'Depilação',
      specs: [
        { label: 'Tecnologia', value: '3 Comprimentos de Onda' },
        { label: 'Pele', value: 'Eficaz em todos os fototipos' },
        { label: 'Controle', value: 'Rastreador de uso integrado' }
      ]
    },
    {
      id: '4',
      title: 'INC',
      description: 'O INC é um laser de alta performance para remoção de tatuagem e lesões pigmentadas em clínicas de ponta. Com o INC, você amplia possibilidades de tratamento com segurança e resultados consistentes.',
      highlight: 'LASER ND-YAG-Q-SWITCH',
      image: imageUrl('Inkie%20Laser.png'),
      category: 'Remoção de Tatuagem',
      specs: [
        { label: 'Foco', value: 'Tatuagens e Lesões Pigmentadas' },
        { label: 'Disparos', value: 'Alta performance por pulso' },
        { label: 'Segurança', value: 'Protocolos Precisos' }
      ]
    },
    {
      id: '5',
      title: 'LIGHTSHEER LIGHT',
      description: 'Com um design totalmente inovador e moderno, o LightSheer Desire oferece um tratamento ainda mais rápido, eficaz e confortável para a redução permanente de pelos. Possui a tecnologia mais avançada do mundo para remoção de pelos, seu laser de diodo "padrão ouro" com o handpiece Light (9 x 9 mm). Com a nova tecnologia integrada HIT, oferece alta velocidade tanto em áreas grandes como pequenas. Tudo isso com conforto e segurança para o paciente.',
      highlight: 'Padrão Ouro em Diodo',
      image: imageUrl('Lightsheer%20Light.png'),
      category: 'Depilação',
      specs: [
        { label: 'Tecnologia', value: 'HIT Integrada' },
        { label: 'Conforto', value: 'Resfriamento Avançado' },
        { label: 'Velocidade', value: 'Ciclos Rápidos de Aplicação' }
      ]
    },
    {
      id: '6',
      title: 'ASGARD CRIOLIPÓLISE',
      description: 'O Asgard VC10 é uma plataforma desenvolvida pela Adoxy, a única do mercado a trabalhar com quatro manípulos, otimizando os protocolos de atendimento. Com sistemas independentes, uma bomba de vácuo para cada manípulo e células de congelamento de alta capacidade, a plataforma trabalha em alta performance, apresentando resultados comprovadamente superiores num menor tempo de aplicação.',
      highlight: '4 Manípulos Simultâneos',
      image: imageUrl('Asgard%20Criolip%C3%B3lise.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Plataforma', value: 'Adoxy VC10' },
        { label: 'Performance', value: 'Alta Capacidade Térmica' },
        { label: 'Otimização', value: 'Menor tempo de aplicação' }
      ]
    },
    {
      id: '7',
      title: 'POLARYS PLAXX',
      description: 'O Polarys Plaxx é um aparelho que veio para revolucionar seus atendimentos. Com 4 opções de modelos de aplicadores de tamanhos diferentes, o Polarys Plaxx conta com exclusivo aplicador para terapia combinada de criolipólise + eletroestimulação no mesmo aplicador.',
      highlight: 'Crio + Eletroestimulação',
      image: imageUrl('Polarys%20Plaxx.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Diferencial', value: 'Terapia Combinada' },
        { label: 'Flexibilidade', value: '4 Modelos de Aplicadores' },
        { label: 'Inovação', value: 'Controle Dinâmico de Corrente' }
      ]
    },
    {
      id: '8',
      title: 'CRIO REDUX',
      description: 'O equipamento que utiliza o resfriamento controlado para congelar a gordura sob a pele e eliminá-la. É um tratamento para redução de gordura localizada, com base na Criolipólise – técnica que utiliza uma nova tecnologia de resfriamento intenso e localizado, no qual as células de gordura são eliminadas com o frio, sem causar danos aos tecidos adjacentes.',
      highlight: 'Resfriamento Controlado',
      image: imageUrl('Redux.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Tecnologia', value: 'Crio-Redução Focalizada' },
        { label: 'Alvo', value: 'Gordura Localizada' },
        { label: 'Segurança', value: 'Preserva Tecidos Adjacentes' }
      ]
    },
    {
      id: '9',
      title: 'LIGHT PULSE',
      description: 'O Light Pulse® é um aparelho de Luz Intensa Pulsada, desenvolvido para trabalhar com um aplicador de filtro óptico intercambiável e/ou filtro óptico fixo. Conta ainda com display touch screen de 8", com interface amigável e que permite a completa visualização dos parâmetros aplicados, proporcionando maior precisão e manutenção dos padrões de tratamentos pré-estabelecidos.',
      highlight: 'Luz Intensa Pulsada Flex',
      image: imageUrl('Luz%20Pulsada%20HTM.png'),
      category: 'Laser & Rejuvenescimento',
      specs: [
        { label: 'Interface', value: 'Touch Screen 8"' },
        { label: 'Filtros', value: 'Intercambiáveis' },
        { label: 'Precisão', value: 'Manutenção de Padrões' }
      ]
    },
    {
      id: '10',
      title: 'HYBRIUS',
      description: 'O Hybrius é o único aparelho no mundo que reúne 3 terapias: Radiofrequência, Ultracavitação e Lipolep. Podem ser utilizadas de forma simultânea ou separadamente. Tratamentos com o Hybrius: celulite, flacidez, gordura localizada, estrias, pré-operatório, pós-operatório, fibrose e equimose.',
      highlight: 'Terapia Híbrida 3 em 1',
      image: imageUrl('Hybrius.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Terapias', value: 'RF + Cavitação + Lipolep' },
        { label: 'Pós-Op', value: 'Fibrose e Equimose' },
        { label: 'Resultado', value: 'Ação Tripla Simultânea' }
      ]
    },
    {
      id: '11',
      title: 'CRIOFREQUÊNCIA BHS',
      description: 'Criofrequência é uma terapia ideal e única que age através da sinergia do frio que vai até -10 graus e 1.050 watts de potência de onda eletromagnética (Radiofrequência). O encontro das duas temperaturas além de garantir a segurança do cliente, produz milhões de choques térmicos aos tecidos, gerando um terceiro efeito fisiológico, desestabilizando o metabolismo local. Tamanha energia mobiliza não somente o colágeno, mas também a gordura, sendo indicado para flacidez tissular (facial e corporal) e gordura localizada.',
      highlight: 'Choque Térmico Profundo',
      image: imageUrl('Criofrequ%C3%AAncia.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Frio', value: 'Até -10 Graus' },
        { label: 'Potência', value: '1.050 Watts' },
        { label: 'Indicação', value: 'Flacidez Tissular' }
      ]
    },
    {
      id: '12',
      title: 'IMUSCLE BUILDING',
      description: 'O iMuscle Building é um sistema de estimulação muscular que utiliza tecnologia de campo eletromagnético de alta intensidade, com protocolos inteligentes pré-programados de HIIT (High Intensity Interval Training), Hipertrofia, Força e Combinações de Treinos. Com ele, seus clientes terão resultados de alta performance em um período de um a dois meses de tratamento, incluindo aumento da espessura dos músculos e redução da camada de gordura subcutânea.',
      highlight: 'Performance Muscular HIIT',
      image: imageUrl('Imuscle%20Building.png'),
      category: 'Performance Muscular',
      specs: [
        { label: 'Tecnologia', value: 'Campo Eletromagnético HI-EMT' },
        { label: 'Protocolos', value: 'Hipertrofia e Força' },
        { label: 'Frequência', value: 'Resultados em 1-2 meses' }
      ]
    },
    {
      id: '13',
      title: 'NEOXCEL CO2',
      description: 'O Neoxel é um laser de CO2 fracionado de alta performance, ideal para rejuvenescimento profundo, tratamento de cicatrizes e estrias. Sua tecnologia permite uma ablação precisa da pele, estimulando intensamente a produção de colágeno e promovendo uma renovação celular completa com resultados visíveis desde a primeira sessão.',
      highlight: 'CO2 Ultrapulsado',
      image: imageUrl('Neoxel%20CO2.png'),
      category: 'Laser & Rejuvenescimento',
      specs: [
        { label: 'Tecnologia', value: 'Laser CO2 Fracionado' },
        { label: 'Indicação', value: 'Rugas, Cicatrizes e Estrias' },
        { label: 'Vantagem', value: 'Renovação Tecidual Profunda' }
      ]
    },
    {
      id: '14',
      title: 'RESFRIADOR FREDDO',
      description: 'O Freddo é um sistema de resfriamento de ar de alta potência projetado para proporcionar máximo conforto e segurança durante procedimentos a laser e dermatológicos. Ele protege a epiderme, reduz a dor e minimiza o risco de lesões térmicas, permitindo o uso de maiores energias para resultados mais eficazes.',
      highlight: 'Máximo Conforto Térmico',
      image: imageUrl('Resfriador%20Freddo.png'),
      category: 'Acessórios & Conforto',
      specs: [
        { label: 'Função', value: 'Resfriamento Cutâneo Localizado' },
        { label: 'Segurança', value: 'Proteção Epidérmica' },
        { label: 'Fluxo', value: 'Ar Frio de Alta Potência' }
      ]
    },
    {
      id: '15',
      title: 'ILIPO',
      description: 'O ILipo é uma plataforma para tratamentos corporais não invasivos com foco em redução de medidas e melhora do contorno corporal, com protocolos rápidos e seguros para a rotina clínica.',
      highlight: 'Contorno Corporal Não Invasivo',
      image: imageUrl('i-lipo.png'),
      category: 'Corporal & Criolipólise',
      specs: [
        { label: 'Aplicação', value: 'Redução de Medidas' },
        { label: 'Protocolo', value: 'Sessões Rápidas' },
        { label: 'Diferencial', value: 'Tratamento Não Invasivo' }
      ]
    }
  ];

  const courses: Course[] = [
    {
      id: 'c1',
      title: 'Inkie Laser',
      description: 'Treinamento completo para operação segura e resultados clínicos consistentes com o Inkie Laser.',
      duration: 'Curso Completo',
      category: 'Operacional',
      instructor: 'Equipe Técnica Minas Laser',
      image: imageUrl('Inkie%20Laser%20curso.jpg'),
      modules: ['Teoria Completa', 'Prática em Pacientes Modelo', 'Certificado', 'Material Didático', 'Suporte pós Curso']
    },
    {
      id: 'c2',
      title: 'Laser Lavieen',
      description: 'Treinamento completo para operação segura e resultados clínicos consistentes com o Laser Lavieen.',
      duration: 'Curso Completo',
      category: 'Operacional',
      instructor: 'Equipe Técnica Minas Laser',
      image: imageUrl('Laser%20Lavieen%20curso-optimized.jpg'),
      modules: ['Teoria Completa', 'Prática em Pacientes Modelo', 'Certificado', 'Material Didático', 'Suporte pós Curso']
    },
    {
      id: 'c3',
      title: 'Light Sheer e Soprano Platinum',
      description: 'Treinamento completo para operação segura e resultados clínicos consistentes com Light Sheer e Soprano Platinum.',
      duration: 'Curso Completo',
      category: 'Operacional',
      instructor: 'Equipe Técnica Minas Laser',
      image: imageUrl('LIGHT%20SHEER%20E.jpg'),
      modules: ['Teoria Completa', 'Prática em Pacientes Modelo', 'Certificado', 'Material Didático', 'Suporte pós Curso']
    },
    {
      id: 'c4',
      title: 'Ultraforme MPT',
      description: 'Treinamento completo para operação segura e resultados clínicos consistentes com o Ultraforme MPT.',
      duration: 'Curso Completo',
      category: 'Operacional',
      instructor: 'Equipe Técnica Minas Laser',
      image: imageUrl('Ultraforme%20MPT-optimized.jpg'),
      modules: ['Teoria Completa', 'Prática em Pacientes Modelo', 'Certificado', 'Material Didático', 'Suporte pós Curso']
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 'p1',
      title: 'Tendências em Estética Avançada para 2025',
      excerpt: 'Descubra as tecnologias que estão redefinindo o rejuvenescimento não invasivo e o que os pacientes mais procuram.',
      content: 'O mercado de estética avança a passos largos. Para 2025, a palavra de ordem é naturalidade aliada à tecnologia de ponta.\n\nEquipamentos como o Ultraformer MPT têm se destacado por oferecer resultados de lifting imediatos sem o downtime das cirurgias tradicionais. Além disso, a combinação de protocolos (bioestimuladores + tecnologias) é a grande aposta das clínicas de luxo.\n\nA Minas Laser Locações acompanha essa evolução trazendo sempre os lançamentos que garantem segurança e satisfação máxima para o paciente final.',
      date: '15 Mai, 2024',
      category: 'Tendências',
      author: 'Equipe Técnica',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'p2',
      title: 'Locação vs. Compra: O que é melhor para sua clínica?',
      excerpt: 'Uma análise financeira detalhada sobre como o aluguel de equipamentos de alta tecnologia pode acelerar seu ROI.',
      content: 'Muitos gestores de clínicas enfrentam o dilema: investir milhões na compra de um equipamento ou optar pela locação?\n\nA locação oferece vantagens estratégicas imbatíveis. Primeiro, elimina o risco de obsolescência tecnológica. Segundo, permite que a clínica tenha diversos equipamentos sem imobilizar capital. Terceiro, toda a manutenção e suporte ficam por conta da Minas Laser.\n\nAo optar pela locação, você foca no que importa: o atendimento ao paciente, enquanto nós cuidamos da infraestrutura tecnológica.',
      date: '10 Mai, 2024',
      category: 'Gestão',
      author: 'Especialista em ROI',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'p3',
      title: 'A Ciência por trás do Laser de Thulium (Lavieen)',
      excerpt: 'Entenda por que o efeito "BB Laser" se tornou um fenômeno global e como ele transforma a qualidade da pele.',
      content: 'O Laser de Thulium, popularizado pelo Lavieen, atua de forma fracionada não ablativa. Isso significa que ele trata a pele profundamente com uma recuperação extremamente rápida.\n\nIdeal para tratar poros dilatados, linhas finas e o famoso "glow" da pele, ele se tornou indispensável em clínicas modernas. Sua versatilidade permite tratar diversos fototipos com segurança absoluta.\n\nNeste artigo, exploramos as especificações técnicas que tornam o comprimento de onda de 1927nm tão especial para a dermatologia atual.',
      date: '02 Mai, 2024',
      category: 'Tecnologia',
      author: 'Eng. Biomédico',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const faqItems = [
    {
      question: 'Vocês atendem apenas Lavras, MG?',
      answer:
        'Atendemos Lavras e outras cidades de Minas Gerais com logística planejada para clínicas e profissionais da estética.',
    },
    {
      question: 'Quais equipamentos para remoção de pelos a laser estão disponíveis para locação?',
      answer:
        'Trabalhamos com plataformas como Soprano Ice Platinum e LightSheer, com foco em alta performance e segurança clínica.',
    },
    {
      question: 'É melhor locação ou compra de equipamento estético?',
      answer:
        'A locação reduz imobilização de capital, acelera retorno e permite atualizar tecnologia conforme a demanda da clínica.',
    },
    {
      question: 'Como funciona suporte e treinamento na locação?',
      answer:
        'Além do equipamento, oferecemos orientação operacional, suporte técnico e treinamento para elevar segurança e resultado.',
    },
  ];

  const equipmentDisplayOrder = [
    'NEOXCEL CO2',
    'LAVIEEN',
    'ULTRAFORMER MPT',
    'SOPRANO ICE PLATINUM',
    'LIGHTSHEER LIGHT',
    'LIGHT PULSE',
    'INC',
    'RESFRIADOR FREDDO',
    'IMUSCLE BUILDING',
    'CRIOFREQUÊNCIA BHS',
    'HYBRIUS',
    'ILIPO',
    'ASGARD CRIOLIPÓLISE',
    'POLARYS PLAXX',
    'CRIO REDUX',
  ];
  const equipmentOrderIndex = new Map(equipmentDisplayOrder.map((title, idx) => [title, idx]));
  const sortedEquipments = [...equipments].sort((a, b) => {
    const aIdx = equipmentOrderIndex.get(a.title);
    const bIdx = equipmentOrderIndex.get(b.title);
    if (aIdx === undefined && bIdx === undefined) return 0;
    if (aIdx === undefined) return 1;
    if (bIdx === undefined) return -1;
    return aIdx - bIdx;
  });

  const featuredEquipmentTitles = new Set(['LAVIEEN', 'NEOXCEL CO2', 'ULTRAFORMER MPT']);
  const heroEquipments = sortedEquipments.filter((e) => featuredEquipmentTitles.has(e.title));
  const categories = [
    'Todos',
    ...Array.from(new Set(sortedEquipments.map((e) => e.category))),
    'Qualidade da Pele',
    'Flacidez',
    'Vasinhos',
    'Estimulo de Colageno',
    'Rosaceas',
    'Gordura Localizada',
    'Radiofrequencia',
    'Ultrasom Microfocado',
    'Peeling',
    'Eletroestimulação',
  ];

  const normalizeText = (value: string) => {
    const raw = String(value || '');
    const normalized = typeof raw.normalize === 'function' ? raw.normalize('NFD') : raw;
    return normalized.replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const equipmentClinicalTags: Record<string, string[]> = {
    LAVIEEN: ['Qualidade da Pele', 'Peeling', 'Rosaceas', 'Estimulo de Colageno'],
    'ULTRAFORMER MPT': ['Flacidez', 'Ultrasom Microfocado', 'Estimulo de Colageno'],
    'SOPRANO ICE PLATINUM': ['Qualidade da Pele'],
    INC: ['Peeling', 'Qualidade da Pele'],
    'LIGHTSHEER LIGHT': ['Qualidade da Pele'],
    'ASGARD CRIOLIPÓLISE': ['Gordura Localizada'],
    'POLARYS PLAXX': ['Gordura Localizada', 'Eletroestimulação'],
    'CRIO REDUX': ['Gordura Localizada'],
    'LIGHT PULSE': ['Vasinhos', 'Rosaceas', 'Qualidade da Pele'],
    HYBRIUS: ['Gordura Localizada', 'Radiofrequencia'],
    'CRIOFREQUÊNCIA BHS': ['Flacidez', 'Radiofrequencia', 'Gordura Localizada'],
    'IMUSCLE BUILDING': ['Eletroestimulação', 'Gordura Localizada'],
    'NEOXCEL CO2': ['Peeling', 'Estimulo de Colageno', 'Qualidade da Pele'],
    'RESFRIADOR FREDDO': [],
    ILIPO: ['Gordura Localizada'],
  };

  const matchesEquipmentFilter = (equipment: Equipment, filter: string) => {
    if (filter === 'Todos') return true;
    if (equipment.category === filter) return true;
    const clinicalTags = equipmentClinicalTags[equipment.title] || [];
    if (clinicalTags.some((tag) => normalizeText(tag) === normalizeText(filter))) return true;

    const haystack = [
      equipment.title,
      equipment.highlight,
      equipment.description,
      equipment.category,
      ...clinicalTags,
      ...(equipment.specs || []).reduce<string[]>((acc, s) => {
        acc.push(s.label, s.value);
        return acc;
      }, []),
    ].join(' ');

    return normalizeText(haystack).includes(normalizeText(filter));
  };

  const filteredEquipments = sortedEquipments.filter((e) => matchesEquipmentFilter(e, activeCategory));
  const filteredCourses = courses;
  const trackInternalCta = (section: string, cta: string) => {
    trackEvent('cta_click', { section, cta, channel: 'onsite' });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setCurrentIdx((prev) => (prev + 1) % heroEquipments.length), 6000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [heroEquipments.length]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const sectionIds = ['home', 'beneficios', 'equipamentos', 'prova-social', 'intencoes-seo', 'seguranca', 'contato'];
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !seen.has(id)) {
            seen.add(id);
            trackEvent('section_view', { section: id, channel: 'onsite' });
          }
        });
      },
      { threshold: 0.35 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormState('submitting');
    trackEvent('lead_form_submit_attempt', {
      section: 'contato',
      cta: 'quero_atendimento_prioritario',
      channel: 'form',
    });
    try {
      if (!LEADS_WEBHOOK_URL) {
        throw new Error('Webhook não configurado');
      }
      const assignee = getNextLeadAssignee();

      const payload = {
        name: leadForm.name.trim(),
        whatsapp: leadForm.whatsapp.trim(),
        source: 'site-minas-laser',
        assignee_name: assignee.name,
        assignee_whatsapp: assignee.number,
        submittedAt: new Date().toISOString(),
      };

      await fetch(LEADS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      trackEvent('lead_form_submit_success', {
        section: 'contato',
        channel: 'form',
      });
      setFormState('success');
      setLeadForm({ name: '', whatsapp: '' });
      setTimeout(() => setFormState('idle'), 8000);
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      trackEvent('lead_form_submit_error', {
        section: 'contato',
        channel: 'form',
      });
      setFormState('idle');
      setFormError('Não foi possível enviar agora. Tente novamente em instantes.');
    }
  };

  const currentEq = heroEquipments[currentIdx] || heroEquipments[0];

  return (
    <div
      className="flex flex-col min-h-screen selection:bg-[var(--brand-hot)] selection:text-white bg-white text-slate-900"
      style={
        {
          '--brand-hot': '#FF0F5E',
          '--brand-wine': '#8A0F6E',
          '--brand-blush': '#F6D7E4',
          '--brand-hot-soft': 'rgba(255, 15, 94, 0.06)',
          '--brand-wine-soft': 'rgba(138, 15, 110, 0.06)',
          '--brand-hot-border': 'rgba(255, 15, 94, 0.32)',
          '--brand-wine-overlay': 'rgba(138, 15, 110, 0.14)',
          '--brand-hot-glow': 'rgba(255, 15, 94, 0.07)',
          '--brand-wine-glow': 'rgba(138, 15, 110, 0.07)',
        } as React.CSSProperties
      }
    >
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-1 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className={`container mx-auto px-6 flex justify-between items-center relative ${isScrolled ? 'min-h-[42px] md:min-h-[48px]' : 'min-h-[56px] md:min-h-[72px]'}`}>
          <nav className="hidden lg:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
            <a href="#home" className="hover:text-black transition-colors">Home</a>
            <a href="#beneficios" className="hover:text-black transition-colors">Benefícios</a>
            <a href="#equipamentos" className="hover:text-black transition-colors">Tecnologias</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </nav>
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
             <img src={imageUrl('Logo.png')} alt="Minas Laser" className={`transition-all duration-700 object-contain drop-shadow-sm ${isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-12'}`} onError={(e) => { e.currentTarget.src = "https://i.ibb.co/LdfV8R9/logo-minas.png"; }} />
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
            <a href="#prova-social" className="hover:text-black transition-colors">Resultados</a>
            <a href="#seguranca" className="hover:text-black transition-colors">Segurança</a>
            <a href="#contato" onClick={() => trackInternalCta('header', 'menu_contato')} className="hover:text-black transition-colors">Contato</a>
          </nav>
          <button
            className="lg:hidden text-black z-50"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 mt-2 px-6">
              <nav className="bg-white/95 backdrop-blur-md border border-fuchsia-100 rounded-2xl shadow-xl p-5 flex flex-col gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition-colors">Home</a>
                <a href="#beneficios" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition-colors">Benefícios</a>
                <a href="#equipamentos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition-colors">Tecnologias</a>
                <a href="#prova-social" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition-colors">Resultados</a>
                <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black transition-colors">FAQ</a>
                <a href="#contato" onClick={() => { trackInternalCta('header_mobile', 'menu_contato'); setIsMobileMenuOpen(false); }} className="hover:text-black transition-colors">Contato</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-36 pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--brand-hot-glow)] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--brand-wine-glow)] blur-[150px] rounded-full"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="animate-slideUp text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-50 text-[10px] font-black text-[var(--brand-hot)] uppercase tracking-[0.35em]">
              Atendimento em Minas Gerais
            </span>
            <h1 className="mt-6 w-full max-w-5xl mx-auto text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-[0.92]">
              <span className="block">Alugue Equipamentos</span>
              <span className="block">Estéticos Premium</span>
              <span className="block bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] bg-clip-text text-transparent">Sem Imobilizar Capital.</span>
            </h1>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mais faturamento, menos risco e suporte técnico para sua clínica operar com segurança.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                <a href="#depilacao-laser" className="px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 transition-colors">Locação laser depilação</a>
                <a href="#ultraformer-mpt" className="px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 transition-colors">Ultraformer MPT aluguel</a>
                <a href="#lavieen-locacao" className="px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-200 transition-colors">Lavieen locação</a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
                <div className="rounded-2xl border border-fuchsia-100 bg-white p-4 text-center">
                  <p className="text-xl font-black text-black">24h</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Suporte</p>
                </div>
                <div className="rounded-2xl border border-fuchsia-100 bg-white p-4 text-center">
                  <p className="text-xl font-black text-black">17+</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Anos de Mercado</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contato" onClick={() => trackInternalCta('hero', 'ver_disponibilidade_semana')} className="inline-block px-10 py-4 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white rounded-full transition-all duration-500 uppercase text-[10px] font-black tracking-[0.35em] shadow-2xl shadow-fuchsia-200 hover:scale-[1.02]">
                  Ver disponibilidade desta semana
                </a>
                <a
                  href={getDefaultWhatsAppLink(defaultWhatsappText)}
                  onClick={(e) => {
                    handleWhatsAppCtaClick(e, defaultWhatsappText, 'hero', 'quero_proposta_whatsapp');
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 border border-fuchsia-200 text-[var(--brand-wine)] rounded-full hover:bg-fuchsia-50 transition-colors uppercase text-[10px] font-bold tracking-[0.35em]"
                >
                  Quero minha proposta no WhatsApp
                </a>
              </div>
              <p className="mt-5 text-[11px] font-semibold text-slate-500">
                Agenda de rotas limitada por região. Garanta seu equipamento para os próximos atendimentos.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative w-[280px] md:w-[420px] lg:w-[480px] aspect-square flex items-center justify-center group">
                <CreativeTechAura />
                <HeroParticles />
                <div key={`img-wrap-${currentIdx}`} className="w-full h-full flex items-center justify-center relative z-10 animate-impact">
                 <img src={currentEq.image} alt={currentEq.title} loading="eager" fetchPriority="high" decoding="async" className="max-w-[85%] max-h-[85%] object-contain drop-shadow-2xl animate-bounce-slow" />
                </div>
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[34%] left-[1%] md:top-[36%] md:left-[2%] -translate-y-1/2">
                    <div className="px-2 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-white/92 border border-fuchsia-100 shadow-xl backdrop-blur-sm w-[128px] md:w-[180px]">
                      <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-slate-400 mb-1">Equipamento</p>
                      <p className="text-[8px] md:text-[11px] font-black uppercase tracking-wide md:tracking-wider text-black line-clamp-2">{currentEq.title}</p>
                    </div>
                    <div className="absolute right-[-18px] md:right-[-34px] top-1/2 -translate-y-1/2 w-4 md:w-8 h-[2px] bg-gradient-to-r from-[var(--brand-wine)] to-transparent"></div>
                    <div className="absolute right-[-21px] md:right-[-38px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--brand-hot)]"></div>
                  </div>

                  <div className="absolute top-[43%] right-[1%] md:top-[45%] md:right-[2%] -translate-y-1/2">
                    <div className="px-2 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-white/92 border border-fuchsia-100 shadow-xl backdrop-blur-sm w-[128px] md:w-[180px]">
                      <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-slate-400 mb-1">Funcionalidade</p>
                      <p className="text-[8px] md:text-[11px] font-black uppercase tracking-wide md:tracking-wider text-black line-clamp-2">{currentEq.highlight}</p>
                    </div>
                    <div className="absolute left-[-18px] md:left-[-34px] top-1/2 -translate-y-1/2 w-4 md:w-8 h-[2px] bg-gradient-to-l from-[var(--brand-hot)] to-transparent"></div>
                    <div className="absolute left-[-21px] md:left-[-38px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--brand-wine)]"></div>
                  </div>

                  <div className="absolute bottom-[6%] md:bottom-[5%] left-1/2 -translate-x-1/2">
                    <div className="px-2 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-white/92 border border-fuchsia-100 shadow-xl backdrop-blur-sm w-[180px] md:w-[220px] text-center">
                      <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-slate-400 mb-1">Tecnologia</p>
                      <p className="text-[8px] md:text-[11px] font-black uppercase tracking-wide md:tracking-wider text-black line-clamp-2">{currentEq.specs?.[0]?.value || 'Alta Performance'}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-[-14px] md:top-[-20px] w-[2px] h-3 md:h-5 bg-gradient-to-t from-[var(--brand-hot)] to-transparent"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-[-17px] md:top-[-24px] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--brand-hot)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-16 bg-[#fafafa] border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-[var(--brand-hot)] uppercase tracking-[0.5em]">Por Que Locar</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">Mais Resultado, Menos Risco</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="rounded-3xl border border-slate-100 bg-white p-8">
                <h3 className="text-xl font-black text-black">Sem travar seu caixa</h3>
                <p className="mt-3 text-slate-500">Evite alto investimento inicial e use seu capital para equipe, marketing e crescimento da clínica.</p>
              </article>
              <article className="rounded-3xl border border-slate-100 bg-white p-8">
                <h3 className="text-xl font-black text-black">Retorno mais rápido</h3>
                <p className="mt-3 text-slate-500">Ative protocolos de alto ticket sem esperar meses para recuperar o valor de compra do equipamento.</p>
              </article>
              <article className="rounded-3xl border border-slate-100 bg-white p-8">
                <h3 className="text-xl font-black text-black">Risco operacional menor</h3>
                <p className="mt-3 text-slate-500">Conte com suporte técnico, orientação de uso e acompanhamento para operar com segurança.</p>
              </article>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href={getDefaultWhatsAppLink('Olá! Quero simular meu plano de locação com a Minas Laser.')}
                onClick={(e) => {
                  handleWhatsAppCtaClick(e, 'Olá! Quero simular meu plano de locação com a Minas Laser.', 'beneficios', 'simular_plano_locacao');
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white rounded-full uppercase text-[10px] font-black tracking-[0.3em] text-center"
              >
                Simular meu plano de locação
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-[10px] font-bold text-[var(--brand-wine)] uppercase tracking-[0.5em] block">Nossa História</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              Líder em <span className="bg-gradient-to-r from-slate-300 to-fuchsia-200 bg-clip-text text-transparent">Alta Performance</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] mt-8 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 space-y-10 animate-slideUp">
              <div className="space-y-8 text-slate-500 font-light leading-loose text-lg max-w-xl">
                <p>Desde 2009, impulsionando profissionais da estética através da tecnologia certa.Nascemos da paixão pela beleza e da visão empreendedora de duas irmãs que sempre acreditaram que inovação só faz sentido quando gera resultados concretos - clínicos e financeiros.</p>
                <p>Há 17 anos, selecionamos e disponibilizamos equipamentos estéticos de alta performance para profissionais e clínicas que desejam crescer com segurança, autoridade e maior lucratividade.</p>
                <p>Mais do que tecnologia, oferecemos curadoria criteriosa, suporte próximo e soluções que acompanham a evolução do mercado - da estética facial aos protocolos corporais e à remoção de pelos a laser. Cada equipamento do nosso portfólio é escolhido com um propósito claro: elevar o padrão dos seus atendimentos, potencializar seus resultados e aumentar a rentabilidade da sua clínica.</p>
                <p>Se você quer evoluir sua estrutura, fortalecer seu posicionamento e transformar tecnologia em faturamento, está no lugar certo.</p>
                <p className="font-medium text-slate-700">Minas Laser Locações.<br />Tecnologia que gera resultado. Lucro que sustenta crescimento.</p>
              </div>
              <a href="#contato" onClick={() => trackInternalCta('sobre', 'fale_com_especialista')} className="inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-black hover:text-[var(--brand-wine)] transition-colors group">Fale com um Especialista <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform text-[var(--brand-hot)]" /></a>
            </div>
            <div className="order-1 relative group animate-fadeIn">
               <div className="relative z-20 -mt-3 md:-mt-5 mb-4 md:mb-6 w-[92%] mx-auto">
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="bg-white rounded-2xl p-3 md:p-4 text-center border border-fuchsia-100 shadow-lg">
                      <div className="w-9 h-9 md:w-10 md:h-10 mx-auto mb-2 bg-fuchsia-50 rounded-xl flex items-center justify-center text-[var(--brand-hot)]"><Clock className="w-4 h-4" /></div>
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black">Suporte 24/7</h4>
                      <p className="mt-1 text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-wide">Assistência Total</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 md:p-4 text-center border border-fuchsia-100 shadow-lg">
                      <div className="w-9 h-9 md:w-10 md:h-10 mx-auto mb-2 bg-pink-50 rounded-xl flex items-center justify-center text-fuchsia-500"><Award className="w-4 h-4" /></div>
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black">Certificados</h4>
                      <p className="mt-1 text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-wide">Foco ANVISA</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 md:p-4 text-center border border-fuchsia-100 shadow-lg">
                      <div className="w-9 h-9 md:w-10 md:h-10 mx-auto mb-2 bg-slate-50 rounded-xl flex items-center justify-center text-fuchsia-600"><Zap className="w-4 h-4" /></div>
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black">Expertise</h4>
                      <p className="mt-1 text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-wide">17 Anos de Mercado</p>
                    </div>
                  </div>
               </div>
               <div className="absolute inset-0 bg-fuchsia-500/5 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
               <div className="relative z-10 p-8 bg-white border border-slate-100 rounded-[4rem] shadow-2xl overflow-hidden aspect-[4/5] lg:aspect-square flex items-center justify-center">
                  <CreativeTechAura />
                  <img src={imageUrl('sobre-optimized.jpg')} alt="Nossa História" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                     <div className="px-8 py-6 md:px-10 md:py-8 bg-white/95 border border-fuchsia-50 rounded-[2rem] shadow-xl text-center">
                        <h3 className="text-4xl font-black bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] bg-clip-text text-transparent mb-1">17+</h3>
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">Anos de Inovação</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="equipamentos" className="py-20 bg-white border-y border-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
             <span className="text-[10px] font-bold text-[var(--brand-hot)] uppercase tracking-[0.5em] mb-4">Portfólio</span>
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-8">Nossas <span className="text-slate-200">Tecnologias</span></h2>
             <div className="flex flex-wrap justify-center gap-4 mt-4">
               {categories.map((cat) => (
                 <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeCategory === cat ? 'bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white shadow-lg shadow-fuchsia-200' : 'bg-slate-50 text-slate-400 hover:text-black hover:bg-slate-100'}`}>{cat}</button>
               ))}
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredEquipments.map((eq) => (
              <div key={eq.id} className="group cursor-pointer flex flex-col items-center text-center animate-slideUp" onClick={() => setSelectedEquipment(eq)}>
                <div className="relative aspect-square w-full mb-8 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-fuchsia-100">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden"><CreativeTechAura /></div>
                  <img src={eq.image} loading="lazy" decoding="async" className="relative z-10 w-full h-full object-contain p-10 transition-transform duration-1000 group-hover:scale-105" alt={eq.title} />
                </div>
                <h3 className="text-lg font-black mb-2 uppercase tracking-widest text-black group-hover:text-[var(--brand-wine)] transition-colors line-clamp-1">{eq.title}</h3>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">{eq.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prova-social" className="py-14 bg-[#fafafa] border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[2.2rem] bg-white border border-fuchsia-100 p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--brand-hot)]">Pronto para escalar?</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-black uppercase tracking-tight text-black">Clínicas já usam para vender mais sem comprar equipamento</h3>
                <p className="mt-2 text-sm text-slate-500">Mais autoridade, protocolos premium e previsibilidade financeira com acompanhamento da Minas Laser.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contato" onClick={() => trackInternalCta('prova_social', 'solicite_orcamento')} className="px-7 py-4 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white rounded-full uppercase text-[10px] font-black tracking-[0.3em] text-center">Solicite Orçamento</a>
                <a
                  href={getDefaultWhatsAppLink(defaultWhatsappText)}
                  onClick={(e) => {
                    handleWhatsAppCtaClick(e, defaultWhatsappText, 'prova_social', 'falar_especialista_agora');
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 border border-fuchsia-200 text-[var(--brand-wine)] rounded-full uppercase text-[10px] font-black tracking-[0.3em] text-center hover:bg-fuchsia-50 transition-colors"
                >
                  Falar com especialista agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="intencoes-seo" className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-[var(--brand-hot)] uppercase tracking-[0.5em]">Soluções por Objetivo</span>
              <h2 className="mt-5 text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">Páginas de Busca Mais Procuradas</h2>
              <p className="mt-4 text-slate-500 max-w-3xl mx-auto">Conteúdo otimizado para as principais pesquisas de clínicas e profissionais que buscam locação de equipamentos estéticos em Minas Gerais.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article id="depilacao-laser" className="rounded-3xl border border-slate-100 bg-[#fcfcfc] p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-hot)]">Locação Laser Estética</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-black">Aluguel de Laser para Remoção de Pelos</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">Equipamentos como Soprano Ice Platinum e LightSheer para clínicas que precisam de tecnologia premium, segurança e previsibilidade operacional.</p>
                <a href="#contato" onClick={() => trackInternalCta('intencoes_seo', 'solicitar_proposta_depilacao')} className="mt-5 inline-block text-[11px] font-black uppercase tracking-[0.25em] text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors">Solicitar Proposta</a>
              </article>

              <article id="ultraformer-mpt" className="rounded-3xl border border-slate-100 bg-[#fcfcfc] p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-hot)]">Lifting e Ultrassom</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-black">Locação de Ultraformer MPT</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">Aluguel de Ultraformer MPT para protocolos faciais e corporais com alto valor agregado, suporte técnico e treinamento para sua equipe.</p>
                <a href="#contato" onClick={() => trackInternalCta('intencoes_seo', 'pedir_orcamento_ultraformer')} className="mt-5 inline-block text-[11px] font-black uppercase tracking-[0.25em] text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors">Peça um Orçamento</a>
              </article>

              <article id="lavieen-locacao" className="rounded-3xl border border-slate-100 bg-[#fcfcfc] p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-hot)]">Rejuvenescimento</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-black">Locação de Lavieen para Clínicas</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">Locação do Lavieen para protocolos de qualidade da pele, manchas e poros com operação segura e suporte próximo para resultados consistentes.</p>
                <a href="#contato" onClick={() => trackInternalCta('intencoes_seo', 'falar_especialista_lavieen')} className="mt-5 inline-block text-[11px] font-black uppercase tracking-[0.25em] text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors">Falar com Especialista</a>
              </article>

              <article id="locacao-minas-gerais" className="rounded-3xl border border-slate-100 bg-[#fcfcfc] p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--brand-hot)]">Atuação Regional</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-black">Locação de Equipamentos Estéticos em Minas Gerais</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">Atendemos Lavras e diversas cidades de Minas Gerais com logística planejada, curadoria de equipamentos e acompanhamento técnico.</p>
                <a href="#contato" onClick={() => trackInternalCta('intencoes_seo', 'solicite_atendimento_regional')} className="mt-5 inline-block text-[11px] font-black uppercase tracking-[0.25em] text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors">Solicite Atendimento</a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="cursos" className="hidden py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
             <span className="text-[10px] font-bold text-[var(--brand-wine)] uppercase tracking-[0.5em] mb-4">Educational Hub</span>
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-8">Cursos e <span className="text-slate-200">Treinamentos</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-slate-50 rounded-[3rem] p-8 group cursor-pointer hover:bg-white border border-transparent hover:border-fuchsia-100 transition-all duration-700 hover:shadow-2xl" onClick={() => setSelectedCourse(course)}>
                 <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-white">
                   <img src={course.image} loading="lazy" decoding="async" className="w-full h-full object-contain p-3 grayscale group-hover:grayscale-0 transition-all duration-1000" alt={course.title} />
                   <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-xl"><GraduationCap className="w-5 h-5 text-[var(--brand-wine)]" /></div>
                 </div>
                 <span className="text-[9px] font-bold text-[var(--brand-hot)] uppercase tracking-widest mb-4 block">{course.category}</span>
                 <h3 className="text-xl font-black uppercase tracking-tighter text-black mb-6 leading-tight group-hover:text-[var(--brand-wine)] transition-colors">{course.title}</h3>
                 <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4 text-slate-300" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.duration}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-[var(--brand-hot)] group-hover:translate-x-2 transition-all" />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="hidden py-20 bg-[#fafafa]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
             <span className="text-[10px] font-bold text-[var(--brand-hot)] uppercase tracking-[0.5em] mb-4">Editorial de Inovação</span>
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">Nosso <span className="text-slate-300">Blog</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-fuchsia-200 transition-all duration-700 hover:-translate-y-3 cursor-pointer group flex flex-col h-full" onClick={() => setSelectedPost(post)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} loading="lazy" decoding="async" alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-black group-hover:bg-gradient-to-r group-hover:from-[var(--brand-hot)] group-hover:to-[var(--brand-wine)] group-hover:text-white transition-all">{post.category}</div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6"><Calendar className="w-3 h-3 text-[var(--brand-hot)]" /> <span>{post.date}</span></div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-black leading-none mb-6 group-hover:text-[var(--brand-wine)] transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-black group-hover:text-[var(--brand-wine)] transition-colors">Ler Artigo <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[var(--brand-hot)]" /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-[var(--brand-wine)] uppercase tracking-[0.5em] block">Conteúdo Educacional</span>
              <h2 className="mt-5 text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">Perguntas Frequentes</h2>
              <p className="mt-4 text-slate-500 max-w-3xl mx-auto">Respostas rápidas sobre locação de equipamentos estéticos, suporte e operação para clínicas em Minas Gerais.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-3xl border border-slate-100 bg-[#fcfcfc] p-7">
                  <h3 className="text-lg font-black text-black leading-tight">{item.question}</h3>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="seguranca" className="py-16 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
           <div className="space-y-6">
              <TrendingUp className="w-7 h-7 text-[var(--brand-hot)] mx-auto opacity-50" />
             <h4 className="text-5xl font-black tracking-tighter text-black">17+</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Anos de Autoridade</p>
           </div>
           <div className="space-y-6">
             <ShieldCheck className="w-7 h-7 text-[var(--brand-wine)] mx-auto opacity-50" />
             <h4 className="text-5xl font-black tracking-tighter text-black">24h</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Suporte Técnico</p>
           </div>
           <div className="space-y-6">
             <Cpu className="w-7 h-7 text-[var(--brand-hot)] mx-auto opacity-50" />
             <h4 className="text-5xl font-black tracking-tighter text-black">MG</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Atendimento Regional</p>
           </div>
        </div>
      </section>

      <section id="contato" className="py-20 bg-[#fafafa]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-card rounded-[4rem] p-12 md:p-20 border-fuchsia-100">
             <div className="grid grid-cols-1 gap-14">
               <div className="flex flex-col justify-center text-center">
                 <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight leading-[0.95] text-black">
                   Comece seu próximo ciclo
                   <span className="block mt-2 bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] bg-clip-text text-transparent">com agenda cheia.</span>
                 </h2>
                 <p className="text-slate-500 text-base font-light leading-relaxed mb-4 max-w-3xl mx-auto">Fale com nossa equipe no WhatsApp e receba a sugestão de equipamento ideal para o seu perfil de clínica.</p>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12">Resposta rápida, suporte técnico e operação segura em Lavras e demais regiões de Minas Gerais.</p>
                 <div className="mb-8 rounded-2xl border border-fuchsia-100 bg-white/80 p-5">
                   <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--brand-hot)]">Oferta da Semana</p>
                   <p className="mt-2 text-sm text-slate-600">Agenda de locação com vagas limitadas por rota regional. Antecipe sua reserva para não perder o próximo ciclo.</p>
                 </div>
                 <div className="flex flex-col gap-4 items-center">
                   <a href="https://www.instagram.com/minaslaserlocacoes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors"><Send className="w-5 h-5 text-[var(--brand-hot)]" /> <span>@minaslaserlocacoes</span></a>
                   <a
                      href={getDefaultWhatsAppLink(defaultWhatsappText)}
                      onClick={(e) => {
                        handleWhatsAppCtaClick(e, defaultWhatsappText, 'contato', 'falar_whatsapp_agora');
                      }}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-wine)] hover:text-[var(--brand-hot)] transition-colors"
                   >
                      <PlayCircle className="w-5 h-5 text-[var(--brand-hot)]" /> <span>Falar no WhatsApp agora</span>
                    </a>
                  </div>
                </div>
                <div className="bg-white/50 p-8 rounded-[2rem] border border-fuchsia-50 shadow-inner">
                 {formState === 'success' ? (
                   <div className="text-center py-16 animate-fadeIn">
                     <CheckCircle className="text-[var(--brand-wine)] w-16 h-16 mx-auto mb-8" />
                     <h3 className="text-2xl font-black uppercase tracking-widest mb-4 text-black">Sucesso</h3>
                     <p className="text-slate-500 text-sm">O time de especialistas entrará em contato.</p>
                   </div>
                 ) : (
                   <form className="space-y-10" onSubmit={handleFormSubmit}>
                     <input
                       required
                       value={leadForm.name}
                       onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                       className="w-full bg-transparent border-b-2 border-slate-100 py-5 outline-none focus:border-[var(--brand-wine)] transition-all text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 text-black"
                       placeholder="NOME / PROFISSIONAL"
                     />
                     <input
                       required
                       type="tel"
                       value={leadForm.whatsapp}
                       onChange={(e) => setLeadForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                       className="w-full bg-transparent border-b-2 border-slate-100 py-5 outline-none focus:border-[var(--brand-wine)] transition-all text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 text-black"
                       placeholder="WHATSAPP (35) 99999-9999"
                     />
                     {formError && <p className="text-xs font-semibold text-red-500">{formError}</p>}
                     <button type="submit" disabled={formState === 'submitting'} className="w-full py-7 bg-gradient-to-r from-black to-slate-800 text-white font-black uppercase tracking-[0.5em] text-[11px] hover:from-[var(--brand-hot)] hover:to-[var(--brand-wine)] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98]">{formState === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Quero atendimento prioritário'}</button>
                      <a
                        href={getDefaultWhatsAppLink(defaultWhatsappText)}
                        onClick={(e) => {
                          handleWhatsAppCtaClick(e, defaultWhatsappText, 'contato', 'reservar_equipamento_whatsapp');
                        }}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full py-4 mt-2 border border-fuchsia-200 text-[var(--brand-wine)] font-black uppercase tracking-[0.35em] text-[10px] text-center rounded-xl hover:bg-fuchsia-50 transition-colors block"
                     >
                        Reservar equipamento pelo WhatsApp
                      </a>
                    </form>
                  )}
               </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-white border-t border-slate-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start">
             <img src={imageUrl('Logo.png')} alt="Minas Laser Logo" className="h-16 md:h-9 object-contain" onError={(e) => { e.currentTarget.src = "https://i.ibb.co/LdfV8R9/logo-minas.png"; }} />
             <div className="w-12 h-[3px] bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] mt-4"></div>
          </div>
          <div className="text-center">
            <div className="text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400">&copy; 2026 MINAS LASER LOCAÇÕES - AS MELHORES SOLUÇÕES EM TECNOLOGIAS</div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Lavras - MG | Locação para clínicas e profissionais</div>
            <a
              href="https://www.instagram.com/miloia.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 hover:text-[var(--brand-wine)] transition-colors"
            >
              Criado por Milo IA
            </a>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="https://instagram.com/minaslaserlocacoes" className="hover:text-[var(--brand-hot)] transition-colors">IG</a>
            <a
              href={getDefaultWhatsAppLink(defaultWhatsappText)}
              onClick={(e) => {
                handleWhatsAppCtaClick(e, defaultWhatsappText, 'footer', 'wa_footer');
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--brand-wine)] transition-colors"
            >
              WA
            </a>
            <a href="#" className="hover:text-[var(--brand-hot)] transition-colors">LK</a>
          </div>
        </div>
      </footer>

      <a
        href={getDefaultWhatsAppLink(defaultWhatsappText)}
        onClick={(e) => {
          handleWhatsAppCtaClick(e, defaultWhatsappText, 'botao_fixo', 'wa_fixo_resposta_rapida');
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[120] px-5 py-3 rounded-full bg-gradient-to-r from-[var(--brand-hot)] to-[var(--brand-wine)] text-white text-[10px] font-black uppercase tracking-[0.28em] shadow-2xl shadow-fuchsia-300/40 hover:scale-[1.03] transition-transform"
        aria-label="Falar no WhatsApp"
      >
        WhatsApp | Resposta Rápida
      </a>

      {selectedEquipment && <EquipmentModal equipment={selectedEquipment} onClose={() => setSelectedEquipment(null)} />}
      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default App;
