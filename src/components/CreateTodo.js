import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create as todoCreate } from "../actions/todo_items";
import { create as bucketCreate } from "../actions/bucket";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Button, Select, Divider, notification, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { Option } = Select;

function AddTodo(props) {
  const bucketState = useSelector(state => {
    return state.buckets;
  });

  const [newBucketName, setNewBucketName] = useState();

  var dispatch = useDispatch();
  const form = React.createRef();

  const handleSubmit = (values) => {
    const hasSomethingChanged = form.current.isFieldsTouched(['name', 'bucket']);
    if (hasSomethingChanged) {
      dispatch(todoCreate({
        ...values,
        status: values.status ? 'COMPLETE' : 'INCOMPLETE'
      })).then((res) => {
        if (res.payload && res.payload.id) {
          notification.success({
            message: 'To Do Created.',
            description: 'To Do created successfully.',
          });
          props.closeCreateForm();
        }
        else {
          notification.error({
            message: 'Something went wrong.',
            description: res,
          });
        }
      });
    }
  }

  const onFinish = () => {
    form.current
      .validateFields()
      .then((fieldsValue) => {
        handleSubmit(fieldsValue);
      })
      .catch((err) => {
        console.log('Error on validate fields. error: ', err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const addBucket = () => {
    dispatch(bucketCreate({ name: newBucketName })).then((res) => {
      if (res.payload && res.payload.id) {
        notification.success({
          message: 'To Do Created.',
          description: 'To Do created successfully.',
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
    <Form
      ref={form}
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input todo name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bucket"
        name="bucket"
        rules={[
          {
            required: true,
            message: 'Please select your bucket!',
          },
        ]}
      >
        <Select
          style={{ width: 240 }}
          placeholder="select bucket"
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
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
              </div>
            </div>
          )}
        >
          {bucketState.buckets.map(bucket => (
            <Option key={bucket.id} value={bucket.id}>{bucket.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Status" name='status'>
        <Switch
          checkedChildren='complete'
          unCheckedChildren='incomplete'
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddTodo;
