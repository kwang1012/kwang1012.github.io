import Nav from 'src/layouts/Nav';
import Footer from 'src/layouts/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="mx-auto min-h-screen px-5 pt-[100px] max-w-[800px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
