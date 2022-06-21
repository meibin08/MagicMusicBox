import {
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  SkinOutlined,
  SwapOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { uuid } from '@/utils/tools';

type ConfigProps = {
  title: string;
  icon: React.ForwardRefExoticComponent<any>;
  url: string;
  uid: string;
};

const config: ConfigProps[] = [
  {
    title: '发现音乐',
    icon: MailOutlined,
    url: '/discover',
    uid: uuid(),
  },
  {
    title: '私人FM',
    icon: RightOutlined,
    url: '/1',
    uid: uuid(),
  },
  {
    title: '视频',
    icon: SettingOutlined,
    url: '/1',
    uid: uuid(),
  },
  {
    title: '关注',
    icon: SettingOutlined,
    url: '/1',
    uid: uuid(),
  },
];

export const mineMusic: ConfigProps[] = [
  {
    title: 'iTunes音乐',
    icon: RightOutlined,
    url: '/test',
    uid: uuid(),
  },
  {
    title: '下载管理',
    icon: RightOutlined,
    url: '/1',
    uid: uuid(),
  },
  {
    title: '最近播放',
    icon: RightOutlined,
    url: '/test',
    uid: uuid(),
  },
  {
    title: '我的音乐云盘',
    icon: RightOutlined,
    url: '/1',
    uid: uuid(),
  },
  {
    title: '我的收藏',
    icon: RightOutlined,
    url: '/1',
    uid: uuid(),
  },
];

export default config;
