import { countItemViews, getList } from '@/services/project/api';
import { GithubFilled, SendOutlined } from '@ant-design/icons';
import { LuckyWheel } from '@lucky-canvas/react';
import { SelectLang as UmiSelectLang, history } from '@umijs/max';
import { Button, Modal, Tooltip, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';

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
  const myLucky = useRef<any>();
  const [blocks] = useState([{ padding: '10px', background: '#13C2C2' }]);
  const [prizes, setPrizes] = useState([]);
  useEffect(() => {
    getList({
      pageNum: 1,
      pageSize: 8,
      sortOrder: 'desc',
      sortField: 'addTime',
    }).then((r) => {
      if (r.data) {
        setPrizes(
          r.data.result.map((r, index) => {
            return {
              background: index % 2 === 0 ? '#13C2C2' : '#b8c5f2',
              fonts: [
                {
                  text: r?.name?.substring(0, 4),
                  fontColor: '#eee',
                  fontSize: '18px',
                  fontWeight: '700',
                  top: 18,
                  lineHeight: '18px',
                },
              ],
              url: r.url,
              desc: r.description,
              name: r.name,
              id: r.id,
            };
          }),
        );
      }
    });
  }, []);
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%',
      background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px', fontColor: '#fff' }],
    },
  ]);

  const showModal = () => {
    Modal.info({
      closable: true,
      title: '今日缘分',
      centered: true,
      maskClosable: true,
      footer: false,
      content: (
        <LuckyWheel
          ref={myLucky}
          width="300px"
          height="300px"
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
            if (myLucky.current) {
              // 点击抽奖按钮会触发star回调
              myLucky.current?.play?.();
              setTimeout(() => {
                const index = (Math.random() * 8) >> 0;
                myLucky.current?.stop?.(index);
              }, 1500);
            }
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            notification.open({
              placement: 'top',
              message: <>今日缘分，【{prize.name}】</>,
              description: (
                <div>
                  <p>{prize.desc}</p>
                  <div style={{ textAlign: 'right' }}>
                    <a
                      href={prize.url}
                      target="_blank"
                      onClick={() => {
                        countItemViews(prize?.id).catch();
                      }}
                    >
                      去看看
                    </a>
                  </div>
                </div>
              ),
            });
          }}
        ></LuckyWheel>
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
