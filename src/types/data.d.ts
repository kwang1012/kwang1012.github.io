interface New {
  title: string;
  highlighted?: boolean;
  date: string;
}

interface Provider {
  type: 'cv' | 'github' | 'google-scholar' | 'x' | 'linkedin';
  link: string;
}

interface Data {
  name: string;
  description: string;
  email: string;
  location: string;
  about: string;
  providers: Provider[];
  news: News[];
  miscellaneous: {
    name: string;
    description: string;
    detail: string;
    interests: string;
  };
}

interface Experience {
  title: string;
  corp?: string;
  link?: string;
  place: string;
  position: string;
  startDate: string;
  endDate?: string;
  advisor?: string;
  projects: string[];
}

interface Author {
  name: string;
  type: string;
}

interface Venue {
  name: string;
  short: string;
  url?: string;
  status?: string;
}

interface Publication {
  title: string;
  authorList: Author[];
  venue: Venue;
  url: string;
  abstract: string;
  image: string;
  slides?: string;
  bib: string;
  date: string;
  selected: boolean;
}

type Publications = Publication[];
