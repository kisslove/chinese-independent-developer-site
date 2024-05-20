import NavTabs from '@/components/NavTabs';
import Details from '@/pages/Home/Details';
import InfoCard from '@/pages/Home/InfoCard';
import { getMyLikes } from '@/services/user/api';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const Likes: React.FC = () => {
  const [list, setList] = useState<{ total: number; result: Project.Item[] }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Project.Item>();

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    setLoading(true);
    getMyLikes()
      .then((r) => {
        if (r.data?.result?.length) {
          setList({
            total: r.data.result?.length,
            result: r.data.result?.map((r) => ({ ...r, isMyLike: true })),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PageContainer title={false}>
      <div>
        <NavTabs />
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <Card
          style={{
            borderRadius: 8,
            flex: 1,
          }}
        >
          <div>
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
                    showLikeBtn
                    showCollectBtn={false}
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
            </Spin>
          </div>
        </Card>
      </div>
      {showModal && (
        <Details
          item={currentItem}
          close={(flag: boolean) => {
            if (flag) setShowModal(false);
          }}
        />
      )}
    </PageContainer>
  );
};

export default Likes;
