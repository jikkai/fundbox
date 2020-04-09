import React from 'react'
import { Button, Input } from 'antd'

const record = {
  key: '',
  code: '',
  name: '',
  cost: '',
  share: '',
  price: '',
  appraisal: '',
  updateTime: '',
  date: ''
}

export default class AddPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originRecord: record,
      actualRecord: record
    }
  }

  async addFund () {
    const { originRecord, actualRecord } = this.state

    this.props.addFund(actualRecord)
    this.setState({
      actualRecord: originRecord
    })
  }

  handleChange (key, event) {
    const { value } = event.target

    this.setState({
      actualRecord: {
        ...this.state.actualRecord,
        [key]: value,
        key: key === 'code' ? value : this.state.actualRecord.key
      }
    })
  }

  render () {
    const { code, cost, share } = this.state.actualRecord

    return (
      <section style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="基金代码"
          value={code}
          style={{ marginRight: 12 }}
          onChange={event => this.handleChange.bind(this, 'code', event)()}
        />
        <Input
          placeholder="成本价"
          value={cost}
          style={{ marginRight: 12 }}
          onChange={event => this.handleChange.bind(this, 'cost', event)()}
        />
        <Input
          placeholder="持有份额"
          value={share}
          style={{ marginRight: 12 }}
          onChange={event => this.handleChange.bind(this, 'share', event)()}
        />
        <Button
          type="primary"
          onClick={this.addFund.bind(this)}
        >
          新增
        </Button>
      </section>
    )
  }
}
