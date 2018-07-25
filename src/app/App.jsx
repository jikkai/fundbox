import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import FundTable from './components/table'
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
    const originFund = storageFund.length ? storageFund : []

    const fund = await Promise.all(
      originFund.map(async fund => {
        const remoteFund = await getFundByCode(fund.code)
        const { share, cost } = fund
        fund.appraisal = (share * parseFloat(remoteFund.gsz) - cost * share).toFixed(2)
        return fund
      })
    )

    this.setState({
      fund
    })
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <FundTable dataSource={this.state.fund} />
      </LocaleProvider>
    )
  }
}
