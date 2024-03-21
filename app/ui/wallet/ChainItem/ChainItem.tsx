import { Chain } from '@/app/lib/constants'
import { MenuItem } from '@mui/material'
import React from 'react'

function ChainItem({ chain }: { chain: Chain }) {
  return (
    <MenuItem value={chain.hex}>{chain.fullName}</MenuItem>
  )
}

export default ChainItem
