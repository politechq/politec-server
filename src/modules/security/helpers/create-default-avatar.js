import gm from 'gm'
import fs from 'fs'

import { nanoid } from 'nanoid'

import compose from '../../../lib/compose'
import head from '../../../lib/head'
import random from '../../../lib/random'
import reduce from '../../../lib/reduce'
import split from '../../../lib/split'
import trim from '../../../lib/trim'
import toUpper from '../../../lib/to-upper'

const generateAvatar = async (name, callback) => {
  const colors = [
    '#007aff',
    '#34c759',
    '#5856d6',
    '#ff9500',
    '#ff2d55',
    '#af52de',
    '#ff3b30',
    '#5ac8fa',
    '#ffcc01',
  ]

  const width = 200
  const height = 200

  const getInitials = compose(
    toUpper,
    reduce((result, string) => result + head(string), ''),
    split(' '),
    trim,
  )
  const bgColor = random(colors)
  const fontColor = '#fff'
  const text = getInitials(name)
  const fontSize = 96
  const textPosition = 0
  const font = `${__dirname}/../assets/font.ttf`

  await gm(width, height, bgColor)
    .fill(fontColor)
    .font(font)
    .drawText(textPosition, textPosition, text, 'Center')
    .fontSize(fontSize)
    .toBuffer('JPG', (error, buffer) => {
      if (error) {
        return callback(error, null)
      }
      return callback(null, buffer)
    })
}

/**
 * Generate default avatar for user
 *
 * @param {string} fullName User's fullname
 *
 * @returns {string} Avatar url
 */
const createDefaultAvatar = async fullName => {
  const server = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`

  const filePath = 'files'
  const fileNameLength = 16
  const fileName = `${nanoid(fileNameLength)}.jpg`

  await generateAvatar(fullName, async (generatingError, buffer) => {
    if (generatingError) {
      throw new Error(`Generating avatar error: ${generatingError}`)
    }

    await fs.writeFile(
      `${process.cwd()}/${filePath}/${fileName}`,
      buffer,
      savingError => {
        if (savingError) {
          throw new Error(`Saving avatar error: ${generatingError}`)
        }
      },
    )
  })

  return `http://${server}/${filePath}/${fileName}`
}

export default createDefaultAvatar
