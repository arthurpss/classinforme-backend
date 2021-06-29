exports.up = function(knex) {
    return knex.schema.createTable('empresa', function(table) {
      table.increments('empresa_id'); //Create an integer, not null, pk, autoincrement ID
      table.string('cod_sinfor');
      table.string('cnpj').notNullable().unique();
      table.string('razao_social').notNullable();
      table.string('cep').notNullable();
      table.text('endereco').notNullable();
      table.string('responsavel').notNullable();
      table.string('email').notNullable();
      table.string('telefone');
      table.string('responsavel_secundario');
      table.string('email_secundario');
      table.string('telefone_secundario');
      table.string('senhaHash').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('empresa');
  };
  