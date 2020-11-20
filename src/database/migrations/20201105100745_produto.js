exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
      table.increments('produto_id');
      table.string('categoria').notNullable();
      table.string('titulo').notNullable();
      table.text('descricao').notNullable();
      table.string('caminho_img');
      table.string('caminho_video');
      table.string('empresa_cnpj').unsigned();
      table.foreign('empresa_cnpj').references('Empresa.cnpj');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('produto');
  };
  