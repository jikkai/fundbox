import React from 'react'
import FundTable from './components/fund-table'
import AddPanel from './components/add-panel'
import { getFundByCode } from '../utils/http'
import storage from '../utils/storage'

export default class App extends React.Component {
  state = {
    fund: []
  }

  async componentDidMount () {
    const storageFund = await storage.get('fund')
    const originFund = storageFund.fund && storageFund.fund.length ? storageFund.fund : []

    this.freshFund(originFund)
  }

  async freshFund (originFund) {
    const fund = await Promise.all(
      originFund.map(async item => {
        const remoteFund = await getFundByCode(item.code)

        const { share, cost } = item
        item.appraisal = (share * parseFloat(remoteFund.gsz) - cost * share).toFixed(2)
        item.price = remoteFund.gsz
        item.name = remoteFund.name
        item.updateTime = remoteFund.gztime
        item.date = remoteFund.jzrq
        item.ratio = ((cost - remoteFund.gsz) / cost * -100).toFixed(2)
        return item
      })
    )

    await storage.set('fund', fund)

    this.setState({
      fund
    })
  }

  async addFund (record) {
    const { code } = record

    if (code && !this.state.fund.find(item => code === item.code)) {
      this.freshFund(
        [record].concat(this.state.fund)
      )
    }
  }

  async updateFund (editedRecord) {
    this.freshFund(
      this.state.fund.map(item => {
        if (item.code === editedRecord.code) {
          item = { ...item, ...editedRecord }
        }
        return item
      })
    )
  }

  async removeFundByCode (code) {
    this.freshFund(
      this.state.fund.filter(fund => fund.code !== code)
    )
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
