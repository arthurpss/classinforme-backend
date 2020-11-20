exports.up = function(knex) {
    return knex.schema.createTable('contato', (table) => {
      table.increments('contato_id'); //Create an integer, not null, pk, autoincrement ID
      table.string('nome').notNullable();
      table.string('cargo').notNullable().unique();
      table.string('telefone').notNullable();
      table.text('email').notNullable();
      table.string('rede_social').notNullable();
      table.integer('empresa_cnpj').unsigned();
      table.foreign('empresa_cnpj').references('Empresa.cnpj');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contato');
  };
  