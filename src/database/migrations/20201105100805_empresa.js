exports.up = function(knex) {
    return knex.schema.createTable('empresa', function(table) {
      table.increments('empresa_id'); //Create an integer, not null, pk, autoincrement ID
      table.string('cod_sinfor');
      table.string('cnpj').notNullable();
      table.string('razao_social').notNullable();
      table.text('endereco').notNullable();
      table.string('cidade').notNullable();
      table.string('bairro').notNullable();
      table.string('cep').notNullable();
      table.boolean('filiado').notNullable();
      table.datetime('data_contato').notNullable();
      table.datetime('data_liberacao');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('empresa');
  };
  