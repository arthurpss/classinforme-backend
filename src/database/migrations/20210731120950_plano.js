exports.up = function(knex) {
    return knex.schema.createTable('plano', function(table) {
        table.increments('plano_id');
        table.float('preco').notNullable();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.boolean('ativo').notNullable();
        table.integer('tipo').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('plano');
};
