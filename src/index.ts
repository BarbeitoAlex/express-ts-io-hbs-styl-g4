import ServerExpress from './server';

const express = new ServerExpress();
const PORT: number = 3000;

express.listen(PORT);