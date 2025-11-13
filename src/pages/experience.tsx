import { motion, Variants } from 'framer-motion';
import ExperienceCard from 'src/components/ExperienceCard';
import { useResearchExperiences, useTeachingExperiences } from 'src/utils/data-loader';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // delay between each card
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function ExperienceView() {
  const rExps = useResearchExperiences('desc');
  const tExps = useTeachingExperiences('desc');

  return (
    <>
      <h2>Experiences</h2>

      {/* === Research Section === */}
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-6 mt-6"
      >
        {rExps.map((exp, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </motion.section>

      {/* === Teaching Section === */}
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Teaching Experiences
      </div>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-6 mt-6"
      >
        {tExps.map((exp, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
