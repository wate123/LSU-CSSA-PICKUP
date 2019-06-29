/* eslint-disable no-underscore-dangle */
/**
 *
 * DisplayRequests
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    // sorter: true,
    // render: name => `${name.name}`,
    // width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '电话号码',
    dataIndex: 'phone',
  },
  {
    title: '社交平台',
    dataIndex: 'social',
  },
  {
    title: '来自',
    dataIndex: 'hometown',
    // width: '20%',
  },
  {
    title: '毕业学校',
    dataIndex: 'school',
  },
  {
    title: '行李',
    dataIndex: 'luggage',
  },
  {
    title: '到达机场',
    dataIndex: 'arriveAirport',
  },
  {
    title: '到达时间(美国中部时间)',
    dataIndex: 'arriveDateTime',
    render: time =>
      new Date(time)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, ''),
  },
  {
    title: '想对志愿者说',
    dataIndex: 'toVolunteer',
  },
];

const { confirm } = Modal;

function DisplayRequests({ requestsData, loading, acceptRequest }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectRow = userData => {
    confirm({
      title: '确认接受接机请求？',
      content: (
        <div>请慎重接受接机请求, 接受后双方将会收到关于对方信息的邮件.</div>
      ),
      onOk() {
        acceptRequest(userData._id);
        // return new Promise((resolve, reject) => {
        //   axios({
        //     url: 'https://www.lsucssa.com:3001/api/accepted',
        //     method: 'post',
        //     headers: { Authorization: `bearer ${Auth.getToken()}` },
        //     data: { ids },
        //     type: 'json',
        //   })
        //     .then(data => {
        //       if (data.data.success) {
        //         socket.emit('volunteer accepted', true);
        //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        //         notification.success({
        //           message:
        //             '请检查邮箱的垃圾箱和等待至少10分钟, 如果还没有收到邮件, 请联系管理员',
        //           icon: (
        //             <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        //           ),
        //           duration: 5,
        //         });
        //       }
        //     })
        //     .catch(() => {
        //       notification.error({
        //         message: '未知错误, 请联系系统管理员',
        //       });
        //     });
        // });
      },
      onCancel() {},
    });
  };
  if (requestsData !== false) {
    // requestsData = { ...requestsData, key: requestsData._id };
    const requestDataWithKey = requestsData.map(val => ({
      key: val._id,
      ...val,
    }));

    return (
      <div className="request-table">
        {/* <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            接受
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选择了 ${selectedRowKeys.length} 个接机请求` : ''}
          </span>
        </div> */}
        {/* {() => dispatchGetRequesterData()} */}
        <Table
          bordered
          columns={columns}
          // rowKey={record => record}
          rowSelection={{
            selectedRowKeys,
            onSelect: onSelectRow,
          }}
          dataSource={requestDataWithKey}
          // pagination={this.state.pagination}
          // onChange={handleTableChange}
        />
      </div>
    );
  }
  return <Table columns={columns} loading={loading} />;
}

DisplayRequests.propTypes = {
  requestsData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  acceptRequest: PropTypes.func,
};

export default DisplayRequests;
