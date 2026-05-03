import { expect, test } from '@playwright/test'

async function mockBackend(page: import('@playwright/test').Page) {
  await page.route('**/dev-api/**', async route => {
    const url = route.request().url()
    if (url.includes('/captchaImage')) {
      await route.fulfill({ json: { code: 200, captchaEnabled: false } })
      return
    }
    if (url.includes('/login')) {
      await route.fulfill({ json: { code: 200, token: 'test-token' } })
      return
    }
    if (url.includes('/getInfo')) {
      await route.fulfill({
        json: {
          code: 200,
          user: { userName: 'admin', nickName: '若依' },
          roles: ['common'],
          permissions: ['*:*:*']
        }
      })
      return
    }
    if (url.includes('/getRouters')) {
      await route.fulfill({ json: { code: 200, data: [] } })
      return
    }
    if (url.includes('/powerStation/getHomePowerStationInfo')) {
      await route.fulfill({ json: { code: 200, data: { installedCapacity: '1280', cumulativeDay: '320', cumulativeYear: '61800', earnings: '18420' } } })
      return
    }
    if (url.includes('/peakValley/segment')) {
      await route.fulfill({
        json: {
          code: 200,
          data: {
            totalPowerConsumption: 864.2,
            totalPowerCost: 313.57,
            tipPowerConsumption: 0,
            peakPowerConsumption: 420.5,
            flatPowerConsumption: 260.3,
            troughPowerConsumption: 183.4,
            deepPowerConsumption: 0
          }
        }
      })
      return
    }
    if (url.includes('/device/list')) {
      await route.fulfill({
        json: {
          code: 200,
          rows: [{ id: 'DEV_INV_01', powerStationName: '深圳示范光伏电站', code: 'INV001', name: '1# 逆变器', deviceType: '组串式逆变器' }],
          total: 1
        }
      })
      return
    }
    if (url.includes('/device/DEV_INV_01')) {
      await route.fulfill({ json: { code: 200, data: { id: 'DEV_INV_01', name: '1# 逆变器', code: 'INV001' } } })
      return
    }
    await route.fulfill({ json: { code: 200, rows: [], total: 0, data: [] } })
  })
}

test('login page renders without backend', async ({ page }) => {
  await mockBackend(page)
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: '登录' })).toBeVisible()
  await expect(page.getByRole('button', { name: '进入系统' })).toBeVisible()
})

test('login form submits and redirects to dashboard', async ({ page }) => {
  await mockBackend(page)
  await page.goto('/login?redirect=/dashboard')
  await page.getByRole('button', { name: '进入系统' }).click()
  await expect(page.getByRole('heading', { name: '首页总览' })).toBeVisible()
  await expect(page).toHaveURL('/dashboard')
})

test('dashboard and menu render with mocked RuoYi backend', async ({ page }) => {
  await mockBackend(page)
  await page.addInitScript(() => localStorage.setItem('zhitan_pv_token', 'test-token'))
  await page.goto('/dashboard')
  await expect(page.getByRole('heading', { name: '首页总览' })).toBeVisible()
  const isMobile = (page.viewportSize()?.width || 1440) <= 560
  if (isMobile) {
    await page.locator('.mobile-menu-button').click()
  }
  const menuRoot = page.locator(isMobile ? '.mobile-sidebar' : '.desktop-sidebar')
  await expect(menuRoot.getByText('实时监测')).toBeVisible()
  await menuRoot.getByText('实时监测').click()
  await menuRoot.getByText('实时数据').click()
  await expect(page.getByRole('heading', { name: '实时数据' })).toBeVisible()

  await page.goto('/peak-valley/chart')
  await expect(page.getByRole('heading', { name: '图表统计' })).toBeVisible()
  await expect(page.getByText('864.2')).toBeVisible()

  await page.goto('/realtime')
  await expect(page.getByRole('heading', { name: '实时数据' })).toBeVisible()

  await page.goto('/operation/device')
  await expect(page.getByRole('heading', { name: '设备管理' })).toBeVisible()
  await expect(page.getByText('1# 逆变器')).toBeVisible()
  await page.getByRole('button', { name: '详情' }).click()
  const detailDrawer = page.getByRole('dialog', { name: '详情' })
  await expect(detailDrawer).toBeVisible()
  const drawerWidth = await detailDrawer.evaluate(element => element.getBoundingClientRect().width)
  expect(drawerWidth).toBeLessThanOrEqual(page.viewportSize()?.width || 1440)
})
