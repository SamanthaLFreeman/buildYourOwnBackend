import skiResortsStates from '../../skiResortsStates';

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

exports.seed = function(knex) {
  return knex('mountains').del()
  .then(() => knex('states').del())
  .then(() => {
    let statePromises = [];

    skiResortsStates.forEach(state => {
      statePromises.push(createState(knex, state));
    });

    return Promise.all(statePromises);
  })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
