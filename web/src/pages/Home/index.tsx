/* eslint-disable @typescript-eslint/no-use-before-define */
import { getList } from '@/services/project/api';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {
  Button,
  Card,
  Empty,
  Flex,
  FloatButton,
  Form,
  Input,
  Radio,
  Space,
  Spin,
  Tag,
  theme,
} from 'antd';
import { unionBy } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
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

const tagsData = [
  {
    value: '工具',
  },
  {
    value: 'AI',
  },
  {
    value: '网站',
  },
  {
    value: '软件',
  },
  {
    value: '应用',
  },
  {
    value: '平台',
  },
  {
    value: '通讯',
  },
  {
    value: '社区',
  },
  {
    value: '社交',
  },
  {
    value: '电商',
  },
  {
    value: '生活',
  },
  {
    value: 'O2O',
  },
  {
    value: '文化',
  },
  {
    value: '音乐',
  },
  {
    value: '娱乐',
  },
  {
    value: '视频',
  },
  {
    value: '阅读',
  },
  {
    value: '美图',
  },
  {
    value: '安全',
  },
  {
    value: '金融',
  },
  {
    value: '医疗',
  },
  {
    value: '旅游',
  },
  {
    value: 'VR',
  },
  {
    value: 'AR',
  },
  {
    value: 'SaaS',
  },
  {
    value: 'ERP',
  },
];

const Home: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [list, setList] = useState<{ total: number; result: Project.Item[] }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Project.Item>();
  const [showAdvanceSeach, setShowAdvanceSeach] = useState<boolean>(
    document.body.clientWidth < 1366 ? false : true,
  );
  const [searchModel, setSearchModel] = useState<SeacrhType>();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const [searchForm] = Form.useForm();

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    search({});
  }, []);

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [tag] : selectedTags.filter((t) => t !== tag);
    searchForm.setFieldValue('keyword', nextSelectedTags?.[0]);
    setSelectedTags(nextSelectedTags);
    searchForm.submit();
  };

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

  const onValuesChange = (changedValues, allValues) => {
    if (!allValues.keyword) setSelectedTags([]);
    // 如果存在定时器，清除它
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 创建一个新的定时器，500毫秒后提交表单
    timeoutRef.current = setTimeout(() => {
      onFinish(allValues);
    }, 500);
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
                👩🏿‍💻👨🏾‍💻👩🏼‍💻👨🏽‍💻👩🏻‍💻中国独立开发者项目列表 -- 分享大家都在做什么?
                <div style={{ fontSize: 13 }}>
                  【已上架：{list?.total || 0}个项目】,每日凌晨更新。
                </div>
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
                        setSelectedTags([]);
                        searchForm?.resetFields();
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
                {list?.result.map((r) => {
                  return (
                    <InfoCard
                      item={r}
                      onClick={() => {
                        setCurrentItem(r);
                        setShowModal(true);
                      }}
                      key={r.id}
                    />
                  );
                })}

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
                border: 'solid 1px #fff',
                padding: 20,
                width: '20%',
                minWidth: 250,
                right: 10,
              }}
            >
              <Space style={{ marginBottom: 8, fontSize: 16 }}>
                <div>高级搜索</div>
                {/* <CloseCircleOutlined
                  onClick={() => {
                    if (showAdvanceSeach) {
                      search({});
                    }
                    setShowAdvanceSeach(!showAdvanceSeach);
                  }}
                /> */}
              </Space>

              <Flex gap="4px 0" wrap>
                {tagsData.map<React.ReactNode>((tag) => (
                  <Tag.CheckableTag
                    key={tag.value}
                    style={{ border: 'solid 1px #13C2C2' }}
                    checked={selectedTags.includes(tag.value)}
                    onChange={(checked) => handleTagChange(tag.value, checked)}
                  >
                    {tag.value}
                  </Tag.CheckableTag>
                ))}
              </Flex>

              <Form
                size="small"
                name="searchForm"
                form={searchForm}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600, marginTop: 16 }}
                initialValues={{ type: '', status: '' }}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                autoComplete="off"
              >
                <Form.Item<FieldType> label="" name="keyword">
                  <Input placeholder="产品/项目名称、描述" size="large" allowClear />
                </Form.Item>
                <Form.Item<FieldType> label="创建者" name="username">
                  <Input placeholder="上传者" size="large" allowClear />
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
      {showModal && (
        <Details
          item={currentItem}
          close={(flag: boolean) => {
            if (flag) setShowModal(false);
          }}
        />
      )}
      <FloatButton.BackTop style={{ border: 'solid 1px #13C2C2' }} tooltip="回到顶部" />
    </PageContainer>
  );
};

export default Home;
