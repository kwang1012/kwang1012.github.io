import dayjs from 'dayjs';
import axios from 'axios';

export const format = (date: string | Date) => {
  if (typeof date === 'string') date = new Date(date);
  if (date.getMinutes()) return dayjs(date).format('h:m a');
  else return dayjs(date).format('h a');
};

export async function getEvents(preview = false) {
  const today = new Date();
  return await axios
    // this is google cloud run proxy
    .get('https://calendar-niraywahjq-uc.a.run.app', {
      params: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      },
    })
    .then(({ data }) => {
      const events: any = {};
      for (const evt of data) {
        const date = evt.start.dateTime || evt.start.date.replace(/-/g, '/');
        const dateTime = new Date(date);
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1;
        const day = dateTime.getDate();
        if (!events[year]) events[year] = {};
        if (!events[year][month]) events[year][month] = {};
        if (preview) {
          if (!events[year][month][day]) events[year][month][day] = true;
        } else {
          if (!events[year][month][day]) events[year][month][day] = [evt];
          else {
            const exist = events[year][month][day].find((event: any) => event.id === evt.id);
            if (!exist) events[year][month][day].push(evt);
          }
        }
      }
      return events;
    })
    .catch(() => []);
}
