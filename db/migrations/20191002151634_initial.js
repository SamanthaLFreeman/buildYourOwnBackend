exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('states', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('avgSnow');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('mountains', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('mountainHeight');
      table.string('size');
      table.integer('skiLifts')
      table.integer('states_id').unsigned();
      table.foreign('states_id').references('states.id');

      table.timestamps(true, true);
    })

  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('mountains'),
    knex.schema.dropTable('states')
  ])
};
