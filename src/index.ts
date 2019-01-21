import Server from './server';
import setSockets from './socket/index';

const PORT: number = 3000;
const express = new Server(PORT);
