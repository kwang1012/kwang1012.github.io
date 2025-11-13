import { motion, Variants } from 'framer-motion';
import SimplePublicationCard from 'src/components/PublicationCard';
import { usePublications } from 'src/utils/data-loader';

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

export default function PublicationView() {
  const groups = usePublications(undefined, undefined, true) as {
    pubs: Publications;
    year: number;
  }[];

  return (
    <>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid mb-10">
        All Publications by Year
      </div>

      {groups.map((grp, i) => (
        <div key={i}>
          <div className="text-2xl font-bold mt-6">{grp.year}</div>
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {grp.pubs.map((pub, j) => (
              <motion.div key={j} variants={cardVariants}>
                <SimplePublicationCard pub={pub} />
              </motion.div>
            ))}
          </motion.section>
        </div>
      ))}
    </>
  );
}
