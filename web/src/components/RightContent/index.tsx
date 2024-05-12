import { GithubFilled, SendOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Button } from 'antd';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const Publish = () => {
  return (
    <div
      style={{
        display: 'flex',
        // height: 26,
      }}
      onClick={() => {
        window.open('https://github.com/1c7/chinese-independent-developer/issues');
      }}
    >
      <Button type="primary" icon={<SendOutlined />}>
        发布
      </Button>
    </div>
  );
};

export const Github = () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
      onClick={() => {
        window.open('https://github.com/kisslove/chinese-independent-developer-site');
      }}
    >
      <Button type="primary" icon={<GithubFilled />}></Button>
    </div>
  );
};
