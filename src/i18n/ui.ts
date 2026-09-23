export const languages = { en: 'English', zh: '中文' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Read the locale from the path, falling back to the default. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg in languages ? (seg as Lang) : defaultLang;
}

/**
 * Switching language stays on the same page: swap only the locale segment.
 * /zh/work -> /en/work, rather than bouncing back to the homepage.
 */
export function switchLangPath(url: URL, to: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length && parts[0] in languages) parts[0] = to;
  else parts.unshift(to);
  return '/' + parts.join('/') + '/';
}

/* ────────────────────────────────────────────────────────────
   Apart from the name, every string below is a PLACEHOLDER awaiting real copy.
   They are written as "[ TODO — ... ]" / "【待填：…】" so they can never be
   mistaken for finished content.
   2026-09-22: an earlier draft invented a research background that turned out
   to be wrong. It has been removed rather than rewritten into another guess.
   ──────────────────────────────────────────────────────────── */

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.research': 'Work',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.name': 'Bohan Zhang',
    'hero.role': '[ TODO — field · focus ]',
    'hero.tagline':
      '[ TODO — one sentence: what you do, and why someone should keep reading. Aim for 15–25 words. ]',
    'hero.cta': 'See the work',

    'about.title': 'About',
    'about.body':
      '[ TODO — About, 3–5 sentences. Who you are, what you are studying or building, and what you want a visitor to take away. Written in first person. ]',

    'research.title': 'Work',
    'research.body':
      '[ TODO — What you are working on. If academic: the question and the approach. If applied: the problem and what you built. 2–4 sentences. ]',
    'research.pubs': 'Publications',
    'research.pubsNote': '[ TODO — list, or delete this block if not applicable. ]',

    'projects.title': 'Projects',
    'projects.body': '[ TODO — one line framing the projects below. ]',

    'contact.title': 'Contact',
    'contact.body': 'Best reached by email.',
    'footer.built': 'Built with Astro. No trackers, no cookies.',
  },

  zh: {
    'nav.about': '关于',
    'nav.research': '在做什么',
    'nav.projects': '项目',
    'nav.contact': '联系',

    'hero.name': '张伯晗',
    'hero.role': '【待填：领域 · 方向】',
    'hero.tagline': '【待填：一句话——你在做什么，以及为什么值得继续读下去。15～25 字为宜。】',
    'hero.cta': '看看',

    'about.title': '关于',
    'about.body':
      '【待填：关于，3～5 句。你是谁、在学什么或做什么、希望访客记住什么。第一人称。】',

    'research.title': '在做什么',
    'research.body':
      '【待填：正在做的事。若偏学术：问题与方法；若偏应用：解决什么问题、做出了什么。2～4 句。】',
    'research.pubs': '论文',
    'research.pubsNote': '【待填：列表；若不适用可整块删掉。】',

    'projects.title': '项目',
    'projects.body': '【待填：一句话引出下面的项目。】',

    'contact.title': '联系',
    'contact.body': '邮件最快。',
    'footer.built': '用 Astro 构建。无追踪、无 cookie。',
  },
} as const;

/* Project cards. Entries marked `real: true` describe things that actually exist;
   whether they belong on a personal homepage is the owner's call — delete freely. */
export const projects = {
  en: [
    { real: true, title: 'Autonomous agent fleet',
      body: 'A self-hosted set of agents on my own server: background job supervision, delegation between models, and a subtitle pipeline that has processed a full season of recordings end to end.' },
    { real: true, title: 'reformed-reading',
      body: 'A static library publishing Chinese translations of public-domain classics. Text-first, no accounts, no paywall.' },
    { real: false, title: '[ TODO — third project ]',
      body: '[ TODO — one or two sentences. Delete this card if you only want two. ]' },
  ],
  zh: [
    { real: true, title: '自主 agent 体系',
      body: '跑在自己服务器上的一组 agent：后台任务托管、跨模型委托，以及一条字幕流水线——已端到端处理完整季的录像。' },
    { real: true, title: '硬核读书',
      body: '一个静态书库，出版公有领域经典的中文译本。以文本为先，无账号、无付费墙。' },
    { real: false, title: '【待填：第三个项目】',
      body: '【待填：一两句话。只想放两个的话，把这张卡删掉即可。】' },
  ],
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.en as Record<string, string>)[key];
  };
}
