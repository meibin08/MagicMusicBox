import { clsPrefix } from '@/utils/serialization';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Badge } from 'antd';

import './index.scss';

const AppHeaderComponent = (props: { prefixCls?: string }): JSX.Element => {
  const { prefixCls = '' } = props;
  const clsName = clsPrefix(prefixCls);

  return (
    <>
      <Input
        className={clsName('search-input')}
        placeholder="搜索"
        size="small"
        prefix={<SearchOutlined />}
      />
    </>
  );
};
export default AppHeaderComponent;
