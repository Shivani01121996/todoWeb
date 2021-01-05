import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, notification, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditTodo from './EditTodo';
import { deleteItem } from '../actions/todo_items';

const { Text } = Typography;
const { confirm } = Modal;

function TodoList() {
  const reduxState = useSelector(state => {
    return state;
  });

  const { todos: todoState, buckets } = reduxState;

  const [editTodo, setEditTodo] = useState(false)

  var dispatch = useDispatch();

  const deleteTodo = (todoId) => {
    console.log('todo id', todoId)
    dispatch(deleteItem(todoId)).then(() => {
      notification.success({
        message: 'To Do Deleted',
        description: 'To Do deleted successfully ',
      });
    });
  };

  const showDeleteConfirm = (todo) => {
    confirm({
      title: `Are you sure you want to delete this To Do?`,
      content: (
        <p>
          <Text strong>Name : </Text>
          {todo.name}
          <br />
          <Text type="warning">Changes will be permanent and cannot be reverted.</Text>
        </p>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteTodo(todo.key);
      },
      onCancel() { },
    });
  };

  const showEditTodoForm = (todo) => {
    setEditTodo(todo)
  }

  const getBucketName = (bucketId) => {
    const bucketObj = buckets.buckets.find(x => x.id === bucketId);
    return bucketObj ? bucketObj.name : '';
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Bucket',
      dataIndex: 'bucket',
      render: (bucketId) => getBucketName(bucketId)
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 100,
      dataIndex: 'todoId',
      key: 'todoId',
      render: (text, record) => (
        <Button onClick={() => showEditTodoForm(record)}>
          <EditOutlined />Edit
        </Button>
      ),
    },
    {
      fixed: 'right',
      width: 100,
      dataIndex: 'todoId',
      key: 'todoId',
      render: (text, record) => (
        <Button onClick={() => showDeleteConfirm(record)}>
          <DeleteOutlined />Delete
        </Button>
      ),
    },
  ];
  const data = todoState
    .items
    .sort((a, b) => a.updatedAt - b.updatedAt)
    .filter(item => (buckets.currentBucketId === 'all' || item.bucket === buckets.currentBucketId))
    .reverse()
    .map(item => {
      return {
        key: item.id,
        name: item.name,
        status: item.status,
        bucket: item.bucket,
      }
    })

  const closeUpdateForm = () => {
    setEditTodo(false);
  }

  return <div>
    <Table
      size='small'
      columns={columns}
      dataSource={data}
    />
    <Modal
      destroyOnClose
      title="Edit To Do"
      visible={editTodo}
      footer={null}
      onCancel={closeUpdateForm}
    ><EditTodo
        defaultValues={editTodo}
        closeUpdateForm={closeUpdateForm}
      />
    </Modal>
  </div>
}

export default TodoList;
