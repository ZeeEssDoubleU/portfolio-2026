import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import ts from 'typescript'

const source = await readFile(new URL('../src/utils/initialReveal.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const module = { exports: {} }
vm.runInNewContext(compiled, module)

function boot({ pathname = '/', reduced = false } = {}) {
  const timers = new Map(), events = new Map(), root = { dataset: {} }, window = {}
  let id = 0
  vm.runInNewContext(module.exports.initialRevealBootstrap, {
    location: { pathname }, document: { documentElement: root,
      addEventListener: (event, callback) => events.set(event, callback),
      removeEventListener: event => events.delete(event),
    }, window,
    matchMedia: () => ({ matches: reduced }),
    setTimeout: (callback, delay) => { timers.set(++id, { callback, delay }); return id },
    clearTimeout: id => timers.delete(id),
    addEventListener: (event, callback) => events.set(event, callback),
  })
  return { root, window, timers, events }
}

test('ready assets wait for the complete sheen, then reveal exactly once', () => {
  const { root, window, timers, events } = boot()
  assert.equal(root.dataset.siteEntry, 'waiting')
  window.__revealPortfolio()
  assert.equal(root.dataset.siteEntry, 'waiting')
  events.get('animationend')({ animationName: 'unrelated' })
  assert.equal(root.dataset.siteEntry, 'waiting')
  events.get('animationend')({ animationName: 'portfolio-ring-sheen' })
  assert.equal(root.dataset.siteEntry, 'revealing')
  window.__revealPortfolio()
  assert.equal(timers.size, 1)
  const cleanup = [...timers.values()][0]
  assert.equal(cleanup.delay, 420)
  cleanup.callback()
  assert.equal(root.dataset.siteEntry, undefined)
  assert.equal(window.__revealPortfolio, undefined)
})

test('failed JavaScript or assets cannot trap visitors on the logo', () => {
  const { root, timers } = boot()
  const fallback = [...timers.values()][0]
  assert.equal(fallback.delay, 4000)
  fallback.callback()
  assert.equal(root.dataset.siteEntry, 'revealing')
  ;[...timers.values()][0].callback()
  assert.equal(root.dataset.siteEntry, undefined)
})

test('reduced motion finishes immediately and bfcache restores a usable page', () => {
  const { window, timers } = boot({ reduced: true })
  window.__revealPortfolio()
  assert.equal([...timers.values()][0].delay, 0)
  const restored = boot()
  restored.events.get('pageshow')({ persisted: true })
  assert.equal(restored.root.dataset.siteEntry, 'revealing')
})

test('project and thanks routes keep their existing transitions', () => {
  for (const pathname of ['/project/mathe/', '/thanks/']) {
    const { root, window, timers } = boot({ pathname })
    assert.equal(root.dataset.siteEntry, undefined)
    assert.equal(window.__revealPortfolio, undefined)
    assert.equal(timers.size, 0)
  }
})

test('a completed sheen still waits for slow assets', () => {
  const { root, window, events } = boot()
  events.get('animationend')({ animationName: 'portfolio-ring-sheen' })
  assert.equal(root.dataset.siteEntry, 'waiting')
  window.__revealPortfolio()
  assert.equal(root.dataset.siteEntry, 'revealing')
})
