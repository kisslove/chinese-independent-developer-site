import { GithubFilled, SendOutlined } from '@ant-design/icons';
import { LuckyGrid } from '@lucky-canvas/react';
import { SelectLang as UmiSelectLang, history } from '@umijs/max';
import { Button, Modal, Tooltip } from 'antd';
import { useRef, useState } from 'react';

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

export const TodayLucky = () => {
  const myLucky = useRef();
  const [blocks] = useState([{ padding: '10px', background: '#869cfa' }]);
  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { background: '#b8c5f2', fonts: [{ text: '5' }] },
  ]);
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }],
    },
  ]);

  const showModal = () => {
    Modal.info({
      title: '今日运气',
      content: (
        <LuckyGrid
          width="300px"
          height="300px"
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            myLucky.current?.play?.();
            setTimeout(() => {
              const index = (Math.random() * 6) >> 0;
              myLucky.current?.stop?.(index);
            }, 2500);
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品');
          }}
        ></LuckyGrid>
      ),
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'none',
      }}
    >
      <Button type="link" style={{ color: '#13C2C2' }} onClick={() => showModal()}>
        🔥 测测今日运气
      </Button>
    </div>
  );
};
