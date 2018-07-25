import React from 'react'
import { Button, Input, Col } from 'antd'
import FundTable from './components/fund-table'
import AddPanel from './components/add-panel'
import { getFundByCode } from '../utils/http'
import storage from '../utils/storage'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fund: []
    }
  }

  async componentDidMount () {
    const storageFund = await storage.get('fund')
    const originFund = storageFund.fund.length ? storageFund.fund : []

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
        fund.updateTime = remoteFund.gztime
        fund.date = remoteFund.jzrq
        return fund
      })
    )
  }

  async addFund (record) {
    const { code } = record

    if (code && !this.state.fund.find(item => code === item.code)) {
      const fund = await this.freshFund(
        [record].concat(this.state.fund)
      )

      await storage.set('fund', fund)

      this.setState({
        fund
      })
    }
  }

  async updateFund (editedRecord) {
    const fund = await this.freshFund(
      this.state.fund.map(item => {
        if (item.code === editedRecord.code) {
          item = { ...item, ...editedRecord }
        }
        return item
      })
    )

    await storage.set('fund', fund)

    this.setState({
      fund
    })
  }

  async removeFundByCode (code) {
    const fund = await this.freshFund(
      this.state.fund.filter(fund => fund.code !== code)
    )
    await storage.set('fund', fund)
    this.setState({
      fund 
    })
  }

  render () {
    return (
      <main>
        <AddPanel
          fund={this.state.fund}
          addFund={this.addFund.bind(this)}
          freshFund={this.freshFund.bind(this)}
        />

        <FundTable
          fund={this.state.fund}
          updateFund={this.updateFund.bind(this)}
          removeFundByCode={this.removeFundByCode.bind(this)}
        />
      </main>
    )
  }
}
