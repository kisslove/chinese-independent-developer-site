import {
  HeartOutlined,
  LikeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '个人信息',
    key: 'center',
    icon: <ProfileOutlined />,
  },
  {
    label: '我的点赞',
    key: 'likes',
    icon: <LikeOutlined />,
  },
  // {
  //   label: '我的喜欢',
  //   key: 'hearts',
  //   icon: <HeartOutlined />,
  // },
  {
    label: '我的收藏',
    key: 'collects',
    icon: <ShoppingCartOutlined />,
  },
];

const NavTabs: React.FC = () => {
  console.log(history.location.pathname, 'histry');
  const [current, setCurrent] = useState('');

  useEffect(() => {
    if (history.location.pathname?.endsWith('/center')) {
      setCurrent('center');
    }
    if (history.location.pathname?.endsWith('/likes')) {
      setCurrent('likes');
    }
    if (history.location.pathname?.endsWith('/collects')) {
      setCurrent('collects');
    }
  }, [history.location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    history.push(`/account/${e.key}`);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavTabs;
