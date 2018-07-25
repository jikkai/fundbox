import React from 'react'
import { Button, Input, Col } from 'antd'
import FundTable from './components/table'
import { getFundByCode } from '../utils/http'
import storage from '../utils/storage'

const record = {
  key: '',
  code: '',
  name: '',
  cost: '',
  share: '',
  price: '',
  appraisal: ''
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fund: [],
      record
    }
  }

  async componentDidMount () {
    const storageFund = await storage.get('fund')
    const originFund = storageFund.length ? storageFund : []

    const fund = await this.freshFund(originFund)

    this.setState({
      fund
    })
  }

  async freshFund (originFund) {
    return await Promise.all(
      originFund.map(async fund => {
        const remoteFund = await getFundByCode(fund.code)
        const { share, cost } = fund
        fund.appraisal = (share * parseFloat(remoteFund.gsz) - cost * share).toFixed(2)
        fund.price = remoteFund.gsz
        fund.name = remoteFund.name
        return fund
      })
    )
  }

  handleChange (key, event) {
    const { value } = event.target
    this.setState({
      record: {
        ...this.state.record,
        [key]: value,
        key: key === 'code' ? value : this.state.record.key
      }
    })
  }

  async addFund () {
    if (this.state.record.code && !this.state.fund.find(fund => this.state.record.code === fund.code)) {
      const fund = await this.freshFund(
        [this.state.record].concat(this.state.fund)
      )

      this.setState({
        fund
      })
      this.setState({
        record
      })
    }
  }

  updateFund() {
    console.log(this.state.record)
  }

  render() {
    return (
      <main>
        <section>
          <Input.Group>
            <Col span={4}>
              <Input
                placeholder="基金代码"
                value={this.state.record.code}
                onChange={event => this.handleChange.bind(this, 'code', event)()}
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="成本价"
                value={this.state.record.cost}
                onChange={event => this.handleChange.bind(this, 'cost', event)()}
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="持有份额"
                value={this.state.record.share}
                onChange={event => this.handleChange.bind(this, 'share', event)()}
              />
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.addFund.bind(this)} style={{ marginBottom: 16 }}>新增</Button>
            </Col>
          </Input.Group>
        </section>
        <FundTable dataSource={this.state.fund} updateFund={this.updateFund.bind(this)} />
      </main>
    )
  }
}
