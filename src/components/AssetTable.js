import { Table } from '@mui/joy'
import React from 'react'

const AssetTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Asset</th>
          <th>Deposit</th>
          <th>Balance</th>
          <th>P/L %</th>
          <th>P/L $</th>
          <th>Share</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bonds</td>
          <td>$50 000 </td>
          <td>$60 000</td>
          <td>10%</td>
          <td>$10 000</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>Bonds</td>
          <td>$50 000 </td>
          <td>$60 000</td>
          <td>10%</td>
          <td>$10 000</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>Bonds</td>
          <td>$50 000 </td>
          <td>$60 000</td>
          <td>10%</td>
          <td>$10 000</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>Bonds</td>
          <td>$50 000 </td>
          <td>$60 000</td>
          <td>10%</td>
          <td>$10 000</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>Bonds</td>
          <td>$50 000 </td>
          <td>$60 000</td>
          <td>10%</td>
          <td>$10 000</td>
          <td>20%</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default AssetTable
