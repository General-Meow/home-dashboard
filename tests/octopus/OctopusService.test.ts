import {octopusService} from "../../src/octopus/OctopusService";
import assert from "assert";

test('blah', () => {
  assert(true, "test must return true");
})

test('promise test', async () => {
  try {
    var value = await octopusService.blah();
  } catch (e) {
    console.log('exception is ', e);
  }


})