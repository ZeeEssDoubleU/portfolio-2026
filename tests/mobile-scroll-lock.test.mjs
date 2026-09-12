import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

test('mobile project lock contains gestures without moving the portfolio into a fixed layer', async () => {
  const listeners = new Map()
  const source = await readFile(new URL('../src/utils/lockMobileProjectScroll.js', import.meta.url), 'utf8')
  const events = {
    addEventListener(name, handler) { listeners.set(name, handler) },
    removeEventListener(name, handler) { if (listeners.get(name) === handler) listeners.delete(name) }
  }
  const window = { ...events, scrollX: 0, scrollY: 1200, scrollTo({left, top}) { this.scrollX = left; this.scrollY = top } }
  const context = vm.createContext({ window, document: { ...events } })
  vm.runInContext(source.replace('export function', 'function'), context)
  const unlock = context.lockMobileProjectScroll({ x: 0, y: 1200 })
  const panel = { scrollHeight: 1200, clientHeight: 800, scrollTop: 100 }
  const inside = { closest: () => panel }, outside = { closest: () => null }
  const wheel = (target, deltaY) => {
    let prevented = false
    listeners.get('wheel')({target, deltaY, preventDefault() { prevented = true }})
    return prevented
  }
  assert.equal(wheel(outside, 100), true)
  assert.equal(wheel(inside, 100), false)
  panel.scrollTop = 400
  assert.equal(wheel(inside, 100), true)
  assert.equal(wheel(inside, -100), false)
  panel.scrollTop = 0
  assert.equal(wheel(inside, -100), true)
  let prevented = false
  listeners.get('touchstart')({ touches: [{clientY: 100}] })
  listeners.get('touchmove')({target: outside, touches: [{clientY: 80}], preventDefault() { prevented = true }})
  assert.equal(prevented, true)
  window.scrollY = 0
  listeners.get('scroll')()
  assert.equal(window.scrollY, 1200)
  unlock()
  assert.equal(listeners.size, 0)
})
