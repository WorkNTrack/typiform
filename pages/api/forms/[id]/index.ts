import { NextApiRequest, NextApiResponse } from 'next'

const INSTANCE = process.env.HARPERDB_URL
const TOKEN = process.env.HARPERDB_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end(`Method ${req.method} not allowed`)
  }
  const { id } = req.query
  const request = await fetch(`${INSTANCE}`, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `SELECT * FROM typiform.forms WHERE id='${id}'`,
    }),
  })
  const response = await request.json()
  res.status(200).json(response[0])
}
