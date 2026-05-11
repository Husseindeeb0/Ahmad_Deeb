import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineEntry {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: "١٩٧٧",
    title: "ميلاد النور",
    description:
      "في أول ليلةٍ من شباط عام ١٩٧٧، أزهر الربيع قبل أوانه في منزل أبي سليمان، حاملاً رونقًا ودفئًا خاصَّين، مع مولودٍ حمل اسم أحمد، الذي أصبح بعد تسعةٍ وأربعين عامًا فخرًا وعزًّا لهذه العائلة الكريمة.",
    image: "/images/image7.jpeg",
    imagePosition: "object-top",
  },
  {
    id: 2,
    year: "٢٠٠٦",
    title: "نهج البصيرة",
    description:
      "بعد حرب تموز عام ٢٠٠٦، التحق السعيد بخطِّ الحق والبصيرة، ليحمل اسم رفاقه السعداء ممن سبقوه، مُلزِمًا نفسه بحفظ نهج آل البيت عليهم السلام وأداء التكليف.",
    image: "/images/image2.jpeg",
    imagePosition: "object-top",
  },
  {
    id: 3,
    year: "٢٠١٣",
    title: "الدفاع عن المقدسات",
    description:
      "عام ٢٠١٣، حين برز الشر في أقصى الشمال، صدر تكليف الأمين بضرورة نصرة المظلومين في سوريا في وجه أعداء الدين ومرتزقة الغرب، وكان الشهيد ممن لبّوا الواجب في تلك المحنة؛ من ريف حلب إلى كفريا والفوعة، ومن أرض السيدة زينب عليها السلام إلى القصير، تحت شعار: لن تُسبى زينب مرتين. وخلال هذه المرحلة، تعرّض لإصابة في فقرات ظهره، إلا أنّها لم تمنعه من متابعة المسيرة.",
    image: "/images/image6.jpeg",
    imagePosition: "object-top",
  },
  {
    id: 4,
    year: "٢٠٢٣",
    title: "معركة الإسناد",
    description:
      "في ٨ تشرين الأول عام ٢٠٢٣، بدأت معركة الإسناد دعمًا للفصائل الفلسطينية في مواجهة العدو الإسرائيلي، فبرزت المقاومة حاملةً لواء الشرف والكرامة، وقدّمت خيرة شبابها على الحدود. وكان للشهيد أحمد بصمة واضحة في بلدة حولا الحدودية، حيث ظلّ خادمًا للمسيرة دون توقف، متعرّضًا خلالها لغارتين أثّرتا في رأسه خلال فترتين، استدعت إحداهما نقله إلى المستشفى. وقد فقد السعيد أعزّ أصحابه خلال هذه الحرب",
    image: "/images/image11.jpeg",
    imagePosition: "object-top",
  },
  {
    id: 5,
    year: "٢٠٢٦",
    title: "الالتحاق بالملكوت",
    description:
      'عندما عادت وتيرة الحرب أخذًا وردًّا في أوائل عام ٢٠٢٦، بدأ العدّ العكسي عند الشهيد السعيد، مودّعًا عائلته بوجهٍ بشوش، تختلط فيه لمحة غضبٍ بإحساس المسؤولية، مشاركًا وصاياه مع أهله، ومذكّرًا إيّاهم ببلاءات السيدة زينب عليها السلام في كربلاء.مضى السعيد نحو مكان تكليفه في بلدة فرون الجنوبية، ملتحقًا بركب المجاهدين، حاملًا سلاحه في وجه العدو، مناديًا كما نادى سيده الحسين عليه السلام: "ألا وإنّ الدعيَّ ابن الدعيِّ قد ركز بين اثنتين؛ بين السلة والذلة، وهيهات منّا الذلة".حتى نزل إليه أمير المؤمنين عليه السلام في التاسع عشر من رمضان، الموافق لـ٩ آذار ٢٠٢٦، آخذًا بروحه إلى جوار محمدٍ وآله الأطهار، بعد غارة إسرائيلية استهدفت المنزل الذي كان قائمًا فيه، يدعو ربَّه حسن الخاتمة.',
    image: "/images/image.jpeg",
    imagePosition: "object-top",
  },
];

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative py-16 md:py-24">
      {/* Year marker — centered on the timeline line */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center mb-12"
      >
        <div className="relative">
          {/* Glowing dot */}
          <div className="absolute -inset-3 bg-memorial-yellow/20 rounded-full blur-xl" />
          <div className="relative bg-memorial-dark border border-memorial-yellow/40 rounded-full px-8 py-3 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <span className="text-memorial-yellow font-amiri text-2xl md:text-3xl">
              {entry.year}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content layout — alternating sides */}
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16 max-w-6xl mx-auto px-6`}
      >
        {/* Image side */}
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-150px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <div className="relative group">
            {/* Image glow backdrop */}
            <div className="absolute -inset-4 bg-memorial-green/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/5">
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className={`w-full h-72 md:h-96 object-cover ${entry.imagePosition || "object-center"} transition-transform duration-[2s] group-hover:scale-105`}
              />
              {/* Dark cinematic overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-memorial-black/60 via-transparent to-memorial-black/20" />
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ margin: "-150px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <div
            className={`${isEven ? "md:text-right" : "md:text-left"} text-center`}
          >
            {/* Decorative accent line */}
            <div className={`w-16 h-px bg-memorial-yellow/50 mb-6 ${
                isEven ? "md:mr-0 md:ml-auto" : "md:ml-0 md:mr-auto"
              } mx-auto`}
            />

            <h3 className="text-3xl md:text-4xl font-amiri text-white mb-5 drop-shadow-lg">
              {entry.title}
            </h3>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-cairo max-w-md mx-auto md:mx-0">
              {entry.description}
            </p>

            {/* Bottom decorative element */}
            <div className={`mt-8 flex items-center gap-3 ${
                isEven
                  ? "md:justify-end justify-center"
                  : "md:justify-start justify-center"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-memorial-yellow/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-memorial-yellow/20" />
              <div className="w-1 h-1 rounded-full bg-memorial-yellow/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // The vertical timeline line grows as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-24 bg-memorial-black overflow-hidden"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-6xl font-amiri text-white mb-5">
          رحلة الذكريات
        </h2>
        <div className="w-20 h-px bg-memorial-yellow/40 mx-auto mb-4" />
        <p className="text-gray-500 font-cairo text-lg max-w-md mx-auto">
          محطات من حياة لن تُنسى
        </p>
      </motion.div>

      {/* Central vertical timeline line */}
      <div className="absolute left-1/2 top-48 bottom-24 w-px -translate-x-1/2">
        {/* Static faint track */}
        <div className="absolute inset-0 bg-white/5" />
        {/* Animated growing line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-memorial-yellow/40 via-memorial-yellow/20 to-transparent"
        />
      </div>

      {/* Timeline entries */}
      <div className="relative z-10">
        {timelineData.map((entry, index) => (
          <TimelineCard key={entry.id} entry={entry} index={index} />
        ))}

        {/* Final Conclusion Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 py-32 text-center relative"
        >
          {/* Decorative glow behind the conclusion */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-memorial-yellow/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-px bg-memorial-yellow/30 mx-auto mb-12" />
            
            <p className="text-2xl md:text-3xl font-amiri text-white/90 leading-[2.2] md:leading-[2.4] italic">
              "رحل الشهيد حاملًا معه معنى التضحية والوفاء، مدافعًا عن حقٍّ لم ولن يُسلب منّا، 
              لأن دماءه ودماء رفاقه كانت على العدو صاعقة، وعلى قلوبنا رحمةً وأمانًا. 
              نعاهدك أيها الشهيد أن نحافظ على القضية التي استشهدت من أجلها، 
              وأن نحمل فكر آل البيت معنا حتى ظهور الحجة المهدي (عجّل الله فرجه الشريف)."
            </p>

            <div className="w-16 h-px bg-memorial-yellow/30 mx-auto mt-12" />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-memorial-black to-transparent pointer-events-none" />
    </section>
  );
}
