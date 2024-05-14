import { GithubFilled, SendOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang, history } from '@umijs/max';
import { Button, Tooltip } from 'antd';
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
      <Tooltip
        placement="bottom"
        title="新项目求关注，喜欢就动动小手，给个star吧，❥(^_-)感谢❥(^_-)"
      >
        <Button type="primary" icon={<GithubFilled />}></Button>
      </Tooltip>
    </div>
  );
};

export const LoginOrRegister = () => {
  if (localStorage.getItem('token')) return <></>;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'none',
      }}
    >
      <Button
        type="primary"
        ghost
        onClick={() => {
          history.push('/user/login');
        }}
      >
        登录
      </Button>
      <Button
        type="primary"
        ghost
        onClick={() => {
          history.push('/user/register');
        }}
      >
        注册
      </Button>
    </div>
  );
};
