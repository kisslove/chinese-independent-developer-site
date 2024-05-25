import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'chinese-independent-developer-web',
          title: '中国独立开发者项目(网页)',
          href: 'https://github.com/kisslove/chinese-independent-developer-site',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'chinese-independent-developer',
          title: '中国独立开发者项目',
          href: 'https://github.com/1c7/chinese-independent-developer',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
