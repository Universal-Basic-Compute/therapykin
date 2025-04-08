import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const KINOS_API_URL = process.env.KINOS_API_URL || 'https://api.kinos.ai';
export const KINOS_API_KEY = process.env.KINOS_API_KEY;

export { fs, path, axios };
