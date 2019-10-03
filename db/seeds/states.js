const states = require('../../skiResortsStates');

const createState = (knex, state) => {
  return knex('states').insert({
    name: state.name,
    avgSnow: state.avgSnow
  }, 'id')
  .then(stateId => {
    let mountainsPromises = [];

    state.mountains.forEach(mountain => {
      mountainsPromises.push(createMountain(knex, {
        name: mountain.name,
        mountainHeight: mountain.mountainHeight,
        size: mountain.size,
        skiLifts:mountain.skiLifts,
        states_id:stateId[0]
      })
    )
  })
    return Promise.all(mountainsPromises)
  })
}

const createMountain = (knex, mountain) => {
  return knex('mountains').insert(mountain);
};

exports.seed = function(knex) {
  return knex('mountains').del()
  .then(() => knex('states').del())
  .then(() => {
    let statePromises = [];

    states.forEach(state => {
      statePromises.push(createState(knex, state));
    });

    return Promise.all(statePromises);
  })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
