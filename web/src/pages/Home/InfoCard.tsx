import {
  cancelItemCollects,
  cancelItemLikes,
  countItemCollects,
  countItemLikes,
} from '@/services/project/api';
import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import {
  Badge,
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

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  item: Project.Item;
  showLikeBtn?: boolean;
  showCollectBtn?: boolean;
  onClick: () => void;
}> = ({ item, onClick, showLikeBtn = true, showCollectBtn = true }) => {
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

  const itemCollectClick = async (
    item: Project.Item,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    let res;
    e.stopPropagation();
    if (item.isMyCollect) {
      res = await cancelItemCollects(item.id);
    } else {
      res = await countItemCollects(item.id);
    }
    // debugger;
    if (res?.code === 200) {
      //
      setItemNew({
        ...itemNew,
        isMyCollect: !itemNew?.isMyCollect,
        itemCollects: itemNew?.isMyCollect ? item.itemCollects - 1 : item.itemCollects + 1,
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
        {itemNew?.id === '3773d90d-24ad-4781-ba5c-7aeebab131f9' && (
          <Badge.Ribbon color='gold' text="本项目" style={{ top: -16 }}></Badge.Ribbon>
        )}
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
                {itemNew?.name?.length > 13
                  ? itemNew?.name.substring(0, 13) + '...'
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
              {itemNew?.status === 'online' && <Tag color="green">已上线</Tag>}
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
            {showLikeBtn && (
              <Button
                size="small"
                onClick={(e) => itemLikeClick(itemNew, e)}
                icon={itemNew?.isMyLike ? <LikeFilled /> : <LikeOutlined />}
                type="link"
              >
                点赞({itemNew?.itemLikes || 0})
              </Button>
            )}

            {showCollectBtn && showLikeBtn && <Divider type="vertical" />}
            {showCollectBtn && (
              <Button
                size="small"
                onClick={(e) => itemCollectClick(itemNew, e)}
                icon={itemNew?.isMyCollect ? <HeartFilled /> : <HeartOutlined />}
                type="link"
              >
                收藏({itemNew?.itemCollects || 0})
              </Button>
            )}
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default InfoCard;
