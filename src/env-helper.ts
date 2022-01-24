export const getPackageName = (): string =>
  process.env['npm_package_name'] || 'package';
