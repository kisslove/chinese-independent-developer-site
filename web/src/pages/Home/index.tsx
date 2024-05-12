/* eslint-disable @typescript-eslint/no-use-before-define */
import { getList } from '@/services/project/api';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Empty, FloatButton, Form, Input, Radio, Space, Spin, theme } from 'antd';
import { unionBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import Details from './Details';
import InfoCard from './InfoCard';

type FieldType = {
  keyword?: string;
  username?: string;
  type?: string;
  status?: string;
};

type SeacrhType = {
  keyword?: string;
  username?: string;
  type?: string;
  status?: string;
  pageNum?: number;
};

const pageSize = 50;

const Home: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [list, setList] = useState<{ total: number; result: Project.Item[] }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Project.Item>();
  const [showAdvanceSeach, setShowAdvanceSeach] = useState<boolean>(false);
  const [searchModel, setSearchModel] = useState<SeacrhType>();

  useEffect(() => {
    search({});
  }, []);

  const search = (search: SeacrhType) => {
    setLoading(true);
    const searchData: any = {};
    if (search.keyword) {
      searchData.blurry = search.keyword;
      searchData.blurryFields = 'name,description';
    }

    if (search.username) {
      searchData.username = search.username;
    }

    if (search.type) {
      searchData.type = search.type;
    }

    if (search.status) {
      searchData.status = search.status;
    }

    getList({
      pageNum: search.pageNum ?? 1,
      pageSize,
      sortOrder: 'desc',
      sortField: 'addTime',
      ...searchData,
    })
      .then((r) => {
        if (r.data) {
          setSearchModel(search);
          setList({ ...r.data });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMore = () => {
    const searchData: any = {};
    if (searchModel?.keyword) {
      searchData.blurry = searchModel.keyword;
      searchData.blurryFields = 'name,description';
    }

    if (searchModel?.username) {
      searchData.username = searchModel.username;
    }

    if (searchModel?.type) {
      searchData.type = searchModel.type;
    }

    if (searchModel?.status) {
      searchData.status = searchModel.status;
    }
    const pageNum = (searchModel?.pageNum ?? 1) + 1;
    getList({
      pageSize,
      sortOrder: 'desc',
      sortField: 'addTime',
      ...searchData,
      pageNum,
    })
      .then((r) => {
        if (r.data) {
          setSearchModel({ ...searchModel, pageNum });
          setList({
            ...{
              total: r.data.total,
              // 查询出来有重复数据（bug）
              result: unionBy([...(list?.result || []), ...r.data.result], 'id'),
            },
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = (value: any) => {
    search(value);
  };

  return (
    <PageContainer title={false}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Card
          style={{
            borderRadius: 8,
            flex: 1,
          }}
          bodyStyle={{
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          }}
        >
          <div>
            <div
              style={{
                marginBottom: 16,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center ',
              }}
            >
              <div
                style={{
                  color: token.colorTextSecondary,
                  flex: 1,
                  fontSize: 20,
                }}
              >
                👩🏿‍💻👨🏾‍💻👩🏼‍💻👨🏽‍💻👩🏻‍💻中国独立开发者项目列表 -- 分享大家都在做什么
                <div style={{ fontSize: 13 }}>【已上架：{list?.total || 0}个项目】</div>
              </div>
              <div>
                <Space>
                  {!showAdvanceSeach && (
                    <Input.Search
                      placeholder="搜索产品/项目名称、描述"
                      enterButton="搜索"
                      size="large"
                      loading={loading}
                      style={{ width: 520 }}
                      onSearch={(value) => search({ keyword: value })}
                    />
                  )}
                  <Button
                    size="large"
                    onClick={() => {
                      if (showAdvanceSeach) {
                        search({});
                      }
                      setShowAdvanceSeach(!showAdvanceSeach);
                    }}
                  >
                    {showAdvanceSeach ? '关闭高级搜索' : '高级搜索'}
                  </Button>
                </Space>
              </div>
            </div>
            <Spin spinning={loading}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                {list?.result.map((r) => (
                  <InfoCard
                    item={r}
                    onClick={() => {
                      setCurrentItem(r);
                      setShowModal(true);
                    }}
                    key={r.id}
                  />
                ))}

                {!loading && list?.total === 0 && <Empty style={{ flex: 1 }} />}
              </div>
              {list?.total > list?.result?.length && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <Button
                    onClick={() => loadMore()}
                    loading={loading}
                    type="primary"
                    ghost
                    style={{ width: '30%' }}
                  >
                    加载更多
                  </Button>
                </div>
              )}
            </Spin>
          </div>
        </Card>
        {showAdvanceSeach && (
          <div
            style={{
              width: '20%',
              position: 'relative',
              height: '100%',
              marginLeft: 20,
            }}
          >
            <div
              style={{
                position: 'fixed',
                background: '#fff',
                border: 'sold 1px #ddd',
                padding: 20,
                width: '20%',
                right: 10,
                // left: 0,
              }}
            >
              <h2>高级搜索</h2>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ type: '', status: '' }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType> label="关键字" name="keyword">
                  <Input placeholder="搜索产品/项目名称、描述" size="large" />
                </Form.Item>
                <Form.Item<FieldType> label="创建者" name="username">
                  <Input placeholder="上传者" size="large" />
                </Form.Item>
                <Form.Item<FieldType> label="类型(来源)" name="type">
                  <Radio.Group>
                    <Radio.Button value="">全部</Radio.Button>
                    <Radio.Button value="basic">主版面版</Radio.Button>
                    <Radio.Button value="programmer">程序员版</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item<FieldType> label="状态" name="status">
                  <Radio.Group>
                    <Radio.Button value="">全部</Radio.Button>
                    <Radio.Button value="online">已上线</Radio.Button>
                    <Radio.Button value="dev">开发中</Radio.Button>
                    <Radio.Button value="closed">缺乏维护</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large">
                    搜索
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </div>
      <Details
        item={currentItem}
        show={showModal}
        close={(flag: boolean) => {
          if (flag) setShowModal(false);
        }}
      />
      <FloatButton.BackTop style={{ border: 'solid 1px #13C2C2' }} tooltip="回到顶部" />
    </PageContainer>
  );
};

export default Home;
