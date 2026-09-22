export const languages = { en: 'English', zh: '中文' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** 从路径里取语言；取不到就用默认语言 */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg in languages ? (seg as Lang) : defaultLang;
}

/**
 * 切换语言时【停在同一页】——把路径里的语言段换掉，其余保持不变。
 * /zh/research → /en/research，而不是弹回首页。
 */
export function switchLangPath(url: URL, to: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length && parts[0] in languages) parts[0] = to;
  else parts.unshift(to);
  return '/' + parts.join('/') + '/';
}

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.name': 'Bohan Zhang',
    'hero.role': 'Immunology · Computational Biology',
    'hero.tagline':
      'Studying how the tumour microenvironment reshapes immune cells — and building the tools to see it.',
    'hero.cta': 'Read the research',
    'about.title': 'About',
    'about.body':
      'I work at the intersection of immunology and computation, focusing on how macrophages are reprogrammed inside glioblastoma. Alongside the wet lab, I build the infrastructure my own work runs on — spatial multi-omics pipelines, and a small fleet of autonomous agents that keep the rest of it moving.',
    'research.title': 'Research',
    'research.body':
      'Current work is a two-phase design: observational spatial multi-omics on patient tissue first, then organoid CRISPR screens for identification. The aim is to separate what is merely correlated in human tumours from what is actually causal.',
    'research.pubs': 'Publications',
    'research.pubsNote': 'Coming soon.',
    'projects.title': 'Projects',
    'projects.body': 'Things I have built and still run.',
    'contact.title': 'Contact',
    'contact.body': 'Best reached by email.',
    'footer.built': 'Built with Astro. No trackers, no cookies.',
  },
  zh: {
    'nav.about': '关于',
    'nav.research': '研究',
    'nav.projects': '项目',
    'nav.contact': '联系',
    'hero.name': '张伯晗',
    'hero.role': '免疫学 · 计算生物学',
    'hero.tagline': '研究肿瘤微环境如何重塑免疫细胞——以及，造出能看见它的工具。',
    'hero.cta': '看研究',
    'about.title': '关于',
    'about.body':
      '我的工作在免疫学与计算的交叉处，主要研究胶质母细胞瘤中巨噬细胞如何被重编程。除了湿实验，我也在搭自己研究所依赖的基础设施——空间多组学流程，以及一小队替我干活的自主 agent。',
    'research.title': '研究',
    'research.body':
      '目前是两阶段设计：先在病人组织上做观察性空间多组学，再用类器官 CRISPR 筛做因果识别。目的是把人体肿瘤里「仅仅相关」的东西，和「真正致因」的东西分开。',
    'research.pubs': '论文',
    'research.pubsNote': '即将补充。',
    'projects.title': '项目',
    'projects.body': '做过、并且还在跑着的东西。',
    'contact.title': '联系',
    'contact.body': '邮件最快。',
    'footer.built': '用 Astro 构建。无追踪、无 cookie。',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.en as Record<string, string>)[key];
  };
}
