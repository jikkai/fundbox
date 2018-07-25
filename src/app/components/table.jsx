import React from 'react'

import { Table, Divider } from 'antd'

const columns = [
  {
    title: '基金代码',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '成本价',
    dataIndex: 'cost',
    key: 'cost'
  },
  {
    title: '持有份额',
    dataIndex: 'share',
    key: 'share'
  },
  {
    title: '最新价格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '盈亏估算',
    dataIndex: 'appraisal',
    key: 'appraisal'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        修改
        <Divider type="vertical" />
        删除
      </span>
    )
  }
]

export default class FundTable extends React.Component {
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.props.dataSource}
        pagination={false}
      />
    )
  }
}
