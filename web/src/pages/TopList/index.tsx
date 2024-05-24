import { Button, Card, Col, Row, Space } from 'antd';
import React from 'react';

const TopList: React.FC = () => (
  <>
    <Row gutter={16}>
      <Col span={24}>
        <Space size={40}>
          <Button type="primary">全部</Button>
          <Button>今日排行榜</Button>
          <Button>7天排行榜</Button>
          <Button>30天排行榜</Button>
          <Button>3个月排行榜</Button>
          <Button>半年排行榜</Button>
          <Button>一年排行榜</Button>
        </Space>
      </Col>
    </Row>

    <Row gutter={24} style={{ marginTop: 40 }}>
      <Col span={8}>
        <Card hoverable title="浏览排行榜" style={{ width: '100%', marginTop: 16 }} loading={false}>
          ewrwer
        </Card>
      </Col>
      <Col span={8}>
        <Card title="点赞排行榜" style={{ width: '100%', marginTop: 16 }} loading={false}>
          ewrwer
        </Card>
      </Col>
      <Col span={8}>
        <Card title="收藏排行榜" style={{ width: '100%', marginTop: 16 }} loading={false}>
          ewrwer
        </Card>
      </Col>
    </Row>
  </>
);

export default TopList;
