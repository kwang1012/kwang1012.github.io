import yaml from 'js-yaml';
import mainText from 'data/main.yaml?raw';
import pubText from 'data/publications.yaml?raw';
import experienceText from 'data/experiences.yaml?raw';
import dayjs from 'dayjs';
import { IconName, IconPrefix, IconProp } from '@fortawesome/fontawesome-svg-core';

const parsed = yaml.load(mainText);
const data = parsed && typeof parsed === 'object' ? (parsed as Data) : ({} as Data);

const parsedPubs = yaml.load(pubText);
const pubsData = parsedPubs && typeof parsedPubs === 'object' ? (parsedPubs as Publications) : ({} as Publications);

const parsedExps = yaml.load(experienceText);
const expsData =
  parsedExps && typeof parsedExps === 'object'
    ? (parsedExps as { teaching: Experience[]; research: Experience[] })
    : ({} as { teaching: Experience[]; research: Experience[] });

interface Options {
  news: {
    sort?: 'desc' | 'asc';
  };
}

export function useData(options?: Options) {
  const _data = structuredClone(data);
  if (options?.news.sort) {
    let _news = _data.news;
    _data.news = _news.sort((a, b) => {
      const aDate = dayjs(a.date, 'MM/DD/YYYY');
      const bDate = dayjs(b.date, 'MM/DD/YYYY');
      if (aDate.isBefore(bDate)) return options.news.sort === 'asc' ? -1 : 1;
      if (aDate.isAfter(bDate)) return options.news.sort === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return _data;
}

export function usePublications(sort?: 'desc' | 'asc', selected?: boolean, group?: boolean) {
  let _pubs = structuredClone(pubsData);
  if (group) {
    let groups: { pubs: Publications; year: number }[] = [];
    _pubs.forEach((pub) => {
      let year = new Date(pub.date).getFullYear();
      let group = groups.find((g) => g.year === year);
      if (!group) {
        group = { year, pubs: [] };
        groups.push(group);
      }
      group.pubs.push(pub);
    });
    groups = groups.sort((a, b) => (a.year > b.year ? -1 : 1));
    return groups;
  }
  if (selected) {
    _pubs = _pubs.filter((pub) => pub.selected);
  }
  if (sort) {
    const asc = sort === 'asc' ? 1 : -1;
    _pubs = _pubs.sort((a, b) =>
      dayjs(a.date, 'MM/DD/YYYY').isBefore(dayjs(b.date, 'MM/DD/YYYY')) ? -1 * asc : 1 * asc
    );
  }
  return _pubs;
}

export function useResearchExperiences(sort?: 'desc' | 'asc') {
  let _exps = structuredClone(expsData.research);
  if (sort) {
    const asc = sort === 'asc' ? 1 : -1;
    _exps = _exps.sort((a, b) =>
      dayjs(a.startDate, 'MM/DD/YYYY').isBefore(dayjs(b.startDate, 'MM/DD/YYYY')) ? -1 * asc : 1 * asc
    );
  }
  return _exps;
}

export function useTeachingExperiences(sort?: 'desc' | 'asc') {
  let _exps = structuredClone(expsData.teaching);
  if (sort) {
    const asc = sort === 'asc' ? 1 : -1;
    _exps = _exps.sort((a, b) => {
      const aSem = a.startDate.split(' ')[0];
      const aYear = Number(a.startDate.split(' ')[1]);
      const bYear = Number(b.startDate.split(' ')[1]);
      if (aYear == bYear) {
        return aSem == 'Spring' ? 1 : -1;
      }
      return aYear < bYear ? -1 * asc : 1 * asc;
    });
  }
  return _exps;
}

const providerIconMap = {
  cv: ['fac' as IconPrefix, 'cv' as IconName],
  'google-scholar': ['fac' as IconPrefix, 'google-scholar' as IconName],
  github: ['fab', 'github'],
  x: ['fab', 'x-twitter'],
  linkedin: ['fab', 'linkedin'],
};

export function useProviders(): (Provider & { icon: IconProp })[] {
  return data.providers.map((p) => ({
    ...p,
    icon: providerIconMap[p.type] as IconProp,
  }));
}
