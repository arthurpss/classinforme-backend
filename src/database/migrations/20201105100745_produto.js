exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
      table.increments('produto_id');
      table.string('categoria').notNullable();
      table.string('titulo').notNullable();
      table.text('descricao').notNullable();
      table.string('caminho_img');
      table.string('caminho_video');
      table.integer('empresa_id').unsigned();
      table.foreign('empresa_id').references('Empresa.empresa_id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('produto');
  };
  