export const QueryInterceptor = (target: any, context: any) => {
  const { kind, name } = context;
  console.log('QueryInterceptor::lvl2', target());
  // const { kind, name } = context;
  // console.log('QueryInterceptor::lvl2', target, kind, name);
  // if (kind === 'method') {
  //   return function (...args: any[]) {
  //     console.log(`starting ${String(name)} with arguments ${args.join(', ')}`);
  //     const ret = target.call(this, ...args);
  //     console.log(`ending ${String(name)}`);
  //     return ret;
  //   };
  // }
};
