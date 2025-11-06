import { Box, IconButton, Backdrop, styled } from '@mui/material';
import ThemeSwitch from 'src/components/ThemeSwitch';
import { useSettingStore } from 'src/store/setting';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';

const HoverableLI = styled('li')(({ theme }) => ({
  '.indicator': {
    width: 0,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    '.indicator': {
      width: '100%',
    },
  },
}));

export default function Nav() {
  const theme = useSettingStore((state) => state.theme);
  const light = useSettingStore((state) => state.light);
  const dark = useSettingStore((state) => state.dark);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState('');

  const reloadSVG = () => {
    setLoaded('');
    setTimeout(() => {
      setLoaded('/brand.svg');
    }, 30);
  };

  useEffect(() => {
    if (loaded != '') setTimeout(reloadSVG, 5000);
  }, [loaded]);

  useEffect(reloadSVG, []);

  const tabs: any[] = useMemo(() => {
    return [
      {
        text: 'Kai Wang',
        icon: loaded !== '' && <ReactSVG src={loaded} />,
        onClick: () => navigate('/'),
        url: '/',
      },
      {
        text: 'Publications',
        onClick: () => navigate('/pubs'),
        url: '/pubs',
      },
      {
        text: 'Experiences',
        onClick: () => navigate('/experiences'),
        url: '/experiences',
      },
      {
        text: 'Miscellaneous',
        onClick: () => navigate('/miscellaneous'),
        url: '/miscellaneous',
      },
    ];
  }, [loaded]);

  function setTheme(isLight: boolean) {
    if (isLight) light();
    else dark();
  }

  return (
    <nav className="fixed w-full top-0 z-11 backdrop-blur-md px-2.5 xs:px-5 sm:px-[5%] md:px-[10%] lg:px-[calc(50%-620px)] xl:px-[calc(100%-1700px)] h-15 leading-15 xl:leading-[70px] xl:h-[70px] border-b-[#eee] border-b">
      <ul className="text-base list-none flex items-center m-0 p-0 h-full">
        {tabs.map((tab, i) => {
          if (i === 0)
            return (
              <li className="cursor-pointer mr-auto" key={i} onClick={tab.onClick}>
                {tab.icon}
              </li>
            );
          return (
            <HoverableLI
              key={i}
              onClick={tab.onClick}
              className="hidden md:flex relative self-stretch cursor-pointer px-2 text-[15px] items-center"
              style={{
                transition: 'color 0.2s',
              }}
            >
              <span className="text-primary font-bold">{`0${i}.`}</span>
              {tab.text}
              <span
                className="indicator absolute bottom-0 left-0 h-0.5 bg-primary"
                style={{
                  transition: 'width 0.2s',
                }}
              ></span>
            </HoverableLI>
          );
        })}
        <ThemeSwitch checked={theme == 'light'} onChange={setTheme} className="ml-5 hidden md:block" />
        <Box onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className="cursor-pointer block md:hidden" />
        </Box>
      </ul>
      <Backdrop
        open={isMenuOpen}
        className={[
          'table fixed top-0 right-0 width-0 height-0 transition-all duration-200 z-1 md:hidden',
          isMenuOpen ? 'w-screen h-screen' : '',
        ].join(' ')}
        onClick={(e) => {
          if ((e.target as HTMLInputElement).id === 'overlay') setIsMenuOpen(false);
        }}
      >
        <Box id="overlay" className="relative w-full h-full overflow-hidden">
          <div
            className={[
              'fixed right-5 top-5 w-0 h-0 bg-primary z-999 rounded-[50%] translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_5px_#00000070]',
              isMenuOpen && 'w-[240vw] h-[140vh]',
            ].join(' ')}
            style={{
              transition: 'width 0.2s, height 0.2s',
            }}
          />
          <div
            className={[
              'fixed right-5 top-5 w-0 h-0 bg-[#00000030] z-1000 rounded-[50%] translate-x-1/2 -translate-y-1/2',
              isMenuOpen && 'w-[210vw] h-[140vh]',
            ].join(' ')}
            style={{
              transition: 'width 0.3s, height 0.3s',
            }}
          />
          <div className="absolute top-0 right-0 z-1001">
            <ul className="block float-right mr-2.5 list-none">
              {tabs.map((tab, i) => {
                if (i === 0)
                  return (
                    <li
                      key={i}
                      className="text-left text-white px-2 text-xl font-bold cursor-pointer"
                      onClick={() => {
                        tab.onClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      {tab.text}
                    </li>
                  );
                return (
                  <li
                    key={i}
                    className="text-left text-white px-2 text-[15px] cursor-pointer"
                    onClick={() => {
                      tab.onClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {`0${i}.${tab.text}`}
                  </li>
                );
              })}
              <ThemeSwitch checked={theme == 'light'} onChange={setTheme} className="ml-3 mr-3" />
            </ul>
          </div>
          <IconButton className="absolute top-3/4 left-1/2 z-1002 -translate-x-1/2 p-0 drop-shadow-2xl" onClick={() => setIsMenuOpen(false)}>
            <HighlightOffIcon color="primary" style={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Backdrop>
    </nav>
  );
}
