import React, { Component } from 'react';
import { Row, Col, Button, Modal, Typography } from 'antd';
import 'antd/dist/antd.css';
import Bucket from '../Bucket';
import TodoList from '../TodoList';
import CreateTodo from '../CreateTodo';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

class index extends Component {
  state = {
    showCreateTodoForm: false
  }

  createTodo = () => {
    this.setState({ showCreateTodoForm: true })
  }

  closeCreateForm = () => {
    this.setState({
      showCreateTodoForm: false,
    });
  };

  render() {
    const { showCreateTodoForm } = this.state;
    return (
      <Row style={{ margin: 20 }}>
        <Col span={4}>
          <Bucket />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={21}>
              <Title level={3} >To Do List</Title>
            </Col><Col span={3}>
              <Button
                icon={<PlusCircleOutlined />}
                style={{ float: 'right' }}
                onClick={this.createTodo}
                type='primary'
              >New To Do</Button>
            </Col>
          </Row>

          <TodoList />
          {showCreateTodoForm &&
            <Modal
              destroyOnClose
              title="New To Do"
              visible={showCreateTodoForm}
              footer={null}
              onCancel={this.closeCreateForm}
              style={{ top: 20 }}
            >
              <CreateTodo
                closeCreateForm={this.closeCreateForm}
              />
            </Modal>
          }
        </Col>
      </Row>
    );
  }
}

export default index;