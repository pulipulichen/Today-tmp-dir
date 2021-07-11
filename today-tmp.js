const fs = require('fs')
const os = require('os')
const path = require('path')

const dayjs = require('dayjs')
const trash = require('trash')

const execShellCommand = require('./lib/cli/execShellCommand.js')

const config = require('./config.js')

function makeTodayDir () {
  let dateString = dayjs().format('YYYYMMDD')
  let todayPath = os.tmpdir() + '/' + dateString

  if (fs.existsSync(todayPath) === true) {
    let i = 1
    while (fs.existsSync(todayPath) === true 
            && fs.lstatSync(todayPath).isDirectory() === false) {
      todayPath = os.tmpdir() + '/' + dateString + '-' + i
      i++
    }
  }

  if (fs.existsSync(todayPath) === false) {
    fs.mkdirSync(todayPath)
  }
  
  return todayPath
}

/**
 * 然後是建立連結
 * @returns {undefined}
 */
async function linkTodayDir (todayDir) {
  // /home/pudding/[0.shortcut
  
  let linkDir = config.todayTmpShortcutPath
  
  if (fs.existsSync(todayDir)) {
    return false
  }
  
  let command = `ln -s "${todayDir}" "${linkDir}"` 
  
  try {
    await execShellCommand(command)
  }
  catch (e) {
    console.log(`rm "${linkDir}"`)
    await execShellCommand(`rm "${linkDir}"`)
    await execShellCommand(command)
  }
}

let todayTmp = makeTodayDir()
linkTodayDir(todayTmp)