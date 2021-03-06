import React from 'react'
import {
  Table,
  Divider,
  Popconfirm,
  InputNumber,
  Tooltip
} from 'antd'

export default class FundTable extends React.Component {
  state = {
    editableRow: {
      code: '',
      cost: '',
      share: ''
    },
    columns: [
      {
        title: '基金名称',
        dataIndex: 'name',
        key: 'name',
        width: 140,
        render: (text, record) => {
          return (
            <React.Fragment>
              <span
                style={{
                  maxWidth: 140,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  overflow: 'hidden'
                }}
              >
                {text}
              </span>
              <span style={{ fontSize: '12px' }}>{record.code}</span>
            </React.Fragment>
          )
        }
      },
      {
        title: '成本价',
        dataIndex: 'cost',
        key: 'cost',
        width: 110,
        sorter: (a, b) => a.cost - b.cost,
        render: (text, record) => (
          <span>
            {
              this.state.editableRow.code === record.code ?
                <InputNumber
                  value={this.state.editableRow.cost}
                  onChange={value => this.handleChange.bind(this, 'cost', value)()}
                /> :
                text
            }
          </span>
        )
      },
      {
        title: '持有份额',
        dataIndex: 'share',
        key: 'share',
        width: 125,
        sorter: (a, b) => a.share - b.share,
        render: (text, record) => (
          <span>
            {
              this.state.editableRow.code === record.code ?
                <InputNumber
                  value={this.state.editableRow.share}
                  onChange={value => this.handleChange.bind(this, 'share', value)()}
                /> :
                text
            }
          </span>
        )
      },
      {
        title: '最新价格',
        dataIndex: 'price',
        key: 'price',
        width: 110,
        sorter: (a, b) => a.price - b.price,
        render: (text, record) => (
          <Tooltip placement="bottom" title={record.updateTime}>
            {text}
          </Tooltip>
        )
      },
      {
        title: '盈亏估算',
        dataIndex: 'appraisal',
        key: 'appraisal',
        width: 110,
        sorter: (a, b) => a.appraisal - b.appraisal,
        render: (text, record) => {
          return (
            <span
              style={{
                color: record.ratio > 0 ? '#f5222d' : record.ratio < 0 ? '#52c41a' : ''
              }}
            >
              {text}
            </span>
          )
        }
      },
      {
        title: '盈亏率',
        dataIndex: 'ratio',
        key: 'ratio',
        width: 110,
        sorter: (a, b) => a.ratio - b.ratio,
        render: text => {
          return (
            <span
              style={{
                color: text > 0 ? '#f5222d' : text < 0 ? '#52c41a' : ''
              }}
            >
              {text}%
            </span>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 110,
        render: (text, record) => (
          <span>
            {
              this.state.editableRow.code === record.code ?
                <a onClick={this.handleSave.bind(this)}>
                  保存
                </a> :
                <a onClick={this.handleEdit.bind(this, record)}>
                  修改
                </a>
            }
            
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => this.props.removeFundByCode(record.code)}
            >
              <a style={{ color: '#ff4d4f' }}>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ]
  }

  handleChange (key, value) {
    this.setState({
      editableRow: {
        ...this.state.editableRow,
        [key]: value
      }
    })
  }

  handleSave () {
    this.props.updateFund(this.state.editableRow)
    this.setState({
      editableRow: {
        code: '',
        cost: '',
        share: ''
      }
    })
  }

  handleEdit (record) {
    const { cost, share, code } = record

    this.setState({
      editableRow: {
        code,
        cost,
        share
      }
    })
  }

  render () {
    const total = this.props.fund
      .map(item => {
        return item.appraisal
      })
      .reduce((a, b) => Number(a) + Number(b), 0)

    return (
      <React.Fragment>
        <Table
          size="middle"
          columns={this.state.columns}
          dataSource={this.props.fund}
          pagination={false}
        />
        
        <section>
          <Divider orientation="right">总盈亏</Divider>
          <p style={{
            textAlign: 'right',
            color: total > 0 ? '#f5222d' : total < 0 ? '#52c41a' : ''
          }}>
            ¥ {total.toFixed(2)}
          </p>
        </section>
      </React.Fragment>
    )
  }
}
