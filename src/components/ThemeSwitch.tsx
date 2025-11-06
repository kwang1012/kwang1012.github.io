import { useState, useEffect } from 'react';
import NightStayIcon from '@mui/icons-material/NightsStay';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material';

const ThemeSwitchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 44,
  height: 22,
  padding: 3,
  borderRadius: 15,
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'background-color 0.2s linear',
  backgroundColor: '#cacbcc',
  '&.dark': {
    backgroundColor: '#5a5b5c',
    '.handle': {
      transform: 'translateX(22px)',
    },
  },
  '.handle': {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 2,
    left: 2,
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 0 3px #00000070',
    transition: 'box-shadow 0.2s linear, transform 0.2s ease-in-out',
    transform: 'translateX(0)',
    '&:hover': {
      boxShadow: `0 0 5px 3px ${theme.palette.primary}`,
    },
  },
  '.icon': {
    fontSize: 18,
    transform: 'translateY(-1px)',
    filter: 'drop-shadow(0 0 3px #00000070)',
    '&.day': {
      color: '#ffd900',
    },
    '&.night': {
      color: '#839ecc',
    },
  },
}));

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

export default function ThemeSwitch(props: Props) {
  const [value, setValue] = useState<boolean>(props.checked);

  useEffect(() => {
    setValue(props.checked);
  }, [props.checked]);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  function onClick() {
    setValue((prevValue) => !prevValue);
  }

  return (
    <div className={props.className}>
      <ThemeSwitchContainer onClick={onClick} className={value ? 'light' : 'dark'}>
        <NightStayIcon className="icon night" />
        <Brightness7Icon className="icon day" />
        <div className="handle" />
      </ThemeSwitchContainer>
    </div>
  );
}
