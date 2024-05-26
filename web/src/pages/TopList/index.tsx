/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */
import { Avatar, Button, Card, Col, Empty, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { topCollects, topLikes, topViews } from '@/services/project/api';
import styles from './index.less';

type TopType = 'day' | 'week' | 'month' | 'quarter' | 'year';

const TopList: React.FC = () => {
  const [viewlist, setViewList] = useState([]);
  const [likelist, setLikeList] = useState([]);
  const [collectlist, setCollectList] = useState([]);
  const [type, setType] = useState<TopType>('day');
  const [viewlistLoading, setViewListLoading] = useState(false);
  const [likeListLoading, setLikeListLoading] = useState(false);
  const [collectListLoading, setCollectListLoading] = useState(false);

  useEffect(() => {
    typeChanges('day');
  }, []);

  const getTopViews = async (values) => {
    topViewsApi(values);
    topLikesApi(values);
    topCollectsApi(values);
  };

  const topViewsApi = async (values) => {
    setViewListLoading(true);
    const r1: any = await topViews({
      pageNum: 1,
      pageSize: 20,
      ...values,
    });
    if (r1.code === 200) {
      setViewList(r1.data?.result);
    }
    setViewListLoading(false);
  };

  const topLikesApi = async (values) => {
    setLikeListLoading(true);
    const r2: any = await topLikes({
      pageNum: 1,
      pageSize: 20,
      ...values,
    });
    if (r2?.code === 200) {
      setLikeList(r2.data?.result);
    }
    setLikeListLoading(false);
  };

  const topCollectsApi = async (values) => {
    setCollectListLoading(true);
    const r3: any = await topCollects({
      pageNum: 1,
      pageSize: 20,
      ...values,
    });
    if (r3?.code === 200) {
      setCollectList(r3.data?.result);
    }
    setCollectListLoading(false);
  };

  const typeChanges = (type: TopType) => {
    setType(type);
    const time = {
      startTime: new Date(),
      endTime: new Date(),
    };
    const today = new Date();
    switch (type) {
      case 'day':
        // 获取今天的开始时间（00:00:00）
        const startTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0,
        );

        // 获取今天的结束时间（23:59:59）
        const endTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999,
        );
        time.startTime = startTime;
        time.endTime = endTime;
        break;
      case 'week':
        // 获取本周的第一天（周一）
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
        // 获取本周的最后一天（周日）
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        time.startTime = firstDayOfWeek;
        time.endTime = lastDayOfWeek;
        break;
      case 'month':
        // 获取本月的第一天
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // 获取本月的最后一天
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        time.startTime = firstDayOfMonth;
        time.endTime = lastDayOfMonth;
        break;
      case 'quarter':
        // 确定当前月份所在的季度
        const quarter = Math.floor(today.getMonth() / 3);

        // 获取本季度的开始日期
        const firstDayOfQuarter = new Date(today.getFullYear(), quarter * 3, 1);

        // 获取本季度的最后一天
        const lastDayOfQuarter = new Date(today.getFullYear(), (quarter + 1) * 3, 0);
        time.startTime = firstDayOfQuarter;
        time.endTime = lastDayOfQuarter;
        break;

      case 'year':
        // 获取本年的第一天
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

        // 获取本年的最后一天
        const lastDayOfYear = new Date(today.getFullYear() + 1, 0, 0);
        time.startTime = firstDayOfYear;
        time.endTime = lastDayOfYear;
        break;

      default:
        break;
    }

    getTopViews({
      gte: JSON.stringify({
        createTime: time.startTime,
      }),
      lte: JSON.stringify({
        createTime: time.endTime,
      }),
    });
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space size={40}>
            <Button onClick={() => typeChanges('day')} type={type === 'day' ? 'primary' : 'dashed'}>
              今日排行榜
            </Button>
            <Button
              onClick={() => typeChanges('week')}
              type={type === 'week' ? 'primary' : 'dashed'}
            >
              本周排行榜
            </Button>
            <Button
              onClick={() => typeChanges('month')}
              type={type === 'month' ? 'primary' : 'dashed'}
            >
              本月排行榜
            </Button>
            <Button
              onClick={() => typeChanges('quarter')}
              type={type === 'quarter' ? 'primary' : 'dashed'}
            >
              季度排行榜
            </Button>
            <Button
              onClick={() => typeChanges('year')}
              type={type === 'year' ? 'primary' : 'dashed'}
            >
              年度排行榜
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 40 }}>
        <Col span={8}>
          <Card
            hoverable
            title="浏览排行榜"
            className={styles.cardContainer}
            loading={viewlistLoading}
          >
            <div className={styles.contentContainer}>
              {viewlist.map((r, index) => {
                return (
                  <a href={r.item.url} target="_blank">
                    <div className={styles.listContainer}>
                      <Space>
                        {
                          <Avatar
                            style={{
                              color: '#fff',
                              backgroundColor:
                                index === 0
                                  ? '#faad14'
                                  : index === 1
                                  ? '#ffd666'
                                  : index === 2
                                  ? '#fff1b8'
                                  : 'ButtonHighlight',
                              fontWeight: 800,
                              verticalAlign: 'middle',
                            }}
                            size="small"
                          >
                            {index + 1}
                          </Avatar>
                        }

                        <div style={{ fontSize: 18, color: '#13C2C2' }}>{r.item.name}</div>
                      </Space>
                      <span style={{ color: '#aaa', fontWeight: 700 }}>{r._count}</span>
                    </div>
                  </a>
                );
              })}
              {viewlist.length === 0 && <Empty description="快去看看项目吧" />}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            title="点赞排行榜"
            className={styles.cardContainer}
            loading={likeListLoading}
          >
            <div className={styles.contentContainer}>
              {likelist.map((r, index) => {
                return (
                  <a href={r.item.url} target="_blank">
                    <div className={styles.listContainer}>
                      <Space>
                        {
                          <Avatar
                            style={{
                              color: '#fff',
                              backgroundColor:
                                index === 0
                                  ? '#faad14'
                                  : index === 1
                                  ? '#ffd666'
                                  : index === 2
                                  ? '#fff1b8'
                                  : 'ButtonHighlight',
                              fontWeight: 800,
                              verticalAlign: 'middle',
                            }}
                            size="small"
                          >
                            {index + 1}
                          </Avatar>
                        }

                        <div style={{ fontSize: 18, color: '#13C2C2' }}>{r.item.name}</div>
                      </Space>
                      <span style={{ color: '#aaa', fontWeight: 700 }}>{r._count}</span>
                    </div>
                  </a>
                );
              })}
              {likelist.length === 0 && <Empty description="快去给你喜欢的项目点个赞吧" />}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            title="收藏排行榜"
            className={styles.cardContainer}
            loading={collectListLoading}
          >
            <div className={styles.contentContainer}>
              {collectlist.map((r, index) => {
                return (
                  <a href={r.item.url} target="_blank">
                    <div className={styles.listContainer}>
                      <Space>
                        {
                          <Avatar
                            style={{
                              color: '#fff',
                              backgroundColor:
                                index === 0
                                  ? '#faad14'
                                  : index === 1
                                  ? '#ffd666'
                                  : index === 2
                                  ? '#fff1b8'
                                  : 'ButtonHighlight',
                              fontWeight: 800,
                              verticalAlign: 'middle',
                            }}
                            size="small"
                          >
                            {index + 1}
                          </Avatar>
                        }

                        <div style={{ fontSize: 18, color: '#13C2C2' }}>{r.item.name}</div>
                      </Space>
                      <span style={{ color: '#aaa', fontWeight: 700 }}>{r._count}</span>
                    </div>
                  </a>
                );
              })}
              {collectlist.length === 0 && (
                <Empty description="喜欢的项目还可以收藏哦，免得下次找不到了" />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TopList;
