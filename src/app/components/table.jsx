import React from 'react'

import { Table, Divider } from 'antd'

export default class FundTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
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
          width: 120,
          render: (text, record) => (
            <span>
              <a onClick={this.props.updateFund()}>修改</a>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          )
        }
      ]
    }
  }

  render() {
    return (
      <Table
        size="middle"
        columns={this.state.columns}
        dataSource={this.props.dataSource}
        pagination={false}
      />
    )
  }
}
