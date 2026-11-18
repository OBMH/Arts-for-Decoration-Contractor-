import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeAndAnswerQuestion,
  normalizeArabicText,
  validateContactForm,
  formatContactWhatsAppMessage,
} from './assistantEngine';
import { FALLBACK_MESSAGE } from '../data/knowledgeBase';
import { COMPANY_INFO, SERVICES, PORTFOLIO_ITEMS, WORKING_HOURS } from '../data/companyData';

test('Arabic normalization handles hamzas, taa marbuta, yaa, and punctuation', () => {
  assert.equal(normalizeArabicText('أينَ مَوْقِعُكُمْ في جيزان؟!'), 'اين موقعكم في جيزان');
  assert.equal(normalizeArabicText('خزائنُ ملابسٍ مُبتكرة'), 'خزاين ملابس مبتكره');
});

test('Local Assistant answers all 12 mandatory prompt questions accurately', () => {
  // 1. ما الخدمات التي تقدمونها؟
  const q1 = analyzeAndAnswerQuestion('ما الخدمات التي تقدمونها؟');
  assert.equal(q1.topic, 'services_all');
  assert.ok(q1.bulletPoints && q1.bulletPoints.length === 7);

  // 2. هل تعملون ديكورات للمحلات؟
  const q2 = analyzeAndAnswerQuestion('هل تعملون ديكورات للمحلات؟');
  assert.equal(q2.topic, 'service_commercial');
  assert.ok(q2.answer.includes('ديكور محلات تجارية'));

  // 3. أريد تصميم غرفة نوم.
  const q3 = analyzeAndAnswerQuestion('أريد تصميم غرفة نوم.');
  assert.equal(q3.topic, 'service_bedrooms');
  assert.ok(q3.answer.includes('غرف النوم'));

  // 4. هل تنفذون خزائن ملابس؟
  const q4 = analyzeAndAnswerQuestion('هل تنفذون خزائن ملابس؟');
  assert.equal(q4.topic, 'service_wardrobes');
  assert.ok(q4.answer.includes('الخزائن المبتكرة'));

  // 5. وين موقعكم؟
  const q5 = analyzeAndAnswerQuestion('وين موقعكم؟');
  assert.equal(q5.topic, 'location');
  assert.ok(q5.answer.includes('جيزان، مدينة البناء'));
  assert.ok(q5.actions.some((a) => a.type === 'maps' && a.url === COMPANY_INFO.googleMapsUrl));

  // 6. متى تفتحون؟
  const q6 = analyzeAndAnswerQuestion('متى تفتحون؟');
  assert.equal(q6.topic, 'working_hours');
  assert.ok(q6.bulletPoints && q6.bulletPoints.length === 7);

  // 7. هل تعملون يوم الجمعة؟
  const q7 = analyzeAndAnswerQuestion('هل تعملون يوم الجمعة؟');
  assert.equal(q7.topic, 'friday_hours');
  assert.ok(q7.answer.includes('4:30 مساءً – 10:30 مساءً'));

  // 8. كيف أتواصل معكم؟
  const q8 = analyzeAndAnswerQuestion('كيف أتواصل معكم؟');
  assert.equal(q8.topic, 'contact_numbers');
  assert.ok(q8.actions.some((a) => a.type === 'whatsapp'));
  assert.ok(q8.actions.some((a) => a.type === 'call_primary'));

  // 9. عندكم واتساب؟
  const q9 = analyzeAndAnswerQuestion('عندكم واتساب؟');
  assert.equal(q9.topic, 'whatsapp');
  assert.ok(q9.answer.includes('0554058937'));

  // 10. أريد أشوف أعمالكم.
  const q10 = analyzeAndAnswerQuestion('أريد أشوف أعمالكم.');
  assert.equal(q10.topic, 'portfolio');
  assert.ok(q10.actions.some((a) => a.type === 'navigate_portfolio'));

  // 11. ما رقم الهاتف؟
  const q11 = analyzeAndAnswerQuestion('ما رقم الهاتف؟');
  assert.equal(q11.topic, 'contact_numbers');
  assert.ok(q11.bulletPoints?.some((b) => b.includes('0554058937')));
  assert.ok(q11.bulletPoints?.some((b) => b.includes('0535159041')));

  // 12. هل تعملون أسقف جبسية؟
  const q12 = analyzeAndAnswerQuestion('هل تعملون أسقف جبسية؟');
  assert.equal(q12.topic, 'service_gypsum');
  assert.ok(q12.answer.includes('الأسقف الجبسية'));
});

test('Local Assistant handles colloquial phrases, pricing rule, and unknown fallback', () => {
  // Pricing rule: never invent prices, explain it depends on work type & requirements
  const priceQ = analyzeAndAnswerQuestion('بكم المتر للشاشات الجدارية وكم الاسعار؟');
  assert.ok(priceQ.answer.includes('يعتمد السعر على نوع العمل ومتطلباته'));

  // Unrelated question returns exact required fallback message
  const unknownQ = analyzeAndAnswerQuestion('هل تبيعون سيارات كهربائية في الرياض؟');
  assert.equal(unknownQ.topic, 'fallback');
  assert.equal(unknownQ.answer, FALLBACK_MESSAGE);
});

test('Contact form validation rejects empty/invalid inputs and formats WhatsApp URL on valid input', () => {
  const invalid = validateContactForm({
    name: '',
    phone: '123',
    service: '',
    details: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.service);
  assert.ok(invalid.errors.details);

  const validInput = {
    name: 'أحمد المالكي',
    phone: '0554058937',
    service: 'الشاشات الجدارية',
    details: 'أرغب في تصميم وتنفيذ شاشة جدارية لصالة معيشة بطول 4 أمتار.',
  };
  const valid = validateContactForm(validInput);
  assert.equal(valid.isValid, true);

  const formatted = formatContactWhatsAppMessage(validInput);
  assert.ok(formatted.whatsappUrl.startsWith('https://wa.me/966554058937?text='));
  assert.ok(formatted.messageText.includes('أحمد المالكي'));
  assert.ok(formatted.messageText.includes('الشاشات الجدارية'));
});

test('Company data integrity: 7 services, 29 portfolio items, 7 working days', () => {
  assert.equal(SERVICES.length, 7);
  assert.equal(PORTFOLIO_ITEMS.length, 29);
  assert.equal(WORKING_HOURS.length, 7);

  // Verify no duplicate service descriptions
  const descriptions = new Set(SERVICES.map((s) => s.shortDesc));
  assert.equal(descriptions.size, 7);

  // Verify every portfolio item uses an authentic local uploaded asset
  for (const item of PORTFOLIO_ITEMS) {
    assert.ok(item.image.startsWith('/assets/aistudio/IMG-20261118-WA'));
  }
});
