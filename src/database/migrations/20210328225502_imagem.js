exports.up = function(knex) {
    return knex.schema.createTable('imagem', function(table) {
        table.string('key').primary();
        table.integer('size');
        table.string('name').notNullable();
        table.string('url');
        table.integer('produto_id').unsigned();
        table.foreign('produto_id').references('Produto.produto_id');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('imagem');
};
