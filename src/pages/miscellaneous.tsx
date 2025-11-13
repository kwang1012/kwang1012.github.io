import { ComponentRef, useState } from 'react';
import ContactCard from 'src/components/ContactCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useSettingStore } from 'src/store/setting';
import { useData, useProviders } from 'src/utils/data-loader';

export default function MiscellaneousView() {
  const theme = useSettingStore((state) => state.theme);
  const [open, setOpen] = useState(false);
  const providers = useProviders();
  const data = useData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const card = useRef<ComponentRef<typeof ContactCard>>(null);

  return (
    <>
      <div
        className={`mt-20 pt-24 max-w-[650px] mx-auto ${
          theme === 'light' ? 'bg-[#f8f9fb]' : 'dark:bg-[#131313]'
        } rounded-md shadow-app flex flex-col items-center relative text-center duration-400`}
      >
        <div className="absolute -top-[60px]">
          <img src="/avatar.jpg" width={150} height={150} className="rounded-full object-cover" />
        </div>
        <div className="flex flex-col items-center self-stretch">
          <h2 className="mb-0">{data.miscellaneous.name}</h2>
          <div className="text-gray-400 text-sm mt-2 tracking-tighter">{data.miscellaneous.description}</div>
          <p className="text-sm px-8 pb-2 text-justify leading-[1.2] tracking-tighter">{data.miscellaneous.detail}</p>
          <div className="text-sm tracking-tighter py-3 border-0 border-gray-300 border-solid self-stretch border-t">
            Interests: {data.miscellaneous.interests}
          </div>
          <div className="py-3 border-0 border-gray-300 border-solid self-stretch border-t">
            {providers.map((provider, i) => (
              <FontAwesomeIcon
                key={i}
                className="cursor-pointer mr-4"
                icon={provider.icon}
                size="2x"
                onClick={() => window.open(provider.link, '_blank')}
              />
            ))}
          </div>
          <div className="py-3 border-0 border-gray-300 border-solid self-stretch border-t">
            <Button
              variant="contained"
              disableElevation
              sx={{}}
              size="small"
              className="normal-case"
              onClick={() => window.open(`mailto:${data.email}`, '_blank')}
            >
              Email me
            </Button>
            <div className="my-1 text-sm">or</div>
            <Button
              onClick={handleClickOpen}
              sx={{}}
              variant="contained"
              disableElevation
              size="small"
              className="normal-case"
            >
              Send message
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Drop me a line</DialogTitle>
        <DialogContent>
          <ContactCard inputOnly ref={card} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-[#a9a9a9]">
            Cancel
          </Button>
          <Button
            onClick={() => {
              card.current?.submit().then(() => {
                setOpen(false);
              });
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
