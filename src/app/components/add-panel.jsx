import React from 'react'
import { Button, Input, Col } from 'antd'

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
      <section>
        <Input.Group>
          <Col span={4}>
            <Input
              placeholder="基金代码"
              value={code}
              onChange={event => this.handleChange.bind(this, 'code', event)()}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="成本价"
              value={cost}
              onChange={event => this.handleChange.bind(this, 'cost', event)()}
            />
          </Col>
          <Col span={4}>
            <Input
              placeholder="持有份额"
              value={share}
              onChange={event => this.handleChange.bind(this, 'share', event)()}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={this.addFund.bind(this)}
              style={{ marginBottom: 16 }}
            >新增</Button>
          </Col>
        </Input.Group>
      </section>
    )
  }
}
