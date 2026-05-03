import { describe, expect, it } from 'vitest'
import { deviceSearchFields } from '@/config/pageConfigs'

describe('pageConfigs', () => {
  it('uses backend device type ids for the device type filter', () => {
    const field = deviceSearchFields.find(item => item.prop === 'deviceTypeId')

    expect(field?.options).toEqual(
      expect.arrayContaining([
        { label: '逆变器', value: 'DT_INV' },
        { label: '电表', value: 'DT_METER' }
      ])
    )
  })
})
