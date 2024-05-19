import { cancelItemLikes, countItemLikes } from '@/services/project/api';
import Icon, { EyeOutlined, ShoppingCartOutlined, SyncOutlined } from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import {
  Button,
  ConfigProvider,
  Divider,
  Popover,
  Space,
  Statistic,
  StatisticProps,
  Tag,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Settings from '../../../config/defaultSettings';
import styles from './index.less';

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartSvg} {...props} />
);

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  item: Project.Item;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const { useToken } = theme;
  const [itemNew, setItemNew] = useState<Project.Item>();

  useEffect(() => {
    if (item) {
      setItemNew({ ...item });
    }
  }, [item]);

  const { token } = useToken();

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  const itemLikeClick = async (
    item: Project.Item,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    let res;
    e.stopPropagation();
    if (item.isMyLike) {
      res = await cancelItemLikes(item.id);
    } else {
      res = await countItemLikes(item.id);
    }
    // debugger;
    if (res?.code === 200) {
      //
      setItemNew({
        ...itemNew,
        isMyLike: !itemNew?.isMyLike,
        itemLikes: itemNew?.isMyLike ? item.itemLikes - 1 : item.itemLikes + 1,
      });
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: Settings.colorPrimary,
        },
      }}
    >
      <div
        onClick={onClick}
        style={{
          backgroundColor: token.colorBgContainer,
          // boxShadow: token.boxShadow,
          borderRadius: '8px',
          fontSize: '14px',
          color: token.colorTextSecondary,
          lineHeight: '22px',
          padding: '16px 0px 0px',
          minWidth: '300px',
          flex: 1,
          position: 'relative',
        }}
        className={styles.card}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            padding: '0px 16px',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              lineHeight: '48px',
              backgroundSize: '100%',
              textAlign: 'center',
              color: '#13C2C2',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              borderRadius: 4,
              border: '1px solid #13C2C2',
              fontSize: 30,
            }}
          >
            {itemNew?.name?.substring?.(0, 1)}
          </div>
          <div
            style={{
              fontSize: '16px',
              color: token.colorText,
            }}
          >
            <div style={{ color: 'volcano' }}>
              <Popover content={<div>{itemNew?.name}</div>}>
                {itemNew?.name?.length > 15
                  ? itemNew?.name.substring(0, 15) + '...'
                  : itemNew?.name}
              </Popover>
            </div>
            <div style={{ color: '#8a919f', fontSize: 13 }}>{itemNew?.username}</div>
          </div>
        </div>
        <div
          style={{
            padding: '0px 16px',
            fontSize: '14px',
            color: '#515767',
            textAlign: 'left',
            lineHeight: '22px',
            marginBottom: 8,
            marginTop: 16,
            height: 48,
          }}
        >
          {itemNew?.description?.length > 40
            ? itemNew?.description.substring(0, 36) + '...'
            : itemNew?.description}
        </div>

        <div style={{ padding: '0px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              {itemNew?.type === 'basic' ? <Tag>网站/App</Tag> : <Tag>开发者工具/论坛型网站</Tag>}
              {itemNew?.status === 'online' && (
                <Tag icon={<SyncOutlined spin />} color="green">
                  已上线
                </Tag>
              )}
              {itemNew?.status === 'dev' && <Tag>开发中</Tag>}
              {itemNew?.status === 'closed' && <Tag>缺乏维护</Tag>}
            </Space>
            <Statistic
              valueStyle={{ fontSize: 12, color: '#8a919f' }}
              formatter={formatter}
              value={itemNew?.itemViews}
              prefix={<EyeOutlined />}
            />
          </div>
        </div>

        <div
          style={{
            padding: '8px 24px',
            borderTop: 'dashed 1px #ddd',
          }}
        >
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Button
              size="small"
              onClick={(e) => itemLikeClick(itemNew, e)}
              icon={<HeartIcon style={{ color: itemNew?.isMyLike ? 'hotpink' : '#ddd' }} />}
              type="link"
            >
              点赞({itemNew?.itemLikes || 0})
            </Button>
            <Divider type="vertical" />
            <Button size="small" icon={<ShoppingCartOutlined />} type="link">
              收藏({itemNew?.itemCollects || 0})
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default InfoCard;
