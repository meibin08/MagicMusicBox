import React, { useEffect } from 'react';
import {
  CaretRightOutlined,
  RightOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import { shallowEqual } from 'react-redux';
import { clsPrefix } from '@/utils/serialization';
import { fetchLatestMusictList } from '@/store/discovers';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import './index.scss';

const prefixCls = 'songbar-component';
const clsName = clsPrefix(prefixCls);
const AppSongBarPage = (props) => {
  const dispatch = useAppDispatch();
  const { latestMusictList = [] } = useAppSelector((state) => {
    const {
      discoversState: {
        personalizedList,
        discoverBannerList,
        latestMusictList,
      } = {},
    } = state;
    return { personalizedList, discoverBannerList, latestMusictList };
  }, shallowEqual);
  useEffect(() => {
    dispatch(fetchLatestMusictList(0));
  }, []);

  return <div className={prefixCls}></div>;
};
export default AppSongBarPage;
