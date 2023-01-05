
import { Nat } from "@completium/archetype-ts-types";
import { get_account, set_mockup, set_mockup_now, set_quiet } from "@completium/experiment-ts";

import { main } from './binding/main'
import { view } from './binding/other/view'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('Contracts deployment', async () => {
  it('Deploy view', async () => {
    await view.originate(new Nat(0), { as: alice })
  });

  it('Deploy main', async () => {
    await main.deploy({ as: alice })
  });
})

describe('Test', async () => {
  it("Call 'check'", async () => {
    const res_before = await main.get_res()
    assert(res_before.equals(new Nat(0)))
    await main.check(view.get_address(), { as: alice })
    const res_after = await main.get_res()
    assert(res_after.equals(new Nat(2)))
  })
})
