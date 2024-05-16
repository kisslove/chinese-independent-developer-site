import { EyeOutlined, LikeOutlined, SyncOutlined } from '@ant-design/icons';
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
  onClick: () => void;
}> = ({ item, onClick }) => {
  const { useToken } = theme;

  const { token } = useToken();

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );

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
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: 'none',
          fontSize: '14px',
          color: token.colorTextSecondary,
          lineHeight: '22px',
          padding: '16px 20px 28px',
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
            {item?.name?.substring?.(0, 1)}
          </div>
          <div
            style={{
              fontSize: '16px',
              color: token.colorText,
            }}
          >
            <div style={{ color: 'volcano' }}>
              <Popover content={<div>{item?.name}</div>}>
                {item?.name?.length > 15 ? item?.name.substring(0, 15) + '...' : item?.name}
              </Popover>
            </div>
            <div style={{ color: '#8a919f', fontSize: 13 }}>{item?.username}</div>
          </div>
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#515767',
            textAlign: 'left',
            lineHeight: '22px',
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          {item?.description?.length > 40
            ? item?.description.substring(0, 36) + '...'
            : item?.description}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              {item.type === 'basic' ? <Tag>网站/App</Tag> : <Tag>开发者工具/论坛型网站</Tag>}
              {item.status === 'online' && (
                <Tag icon={<SyncOutlined spin />} color="green">
                  已上线
                </Tag>
              )}
              {item.status === 'dev' && <Tag>开发中</Tag>}
              {item.status === 'closed' && <Tag>缺乏维护</Tag>}
            </Space>
            <Statistic
              valueStyle={{ fontSize: 12, color: '#8a919f' }}
              formatter={formatter}
              value={item.itemViews}
              prefix={<EyeOutlined />}
            />
          </div>
        </div>

        <div
          style={{
            padding: '8px 24px',
          }}
        >
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Button size="small" icon={<LikeOutlined />} type="link">
              点赞
            </Button>
            <Divider type="vertical" />
            <Button size="small" icon={<LikeOutlined />} type="link">
              收藏
            </Button>
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default InfoCard;
