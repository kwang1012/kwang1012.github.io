import { useState } from 'react';
import { providers } from 'src/const';
import { onClickProvider } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PublicationCard from 'src/components/PublicationCard';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import ExperienceCard from 'src/components/ExperienceCard';
import { Link } from 'react-router-dom';
import { getPubs } from 'src/const/pubs';
import { getRExps } from 'src/const/exps';
import { getNews } from 'src/const/news';
import { motion } from 'framer-motion';

const pubs = getPubs('desc', true);
const exps = getRExps('desc');
const news = getNews('desc');

export default function Home() {
  const [showMoreNews, setShowMoreNews] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-start">
        <img src="/avatar.jpg" width={182} className="rounded-lg object-cover" />
        <div className="sm:ml-10">
          <h1 className="mb-0">Kai Wang</h1>
          <div>
            A third-year PhD student @ <span className="font-bold">UIUC</span>
          </div>
          <div className="flex text-secondary my-2">
            {providers.map((provider, i) => (
              <FontAwesomeIcon
                key={i}
                className="cursor-pointer mr-4"
                icon={provider}
                size="2x"
                onClick={() => onClickProvider(provider as string)}
              />
            ))}
          </div>
          <div>
            Email:{' '}
            <a href="mailto:kw37@illinois.edu" target="_blank">
              <span className="text-blue-500 hover:underline cursor-pointer">kw37@illinois.edu</span>
            </a>
          </div>
          <div className="mt-2 text-gray-500 leading-5">
            Room #3111, Thomas M. Siebel Center
            <br />
            201 N. Goodwin Avenue, Urbana, IL, 61801, USA
          </div>
        </div>
      </div>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">About Me</div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        <p>
          I am a third-year Ph.D. student at the{' '}
          <a className="text-blue-500! hover:underline! cursor-pointer" href="https://illinois.edu/" target="_blank">
            University of Illinois at Urbana-Champaign
          </a>
          , working with Prof.{' '}
          <a
            className="text-blue-500! hover:underline! cursor-pointer"
            href="https://indy.cs.illinois.edu/"
            target="_blank"
          >
            Indy Gupta
          </a>{' '}
          as a member of the{' '}
          <a
            className="text-blue-500! hover:underline! cursor-pointer"
            href="https://dprg.cs.uiuc.edu/"
            target="_blank"
          >
            Distributed Protocols Research Group (DPRG)
          </a>
          .
        </p>
        Before starting my Ph.D., I received my Bachelor's and Master's degrees from{' '}
        <a
          className="text-blue-500! hover:underline! cursor-pointer"
          href="https://nthu-en.site.nthu.edu.tw/"
          target="_blank"
        >
          National Tsing Hua University
        </a>
        , Taiwan.
        <p>
          My research interest covers topics around Systems for ML, Internet of Things, Cloud Computing, and Algorithmic
          optimization.
        </p>
        <p>Currently, I am especially interested in and focus on:</p>
        <ul>
          <li className="font-bold">AIOps</li>
          <li>LLM Orchestration</li>
          <li>Smart Home</li>
        </ul>
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">News</div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        <ul className="pl-6">
          {news.slice(0, 2).map((n, i: number) => (
            <ReactMarkdown
              key={i}
              components={{
                p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
              }}
            >
              {`[**${dayjs(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title} ${n.highlighted ? '⭐️' : ''}`}
            </ReactMarkdown>
          ))}
          {showMoreNews &&
            news.slice(2).map((n, i: number) => (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
                }}
              >
                {`[**${dayjs(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title}`}
              </ReactMarkdown>
            ))}
        </ul>
        {news.length > 2 && (
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setShowMoreNews((show) => !show)}
          >
            {showMoreNews ? 'view less' : 'view more'}
          </span>
        )}
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Selected Publictions
      </div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        {pubs.map((pub, i) => (
          <PublicationCard key={i} pub={pub} />
        ))}
        <Link to="/pubs">
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        {exps.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} sm />
        ))}
      </motion.section>
    </div>
  );
}
