import skiResortsStates from '../../skiResortsStates';



exports.seed = function(knex) {
  return knex('mountains').del()
  .then(() => knex('states').del())
  .then(() => {
    let statePromises = [];

    skiResortsStates.forEach(state => {
      statePromises.push(createStates(knex, state));
    });

    return Promise.all(statePromises);
  })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
