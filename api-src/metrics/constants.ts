import { GITHUB_USERNAME } from '../../constants';

export const GITHUB_PASSWORD = (process.env.GITHUB_PASSWORD || '').trim();
export const GITHUB_AUTH = GITHUB_USERNAME + ':' + GITHUB_PASSWORD;
