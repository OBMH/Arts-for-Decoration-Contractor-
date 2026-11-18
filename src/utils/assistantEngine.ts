import {
  ARABIC_SYNONYMS,
  FALLBACK_MESSAGE,
  KNOWLEDGE_BASE,
  AssistantAction,
  KnowledgeBaseEntry,
  QuestionTopic,
} from '../data/knowledgeBase';
import { COMPANY_INFO, WORKING_HOURS, buildWhatsAppUrl } from '../data/companyData';

export interface AssistantResponse {
  id: string;
  topic: QuestionTopic;
  title: string;
  answer: string;
  bulletPoints?: string[];
  actions: AssistantAction[];
  confidenceScore: number;
  matchedEntryIds: string[];
}

export interface ContactFormInput {
  name: string;
  phone: string;
  service: string;
  details: string;
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: {
    name?: string;
    phone?: string;
    service?: string;
    details?: string;
  };
}

/**
 * Normalizes Arabic text for accurate matching regardless of spelling variations,
 * hamzas, tashkeel, taa marbuta, or punctuation.
 */
export function normalizeArabicText(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    // Remove Arabic diacritics (Tashkeel) and Tatweel
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    // Normalize Alef variants (أ إ آ ا -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Normalize Yaa / Alef Maqsura (ى -> ي)
    .replace(/ى/g, 'ي')
    // Normalize Waw with Hamza (ؤ -> و) and Yaa with Hamza (ئ -> ي)
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    // Remove punctuation symbols
    .replace(/[؟?!.,،؛:"'()[\]{}\-_/\\|@#$%^&*+=~`<>]/g, ' ')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips common Arabic prefixes (ال، و، ف، ب، ك، ل، هـ) for root-level token comparison.
 */
export function stripArabicPrefix(word: string): string {
  let w = word;
  if (w.length > 4 && (w.startsWith('وال') || w.startsWith('بال') || w.startsWith('كال') || w.startsWith('فال'))) {
    w = w.slice(3);
  } else if (w.length > 3 && (w.startsWith('ال') || w.startsWith('لل'))) {
    w = w.slice(2);
  } else if (w.length > 3 && (w.startsWith('و') || w.startsWith('ف') || w.startsWith('ب') || w.startsWith('ل'))) {
    w = w.slice(1);
  }
  return w;
}

/**
 * Expands normalized query tokens using the Arabic synonym & dialect dictionary.
 */
export function expandQueryTokens(normalizedQuery: string): Set<string> {
  const rawTokens = normalizedQuery.split(' ').filter(Boolean);
  const expanded = new Set<string>();

  for (const token of rawTokens) {
    expanded.add(token);
    expanded.add(stripArabicPrefix(token));
  }

  for (const [canonicalRaw, synonymsRaw] of Object.entries(ARABIC_SYNONYMS)) {
    const canonical = normalizeArabicText(canonicalRaw);
    const normalizedSynonyms = synonymsRaw.map((s) => normalizeArabicText(s));

    const matchesCanonical =
      normalizedQuery.includes(canonical) ||
      expanded.has(canonical) ||
      expanded.has(stripArabicPrefix(canonical));

    const matchesAnySynonym = normalizedSynonyms.some(
      (syn) =>
        normalizedQuery.includes(syn) ||
        expanded.has(syn) ||
        expanded.has(stripArabicPrefix(syn))
    );

    if (matchesCanonical || matchesAnySynonym) {
      expanded.add(canonical);
      expanded.add(stripArabicPrefix(canonical));
      for (const syn of normalizedSynonyms) {
        expanded.add(syn);
        for (const part of syn.split(' ')) {
          if (part) {
            expanded.add(part);
            expanded.add(stripArabicPrefix(part));
          }
        }
      }
    }
  }

  return expanded;
}

/**
 * Scores a KnowledgeBaseEntry against the normalized query and expanded token set.
 */
function scoreKnowledgeEntry(
  entry: KnowledgeBaseEntry,
  normalizedQuery: string,
  expandedTokens: Set<string>
): number {
  let score = 0;

  // 1. Exact or substring phrase match (Highest weight)
  for (const phraseRaw of entry.exactPhrases) {
    const phrase = normalizeArabicText(phraseRaw);
    if (!phrase) continue;
    if (normalizedQuery === phrase) {
      score += 45;
    } else if (normalizedQuery.includes(phrase)) {
      score += 30;
    }
  }

  // 2. Primary keywords match (High weight)
  let primaryMatches = 0;
  for (const kwRaw of entry.primaryKeywords) {
    const kw = normalizeArabicText(kwRaw);
    const kwStripped = stripArabicPrefix(kw);
    if (!kw) continue;

    if (normalizedQuery.includes(kw)) {
      score += 18;
      primaryMatches++;
    } else if (expandedTokens.has(kw) || expandedTokens.has(kwStripped)) {
      score += 12;
      primaryMatches++;
    }
  }

  // 3. Secondary keywords match (Contextual weight)
  for (const secRaw of entry.secondaryKeywords) {
    const sec = normalizeArabicText(secRaw);
    const secStripped = stripArabicPrefix(sec);
    if (!sec) continue;

    if (normalizedQuery.includes(sec) || expandedTokens.has(sec) || expandedTokens.has(secStripped)) {
      score += primaryMatches > 0 ? 6 : 2;
    }
  }

  // 4. Priority tie-breaker multiplier when there is a meaningful match
  if (score >= 12) {
    score += entry.priority * 0.5;
  }

  return score;
}

/**
 * Analyzes an Arabic user question locally and returns the best structured answer
 * from the Funun Decor Knowledge Base without any external API calls.
 */
export function analyzeAndAnswerQuestion(userQuestion: string): AssistantResponse {
  const normalizedQuery = normalizeArabicText(userQuestion);

  if (!normalizedQuery) {
    return {
      id: 'fallback-empty',
      topic: 'fallback',
      title: 'فنون للديكور والمقاولات',
      answer: FALLBACK_MESSAGE,
      actions: [
        { type: 'whatsapp', label: 'تواصل عبر واتساب', url: buildWhatsAppUrl() },
        { type: 'call_primary', label: 'اتصال: 0554058937', url: 'tel:+966554058937' },
      ],
      confidenceScore: 0,
      matchedEntryIds: [],
    };
  }

  const expandedTokens = expandQueryTokens(normalizedQuery);

  const scoredEntries = KNOWLEDGE_BASE.map((entry) => ({
    entry,
    score: scoreKnowledgeEntry(entry, normalizedQuery, expandedTokens),
  })).sort((a, b) => b.score - a.score);

  const best = scoredEntries[0];
  const secondBest = scoredEntries[1];

  // Minimum confidence threshold to avoid false positives on unrelated questions
  if (!best || best.score < 12) {
    return {
      id: 'kb-fallback',
      topic: 'fallback',
      title: 'تواصل مباشر مع فريق فنون',
      answer: FALLBACK_MESSAGE,
      bulletPoints: [
        'الرقم الرسمي والواتساب: 0554058937',
        'الرقم الرسمي الثاني: 0535159041',
        'الموقع: السعودية، جيزان، مدينة البناء',
      ],
      actions: [
        { type: 'whatsapp', label: 'تواصل عبر واتساب الآن', url: buildWhatsAppUrl() },
        { type: 'call_primary', label: 'اتصال: 0554058937', url: 'tel:+966554058937' },
        { type: 'maps', label: 'موقعنا على خرائط Google', url: COMPANY_INFO.googleMapsUrl },
      ],
      confidenceScore: best ? best.score : 0,
      matchedEntryIds: [],
    };
  }

  // If the user asked a genuine compound question (two distinct topics with close high scores,
  // and the query is not an exact match for a single entry), merge their key information cleanly.
  const isExactSingleMatch = best.entry.exactPhrases.some(
    (p) => normalizeArabicText(p) === normalizedQuery
  );

  if (
    !isExactSingleMatch &&
    secondBest &&
    secondBest.score >= 28 &&
    secondBest.score >= best.score * 0.75 &&
    secondBest.entry.id !== best.entry.id &&
    best.entry.topic !== 'greeting' &&
    secondBest.entry.topic !== 'greeting'
  ) {
    const combinedBullets = [
      ...(best.entry.bulletPoints || []),
      ...(secondBest.entry.bulletPoints || []),
    ].slice(0, 8);

    // Deduplicate actions by type + label
    const actionMap = new Map<string, AssistantAction>();
    for (const act of [...best.entry.actions, ...secondBest.entry.actions]) {
      const key = `${act.type}-${act.label}`;
      if (!actionMap.has(key)) {
        actionMap.set(key, act);
      }
    }

    return {
      id: `${best.entry.id}+${secondBest.entry.id}`,
      topic: best.entry.topic,
      title: `${best.entry.title} • ${secondBest.entry.title}`,
      answer: `${best.entry.answer}\n\n${secondBest.entry.answer}`,
      bulletPoints: combinedBullets.length > 0 ? combinedBullets : undefined,
      actions: Array.from(actionMap.values()).slice(0, 4),
      confidenceScore: best.score,
      matchedEntryIds: [best.entry.id, secondBest.entry.id],
    };
  }

  return {
    id: best.entry.id,
    topic: best.entry.topic,
    title: best.entry.title,
    answer: best.entry.answer,
    bulletPoints: best.entry.bulletPoints,
    actions: best.entry.actions,
    confidenceScore: best.score,
    matchedEntryIds: [best.entry.id],
  };
}

/**
 * Validates the Contact / Service Request Form before redirecting to WhatsApp.
 */
export function validateContactForm(input: ContactFormInput): ContactFormValidation {
  const errors: ContactFormValidation['errors'] = {};
  const trimmedName = input.name.trim();
  const trimmedPhone = input.phone.replace(/\s+/g, '').trim();
  const trimmedService = input.service.trim();
  const trimmedDetails = input.details.trim();

  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'يرجى إدخال الاسم الكريم (حرفين على الأقل).';
  }

  const phoneRegex = /^(\+?966|0)?5\d{8}$|^\+?\d{8,15}$/;
  if (!trimmedPhone) {
    errors.phone = 'يرجى إدخال رقم الهاتف للتواصل.';
  } else if (!phoneRegex.test(trimmedPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف صحيح (مثال: 0554058937).';
  }

  if (!trimmedService) {
    errors.service = 'يرجى اختيار نوع الخدمة المطلوبة.';
  }

  if (!trimmedDetails || trimmedDetails.length < 5) {
    errors.details = 'يرجى كتابة نبذة مختصرة عن تفاصيل الطلب أو المساحة.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a validated Contact Form submission into a ready-to-send WhatsApp message URL.
 */
export function formatContactWhatsAppMessage(input: ContactFormInput): {
  messageText: string;
  whatsappUrl: string;
} {
  const lines = [
    'مرحباً فنون للديكور والمقاولات،',
    'أرغب بطلب استشارة / خدمة ديكور بالتفاصيل التالية:',
    `• الاسم: ${input.name.trim()}`,
    `• رقم الهاتف: ${input.phone.trim()}`,
    `• الخدمة المطلوبة: ${input.service.trim()}`,
    `• تفاصيل الطلب: ${input.details.trim()}`,
  ];
  const messageText = lines.join('\n');
  return {
    messageText,
    whatsappUrl: buildWhatsAppUrl(messageText),
  };
}

/**
 * Returns information about today's working schedule in Saudi Arabia time.
 */
export function getTodayScheduleInfo(now: Date = new Date()): {
  todayName: string;
  todayHours: string;
  isOpenNow: boolean;
  statusLabel: string;
} {
  // Convert to Riyadh time (UTC+3)
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const riyadhDate = new Date(utcMs + 3 * 3600000);
  const dayIndex = riyadhDate.getDay(); // 0 = Sunday ... 6 = Saturday
  const currentMinutes = riyadhDate.getHours() * 60 + riyadhDate.getMinutes();

  const matchingDay =
    WORKING_HOURS.find((d) => d.dayIndex === dayIndex) || WORKING_HOURS[0];

  const [startH, startM] = matchingDay.open24hFormat.start.split(':').map(Number);
  const [endH, endM] = matchingDay.open24hFormat.end.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const isOpenNow = currentMinutes >= startMinutes && currentMinutes <= endMinutes;

  return {
    todayName: matchingDay.day,
    todayHours: matchingDay.hours,
    isOpenNow,
    statusLabel: isOpenNow ? 'مفتوح الآن لاستقبالكم' : 'خارج أوقات الدوام الرسمي حالياً',
  };
}
