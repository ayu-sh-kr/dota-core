import type {Config} from 'jest';
import {pathsToModuleNameMapper} from "ts-jest";
import { compilerOptions } from './tsconfig.json';

const config: Config = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;