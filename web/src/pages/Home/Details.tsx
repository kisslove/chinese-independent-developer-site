/* eslint-disable react/jsx-no-target-blank */
import { countItemViews, getItemDetails } from '@/services/project/api';
import { getUserSocials } from '@/services/user/api';
import { Modal, Space, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

import styles from './Details.less';

const Details: React.FC<{
  item: Project.Item | undefined;
  show: boolean;
  close: (flag: boolean) => void;
}> = ({ item, show, close }) => {
  const [info, setInfo] = useState<Project.ItemOtherDetails>();
  const [socials, setSocials] = useState<User.ItemSocials>();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item?.id) {
      itemView(item.id);
      getOtherDetas(item.id);
      getSocials(item.userId);
    }
  }, [item?.id]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const getOtherDetas = async (id: string) => {
    const data = await getItemDetails(id);
    if (data.code === 200 && data.data) {
      setInfo(data);
    }
  };

  const itemView = async (id: string) => {
    await countItemViews(id);
  };

  const getSocials = async (id: string) => {
    const data = await getUserSocials(id);
    if (data.code === 200 && data.data) {
      setSocials(data);
    }
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
    close(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
    close(true);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const openUrl = (url: string) => {
    window.open(url);
  };

  const renderIcon = (r: { socialType: string }) => {
    return <>{r.socialType}</>;
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            产品/项目详情
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className={styles.container}>
          <div className={styles.logo}>{item?.name?.substring?.(0, 1)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#252933', fontSize: 18, fontWeight: 500 }}>{item?.name}</div>
            <div style={{ marginTop: 4, marginBottom: 4, color: '#8a919f' }}>
              提交者：{item?.username}
            </div>
            <div style={{ marginBottom: 8 }}>
              社交媒体：
              <Space size={8}>
                {socials?.data?.result?.map((r) => (
                  <Tag
                    key={r.id}
                    style={{ cursor: 'pointer' }}
                    icon={renderIcon(r as any)}
                    onClick={() => openUrl(r.socialUrl)}
                  ></Tag>
                ))}
              </Space>
            </div>
            <p>{item?.description}</p>
          </div>
        </div>
        <br />
        <p>
          产品官网：
          <a href={item?.url} target="_blank">
            {item?.url}
          </a>
        </p>
        <p>上架时间：{item?.addTime}</p>
        <div>浏览次数：{info?.data.views}</div>
      </Modal>
    </>
  );
};

export default Details;
