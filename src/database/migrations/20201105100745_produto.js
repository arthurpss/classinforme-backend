exports.up = function (knex) {
  return knex.schema.createTable('produto', function (table) {
    table.string('produto_id').primary();
    table.string('categoria').notNullable();
    table.string('titulo').notNullable();
    table.text('descricao').notNullable();
    table.float('preco').notNullable();
    table.string('link');
    table.string('thumbnail_url');
    // table.string('caminho_video');
    table.string('empresa_cnpj').unsigned();
    table.foreign('empresa_cnpj').references('Empresa.cnpj');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('produto');
};
