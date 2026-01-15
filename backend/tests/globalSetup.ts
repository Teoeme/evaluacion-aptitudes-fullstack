import chalk from 'chalk';

export function setup() {
    console.log(chalk.bgCyan.black('\n INICIANDO SUITE DE TESTS '));
}

export function teardown() {
    console.log(chalk.bgCyan.black('\n TESTS COMPLETADOS \n'));
}