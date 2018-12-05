const Secret = require(__addondirHedronRoll + "/models/Secret");

test('is triggered when barrel param is given', function (t) {
  t.plan(1);
  const params = ['barrel'];
  const secret = new Secret(null, params);
  t.is(secret.triggered, true);
})

test('is not triggered when blep param is given', function (t) {
  t.plan(1);
  const params = ['blep'];
  const secret = new Secret(null, params);
  t.is(secret.triggered, false);
})

