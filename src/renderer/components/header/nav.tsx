import React, { useEffect, useState } from 'react';
import { CustomLink } from '@/src/components';
import { discoverHeaderNav } from '@/src/pages/discover/route';
import { useLocation } from 'react-router-dom';

const navConfig = {
  discover: discoverHeaderNav,
};

const AppHeaderComponent = () => {
  const url = useLocation();
  const [navList, setNavList] = useState(navConfig.discover);
  useEffect(() => {
    console.log(url, 'url');
  }, []);
  return (
    <>
      {navList.map((k) => {
        return (
          <CustomLink className="nav-item" to={k.path} key={k.uid}>
            {k.title}
          </CustomLink>
        );
      })}
    </>
  );
};
export default AppHeaderComponent;
