import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Typography, Row, Col, Button, Input, notification } from 'antd';
import { ContainerOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { setCurrentBucketId, create } from '../actions/bucket'
import Modal from 'antd/lib/modal/Modal';

const { Sider } = Layout;
const { Title } = Typography;

function Bucket() {
  const bucketState = useSelector(state => {
    return state.buckets;
  });

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [showAddBucketForm, setShowAddBucketForm] = useState(false);
  const [newBucketName, setNewBucketName] = useState();

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const closeAddBucketForm = () => {
    setShowAddBucketForm(false);
  }

  const addBucket = () => {
    dispatch(create({ name: newBucketName })).then((res) => {
      if (res.payload && res.payload.id) {
        notification.success({
          message: 'Bucket Created.',
          description: 'Bucket created successfully.',
        });
        setNewBucketName();
      }
      else {
        notification.error({
          message: 'Something went wrong.',
          description: res,
        });
      }
    });
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Row>
        <Col span={4}>
          <Button
            type='link'
            style={{
              backgroundColor: 'transparent', margin: 10
            }}
            onClick={() => setShowAddBucketForm(true)}
            icon={<PlusCircleOutlined style={{ color: 'white' }} />}
          />
        </Col><Col span={20}>
          <Title level={3} style={{ color: 'white', margin: 10 }}>Bucket List</Title>
        </Col>
      </Row>
      <Menu theme="dark" defaultSelectedKeys={['all']} mode="inline">
        <Menu.Item
          key='all'
          icon={<ContainerOutlined />}
          onClick={() => dispatch(setCurrentBucketId('all'))}
        >
          All
        </Menu.Item>
        {bucketState
          .buckets
          .sort((a, b) => a.updatedAt - b.updatedAt)
          .reverse()
          .map(bucket =>
          (<Menu.Item
            key={bucket.id}
            icon={<ContainerOutlined />}
            onClick={() => dispatch(setCurrentBucketId(bucket.id))}
          >
            {bucket.name}
          </Menu.Item>))}
      </Menu>
      <Modal
        destroyOnClose
        title="New Bucket"
        visible={showAddBucketForm}
        footer={null}
        onCancel={closeAddBucketForm}
        style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}
      >
        <Input
          style={{ flex: 'auto' }}
          onChange={(v) => setNewBucketName(v.target.value)}
          value={newBucketName}
        />
        <Button
          type='dashed'
          onClick={addBucket}
          disabled={!newBucketName}
        >
          <PlusOutlined /> Add Bucket
              </Button>
      </Modal>
    </Sider>
  );
}

export default Bucket;