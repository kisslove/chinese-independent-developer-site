import NavTabs from '@/components/NavTabs';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

const Hearts: React.FC = () => {
  return (
    <PageContainer title={false}>
      <div className="">
        <NavTabs />
      </div>
      <Card></Card>
    </PageContainer>
  );
};

export default Hearts;