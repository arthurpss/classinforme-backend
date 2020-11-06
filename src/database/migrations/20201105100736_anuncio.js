exports.up = function(knex) {
    return knex.schema.createTable('anuncio', function(table) {
        table.increments('anuncio_id');
        table.integer('produto_id').unsigned();
        table.foreign('produto_id').references('Produto.produto_id');
        table.string('local_banner').notNullable();
        table.integer('qtd_tempo').notNullable();
        table.string('email').notNullable();
        table.boolean('ativo').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('anuncio');
};
