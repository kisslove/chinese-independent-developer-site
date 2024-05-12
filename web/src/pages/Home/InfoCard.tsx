import { SyncOutlined } from '@ant-design/icons';
import { Popover, Space, Tag, theme } from 'antd';
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

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: token.colorBgContainer,
        // boxShadow: token.boxShadow,
        borderRadius: '8px',
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

      <div style={{ position: 'absolute', bottom: 8 }}>
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
      </div>
    </div>
  );
};

export default InfoCard;
