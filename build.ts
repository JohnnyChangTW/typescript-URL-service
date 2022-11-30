import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
// s.mkdir('-p', `${outDir}/common/swagger`);
s.mkdir('-p', `${outDir}/server/common`);
// s.cp('server/common/api.yml', `${outDir}/common/api.yml`);
s.cp('server/common/api.yml', `${outDir}/server/common/api.yml`);
