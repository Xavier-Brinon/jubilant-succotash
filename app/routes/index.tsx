import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import * as React from 'react'
import './index.css'

const filePath = 'count.txt'

async function readCount(): number {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8')
      .catch(() => 0)
  )
}

const getCount = createServerFn('GET', () => {
  return readCount()
})

const updateCount = createServerFn('POST', async (addBy: number) => {
  const count = await readCount()
  await fs.promises.writeFile(filePath, `${count + addBy}`)
})

const resetCount = createServerFn('POST', async () => {
  await fs.promises.writeFile(filePath, '0')
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <section>
      <button
        onClick={() => {
          updateCount(1).then(() => { router.invalidate() })}
        }
      >
        Add 1 to {state}?
      </button>
      <button
        onClick={() => {
          resetCount().then(() => { router.invalidate() })
        }}
      >
        Reset
      </button>
    </section>
  )
}
