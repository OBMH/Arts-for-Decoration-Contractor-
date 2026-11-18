import React, { useState } from 'react';
import {
  Clock,
  Phone,
  MapPin,
  MessageCircle,
  ExternalLink,
  Send,
  AlertCircle,
  CheckCircle2,
  Instagram,
  Share2,
} from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES,
  WORKING_HOURS,
  buildWhatsAppUrl,
} from '../data/companyData';
import {
  validateContactForm,
  formatContactWhatsAppMessage,
  getTodayScheduleInfo,
  ContactFormInput,
  ContactFormValidation,
} from '../utils/assistantEngine';

export const WorkingHoursAndContact: React.FC = () => {
  const todayInfo = getTodayScheduleInfo();

  const [formInput, setFormInput] = useState<ContactFormInput>({
    name: '',
    phone: '',
    service: SERVICES[0].title,
    details: '',
  });
  const [errors, setErrors] = useState<ContactFormValidation['errors']>({});
  const [preparedWhatsApp, setPreparedWhatsApp] = useState<{
    messageText: string;
    whatsappUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formInput);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setPreparedWhatsApp(null);
      return;
    }

    setErrors({});
    const formatted = formatContactWhatsAppMessage(formInput);
    setPreparedWhatsApp(formatted);
  };

  return (
    <>
      {/* Dedicated Independent Section: أوقات العمل (Mandatory Requirement #3) */}
      <section
        id="working-hours"
        aria-labelledby="working-hours-heading"
        className="py-20 sm:py-24 bg-[#F3EEE6] text-[#111111] border-b border-[#795B43]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Right Info Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
                <span>06. مواعيد الزيارة والدوام</span>
                <span aria-hidden="true">·</span>
                <span>جيزان – مدينة البناء</span>
              </div>

              <h2
                id="working-hours-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              >
                أوقات العمل
              </h2>

              <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed">
                نسعد باستقبالكم في مقر شركة فنون للديكور والمقاولات في جيزان – مدينة البناء والرد على كافة استفساراتكم الهاتفية وعبر واتساب خلال أوقات الدوام الرسمية المعتمدة.
              </p>

              {/* Current Day Schedule Summary Card */}
              <div className="p-5 rounded-2xl bg-[#111111] text-white border border-[#795B43]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F5A000]">
                    <Clock className="w-4 h-4" />
                    <span>مواعيد اليوم ({todayInfo.todayName})</span>
                  </div>
                  <span className="text-xs text-[#F3EEE6]/85">
                    {todayInfo.statusLabel}
                  </span>
                </div>

                <div className="font-display text-lg font-bold text-white tabular-nums">
                  {todayInfo.todayHours}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#F3EEE6]/80">
                  <span>📍 {COMPANY_INFO.locationText}</span>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5A000] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>فتح الخريطة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Left Column: Complete 7-Day Schedule Table */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#795B43]/25 overflow-hidden shadow-sm">
              <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
                <span className="font-display font-bold text-base">
                  جدول أوقات الدوام الرسمي الأسبوعي
                </span>
                <span className="text-xs text-[#F5A000] font-medium">
                  بتوقيت المملكة العربية السعودية
                </span>
              </div>

              <div className="divide-y divide-[#795B43]/15">
                {WORKING_HOURS.map((item) => {
                  const isToday = item.day === todayInfo.todayName;
                  return (
                    <div
                      key={item.day}
                      className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                        isToday ? 'bg-[#F5A000]/10' : 'hover:bg-[#F3EEE6]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-display text-base ${
                            isToday
                              ? 'font-bold text-[#111111]'
                              : 'font-medium text-[#111111]/85'
                          }`}
                        >
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="text-xs font-bold text-[#795B43]">
                            (اليوم)
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-sm sm:text-base tabular-nums ${
                          item.isFriday
                            ? 'font-bold text-[#795B43]'
                            : 'font-medium text-[#111111]'
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Contact Us (قسم تواصل معنا المتكامل) */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-20 sm:py-28 bg-white text-[#111111] border-b border-[#795B43]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-2xl mb-14">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
              <span>07. قنوات التواصل الرسمية</span>
              <span aria-hidden="true">·</span>
              <span>نحن بالقرب منك</span>
            </div>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              تواصل معنا في فنون للديكور والمقاولات
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/75 leading-relaxed">
              تواصل معنا مباشرة عبر الاتصال الهاتفي أو واتساب أو الحسابات الرسمية، أو أرسل تفاصيل طلبك عبر النموذج ليتم تجهيز رسالتك وتوجيهها مباشرة إلى فريقنا.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Right Column: Direct Contact Channels, Map, Socials & Compact Working Hours */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Phone Numbers */}
              <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#795B43]/25 space-y-4">
                <h3 className="font-display font-bold text-lg text-[#111111] flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#F5A000]" />
                  <span>أرقام الاتصال المباشر</span>
                </h3>

                <div className="space-y-3">
                  {COMPANY_INFO.phones.map((phone, idx) => (
                    <a
                      key={phone.display}
                      href={phone.telLink}
                      className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#795B43]/20 hover:border-[#F5A000] transition-colors group"
                    >
                      <div>
                        <p className="text-xs text-[#795B43] font-medium">
                          {idx === 0 ? 'رقم الاتصال الأول (والواتساب)' : 'رقم الاتصال الثاني'}
                        </p>
                        <p
                          dir="ltr"
                          className="font-display text-lg font-bold text-[#111111] group-hover:text-[#795B43] tabular-nums mt-0.5 text-right"
                        >
                          {phone.display}
                        </p>
                      </div>
                      <span className="px-3.5 py-2 rounded-lg bg-[#111111] group-hover:bg-[#F5A000] text-white group-hover:text-[#111111] text-xs font-bold transition-colors whitespace-nowrap">
                        اتصل الآن
                      </span>
                    </a>
                  ))}
                </div>

                {/* Direct WhatsApp Button */}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 rounded-xl bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] font-display font-bold text-base flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل مباشر عبر واتساب ({COMPANY_INFO.whatsappNumber})</span>
                </a>
              </div>

              {/* Location & Google Maps Card */}
              <div className="p-6 rounded-2xl bg-[#111111] text-white border border-[#795B43]/30 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#F5A000]">الموقع الجغرافي</p>
                    <h3 className="font-display text-lg font-bold mt-1">
                      📍 {COMPANY_INFO.locationText}
                    </h3>
                  </div>
                  <MapPin className="w-6 h-6 text-[#F5A000] shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-[#F3EEE6]/80 leading-relaxed">
                  تفضل بزيارتنا في مقر الشركة بمدينة البناء في جيزان للاطلاع على الخامات ومناقشة تفاصيل مشروعك مباشرة.
                </p>

                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>فتح موقع الشركة على خرائط Google</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Official Social Media Accounts */}
              <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#795B43]/25 space-y-4">
                <h3 className="font-display font-bold text-base text-[#111111]">
                  الحسابات الرسمية على شبكات التواصل
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#795B43]/20 hover:border-[#F5A000] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-5 h-5 text-[#795B43]" />
                      <div>
                        <p className="text-xs font-bold text-[#111111]">Instagram</p>
                        <p className="text-[11px] text-[#795B43]" dir="ltr">
                          {COMPANY_INFO.instagramHandle}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#795B43]" />
                  </a>

                  <a
                    href={COMPANY_INFO.snapchatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#795B43]/20 hover:border-[#F5A000] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Share2 className="w-5 h-5 text-[#F5A000]" />
                      <div>
                        <p className="text-xs font-bold text-[#111111]">Snapchat</p>
                        <p className="text-[11px] text-[#795B43]" dir="ltr">
                          {COMPANY_INFO.snapchatHandle}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#795B43]" />
                  </a>
                </div>
              </div>

              {/* Working Hours inside Contact Section (Mandatory Requirement #3 & #11) */}
              <div className="p-6 rounded-2xl bg-[#F3EEE6] border border-[#795B43]/25 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#111111] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#795B43]" />
                    <span>أوقات العمل الأسبوعية</span>
                  </h3>
                  <span className="text-xs text-[#795B43] font-medium">دوام رسمي</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {WORKING_HOURS.map((w) => (
                    <li
                      key={`contact-hours-${w.day}`}
                      className="flex items-center justify-between py-1 border-b border-[#795B43]/10 last:border-0"
                    >
                      <span className="font-medium text-[#111111]">{w.day}</span>
                      <span className="tabular-nums text-[#111111]/80">{w.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Left Column: Validated WhatsApp-Directed Contact Form */}
            <div className="lg:col-span-7 bg-[#F3EEE6] rounded-2xl border border-[#795B43]/25 p-6 sm:p-8 lg:p-10">
              <div className="space-y-2 mb-6">
                <h3 className="font-display text-2xl font-bold text-[#111111]">
                  نموذج طلب خدمة أو استشارة
                </h3>
                <p className="text-sm text-[#111111]/75 leading-relaxed">
                  أدخل بياناتك وتفاصيل المساحة المطلوبة، وسيقوم النظام بتجهيز رسالتك وتوجيهك مباشرة إلى واتساب الشركة الرسمي (+966554058937) لمتابعة طلبك فوراً.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Field 1: Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-bold text-[#111111] mb-1.5"
                  >
                    الاسم الكريم <span className="text-[#795B43]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formInput.name}
                    onChange={(e) => {
                      setFormInput({ ...formInput, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="مثال: محمد العتيبي"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-[#111111] text-sm focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#795B43]/30 focus:border-[#F5A000]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-bold text-[#111111] mb-1.5"
                  >
                    رقم الهاتف <span className="text-[#795B43]">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    value={formInput.phone}
                    onChange={(e) => {
                      setFormInput({ ...formInput, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="05XXXXXXXX"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-[#111111] text-sm text-right tabular-nums focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#795B43]/30 focus:border-[#F5A000]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Field 3: Service Type */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-sm font-bold text-[#111111] mb-1.5"
                  >
                    نوع الخدمة المطلوبة <span className="text-[#795B43]">*</span>
                  </label>
                  <select
                    id="contact-service"
                    value={formInput.service}
                    onChange={(e) => {
                      setFormInput({ ...formInput, service: e.target.value });
                      if (errors.service) setErrors({ ...errors, service: undefined });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#795B43]/30 focus:border-[#F5A000] text-[#111111] text-sm focus:outline-none transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="استشارة شاملة لأكثر من خدمة">
                      استشارة شاملة لأكثر من خدمة
                    </option>
                  </select>
                </div>

                {/* Field 4: Request Details */}
                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-sm font-bold text-[#111111] mb-1.5"
                  >
                    تفاصيل الطلب <span className="text-[#795B43]">*</span>
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    value={formInput.details}
                    onChange={(e) => {
                      setFormInput({ ...formInput, details: e.target.value });
                      if (errors.details) setErrors({ ...errors, details: undefined });
                    }}
                    placeholder="اكتب نبذة عن المساحة، الموقع، أو التصميم المطلوب..."
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-[#111111] text-sm focus:outline-none transition-colors ${
                      errors.details
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#795B43]/30 focus:border-[#F5A000]'
                    }`}
                  />
                  {errors.details && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.details}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#111111] hover:bg-[#F5A000] text-white hover:text-[#111111] font-display font-bold text-base flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-5 h-5" />
                  <span>تجهيز الطلب والمتابعة عبر واتساب</span>
                </button>
              </form>

              {/* Prepared WhatsApp Handoff Panel (Appears after validation) */}
              {preparedWhatsApp && (
                <div
                  role="region"
                  aria-label="جاهزية إرسال الطلب عبر واتساب"
                  className="mt-6 p-5 rounded-2xl bg-[#111111] text-white border border-[#F5A000] space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A000] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-base text-[#F5A000]">
                        تم التحقق من البيانات وتجهيز رسالة طلبك
                      </h4>
                      <p className="text-xs sm:text-sm text-[#F3EEE6]/85 mt-1">
                        اضغط على الزر أدناه لفتح محادثة واتساب الرسمية مع شركة فنون للديكور والمقاولات وإرسال تفاصيل طلبك مباشرة:
                      </p>
                    </div>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#F3EEE6] whitespace-pre-wrap font-sans leading-relaxed">
                    {preparedWhatsApp.messageText}
                  </pre>

                  <a
                    href={preparedWhatsApp.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>إرسال الطلب الآن عبر واتساب (+966554058937)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
